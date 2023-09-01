package io.github.louisp78.sudosumo_backend.application.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private Long id;
    private Integer score;
}
