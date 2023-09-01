package io.github.louisp78.sudosumo_backend.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDomain {
    private Long id;
    private String token;
    private Integer score;
}
