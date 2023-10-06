package io.github.louisp78.sudosumo_backend.exposition;

import io.github.louisp78.sudosumo_backend.application.UserService;
import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import io.github.louisp78.sudosumo_backend.exposition.dto.requests.UserDtoRequest;
import io.github.louisp78.sudosumo_backend.infra.exceptions.NotEnoughInformationToCreateUserException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.URL;

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
        final String baseUrl = System.getenv().get("FRONTEND_URL");
        final String successLoginRoute = System.getenv().get("FRONTEND_SUCCESS_LOGIN_ROUTE");
        final URI successURI = URI.create(baseUrl).resolve(successLoginRoute);
        response.setHeader("Location", successURI.toString());
        response.setStatus(302);
    }
}