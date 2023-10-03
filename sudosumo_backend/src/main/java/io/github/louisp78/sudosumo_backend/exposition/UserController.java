package io.github.louisp78.sudosumo_backend.exposition;

import io.github.louisp78.sudosumo_backend.application.UserService;
import io.github.louisp78.sudosumo_backend.exposition.dto.requests.UserDtoRequest;
import io.github.louisp78.sudosumo_backend.exposition.dto.responses.UserDtoResponse;
import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import io.github.louisp78.sudosumo_backend.infra.exceptions.NotEnoughInformationToCreateUserException;
import io.github.louisp78.sudosumo_backend.infra.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final MapperExpo mapperExpo;

    @Autowired
    public UserController(final UserService userService, final MapperExpo mapperExpo) {
        this.userService = userService;
        this.mapperExpo = mapperExpo;
    }

    @PostMapping("/create")
    public ResponseEntity<UserDtoResponse> createUser(@RequestBody final UserDtoRequest createUserRequest) {
        try {
            UserDomain userDomain = mapperExpo.userDtoRequestToDomain(createUserRequest);
            UserDomain userCreated = userService.createUser(userDomain, createUserRequest.getSub());
            return ResponseEntity.ok().body(mapperExpo.userDomainToDtoResponse(userCreated));
        } catch (NotEnoughInformationToCreateUserException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

    }

    @GetMapping("/current")
    public ResponseEntity<UserDtoResponse> getCurrentUser(@AuthenticationPrincipal OidcUser currentUser) {
        try {
            final UserDomain userFound = userService.getUser(currentUser.getSubject());
            return ResponseEntity.ok().body(mapperExpo.userDomainToDtoResponse(userFound));
        } catch (UserNotFoundException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDtoResponse>> getAllUsers() {
        List<UserDomain> usersFound = userService.getAllUsers();
        if (usersFound == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(usersFound.stream().map(mapperExpo::userDomainToDtoResponse).toList());
    }
}
