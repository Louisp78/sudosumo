package io.github.louisp78.sudosumo_backend.exposition;

import io.github.louisp78.sudosumo_backend.application.UserService;
import io.github.louisp78.sudosumo_backend.application.dto.UserDto;
import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(final UserService userService) {
        this.userService = userService;
    }

    // getUserById

    //TODO: check that token is a valid google token
    @PostMapping("/create")
    public ResponseEntity<String> createUser(@RequestBody final CreateUserRequest createUserRequest) {
        userService.createUser(createUserRequest.getToken());
        return ResponseEntity.ok().body("User created");
    }

    @GetMapping("")
    public ResponseEntity<UserDto> getUserByToken(@RequestBody final GetUserByTokenRequest getUserByTokenRequest) {
        UserDomain userFound = userService.getUserByToken(getUserByTokenRequest.getToken());
        if (userFound == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(MapperExpo.userDomainToDto(userFound));
    }
}
