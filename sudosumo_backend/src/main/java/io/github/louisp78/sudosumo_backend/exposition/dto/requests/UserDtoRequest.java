package io.github.louisp78.sudosumo_backend.exposition.dto.requests;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Optional;
import java.util.OptionalInt;


@Data
@NoArgsConstructor
@AllArgsConstructor
//TODO: make some fields optional to handle all providers specs
public class UserDtoRequest {
    private String sub;
    private String email;
    private String firstName;
    private String lastName;
    private String username;
}
