package io.github.louisp78.sudosumo_backend.exposition;

import io.github.louisp78.sudosumo_backend.application.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
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


}
