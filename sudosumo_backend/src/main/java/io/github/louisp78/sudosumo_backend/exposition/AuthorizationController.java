package io.github.louisp78.sudosumo_backend.exposition;

import io.github.louisp78.sudosumo_backend.application.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.Map;


@RestController
public class AuthorizationController {

    private final UserService userService;

    @Autowired
    public AuthorizationController(final UserService userService) {
        this.userService = userService;
    }


    @GetMapping("oauth2/callback")
    public ResponseEntity<String> googleCode() {

        //Map<String, Object> attributes = authentication.getPrincipal().getAttributes();
        //String email = (String) attributes.get("email");
        //userService.createUser(email);
        return ResponseEntity.ok().body("Hello world !");
    }

    @GetMapping("/oauth2/google")
    public ResponseEntity<String> processGoogleOAuth2Login(OAuth2AuthenticationToken authentication) {
        Map<String, Object> attributes = authentication.getPrincipal().getAttributes();
        String email = (String) attributes.get("email");
        userService.createUser(email);
        return ResponseEntity.ok("User authenticated via Google OAuth2");
    }


}
