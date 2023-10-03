package io.github.louisp78.sudosumo_backend.exposition.dto.responses;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDtoResponse {
    private Long id;
    private Integer score;
    private String email;
    private String firstName;
    private String lastName;
    private String username;
}
