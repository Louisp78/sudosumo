package io.github.louisp78.sudosumo_backend.exposition;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class CreateUserRequest {
    private String token;
}
