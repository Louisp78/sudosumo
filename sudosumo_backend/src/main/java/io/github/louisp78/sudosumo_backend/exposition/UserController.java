package io.github.louisp78.sudosumo_backend.exposition;

import io.github.louisp78.sudosumo_backend.application.UserService;
import io.github.louisp78.sudosumo_backend.application.dto.UserDto;
import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<UserDto> createUser(@RequestBody final CreateUserRequest createUserRequest) {
        UserDomain userCreated = userService.createUser(createUserRequest.getToken());
        return ResponseEntity.ok().body(MapperExpo.userDomainToDto(userCreated));
    }


    @GetMapping("/current")
    public ResponseEntity<UserDto> getUser(OAuth2AuthenticationToken authentication) {
        // get oauth2 email
        Map<String, Object> attributes = authentication.getPrincipal().getAttributes();
        String email = (String) attributes.get("email");
        UserDomain userFound = userService.getUserByEmail(email);

        if (userFound == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(MapperExpo.userDomainToDto(userFound));
    }


    @GetMapping("/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        List<UserDomain> usersFound = userService.getAllUsers();
        if (usersFound == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(usersFound.stream().map(MapperExpo::userDomainToDto).toList());
    }
}
