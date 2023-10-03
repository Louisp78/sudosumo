package io.github.louisp78.sudosumo_backend.exposition;

import io.github.louisp78.sudosumo_backend.application.UserService;
import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import io.github.louisp78.sudosumo_backend.exposition.dto.requests.UserDtoRequest;
import io.github.louisp78.sudosumo_backend.infra.exceptions.NotEnoughInformationToCreateUserException;
import io.github.louisp78.sudosumo_backend.infra.exceptions.UserNotFoundException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthorizationController {


    private final UserService userService;
    private final MapperExpo mapperExpo;

    @Autowired
    public AuthorizationController(final UserService userService, MapperExpo mapperExpo) {
        this.userService = userService;
        this.mapperExpo = mapperExpo;
    }



    @GetMapping("oauth2/success")
    public void success(@AuthenticationPrincipal OidcUser principal, HttpSession session, HttpServletResponse response) throws NotEnoughInformationToCreateUserException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        System.out.println("current user logged in : " + principal);

        UserDtoRequest userDtoRequest = mapperExpo.oidcUserToUserDtoRequest(principal);
        UserDomain userDomain = mapperExpo.userDtoRequestToDomain(userDtoRequest);
        UserDomain userInDb = userService.createUser(userDomain, userDtoRequest.getSub());

        //TODO: add this url to .env file
        response.setHeader("Location", "http://localhost:3000/profile");
        response.setStatus(302);
    }

/*
    @GetMapping("/oauth2/authorize/google")
    public ResponseEntity<String> authorizeGoogle() {



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
        return ResponseEntity.ok().build();
    }*/
}