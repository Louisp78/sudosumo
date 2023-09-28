package io.github.louisp78.sudosumo_backend.exposition;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import io.github.louisp78.sudosumo_backend.application.UserService;
import io.github.louisp78.sudosumo_backend.exposition.dto.AuthDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.core.GrantedAuthorityDefaults;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.OAuth2AuthorizationContext;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.client.authentication.OAuth2LoginAuthenticationProvider;
import org.springframework.security.oauth2.client.authentication.OAuth2LoginReactiveAuthenticationManager;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.web.bind.annotation.*;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import org.springframework.web.context.request.RequestContextHolder;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Map;

@RestController
public class AuthorizationController {


    private final UserService userService;

    @Autowired
    public AuthorizationController(final UserService userService) {
        this.userService = userService;
    }


    @PostMapping("oauth2/authorization/google")
    public ResponseEntity<String> authorizeGoogle(@RequestBody final AuthDto body) throws GeneralSecurityException, IOException {
        System.out.println("Code received: " + body.getCode());
        final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
        final String googleClientId = System.getenv("GOOGLE_CLIENT_ID");
        final String googleClientSecret = System.getenv("GOOGLE_CLIENT_SECRET");
        HttpTransport httpTransport = new NetHttpTransport();

        GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(httpTransport, JSON_FACTORY)
                // Specify the CLIENT_ID of the app that accesses the backend:
                .setAudience(Collections.singletonList(googleClientId))
                // Or, if multiple clients access the backend:
                //.setAudience(Arrays.asList(CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3))
                .build();
        // (Receive idTokenString by HTTPS POST)

        try {
            GoogleIdToken idToken = verifier.verify(body.getCode());
            if (idToken != null) {
                Payload payload = idToken.getPayload();

                // Print user identifier
                String userId = payload.getSubject();
                System.out.println("User ID: " + userId);

                // Get profile information from payload
                String sub = payload.getSubject();
                String email = payload.getEmail();
                boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
                String name = (String) payload.get("name");
                String pictureUrl = (String) payload.get("picture");
                String locale = (String) payload.get("locale");
                String familyName = (String) payload.get("family_name");
                String givenName = (String) payload.get("given_name");

                // Use or store profile information
                // ...
                // define attributes

                ArrayList<GrantedAuthority> authoritiesCollection = new ArrayList<>();// Or any other Collection implementation,
                authoritiesCollection.add(new SimpleGrantedAuthority("ROLE_USER"));
                authoritiesCollection.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                OAuth2User oAuth2User = new DefaultOAuth2User(authoritiesCollection, Map.of("sub", sub), "sub");
                Authentication authentication = new OAuth2AuthenticationToken(oAuth2User, authoritiesCollection, "google");

                SecurityContextHolder.getContext().setAuthentication(authentication);

                String sessionId = RequestContextHolder.currentRequestAttributes().getSessionId();
                System.out.println("Session ID from request context: " + sessionId);


                // create a json response
                String plainTextResponse = "{\"id\":\"" + userId + "\",\"email\":\"" + email + "\",\"name\":\"" + name + "\",\"pictureUrl\":\"" + pictureUrl + "\",\"locale\":\"" + locale + "\",\"familyName\":\"" + familyName + "\",\"givenName\":\"" + givenName + "\"}";


                return ResponseEntity.ok()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(plainTextResponse);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("Invalid ID token.");
        return ResponseEntity.notFound().build();
    }
}