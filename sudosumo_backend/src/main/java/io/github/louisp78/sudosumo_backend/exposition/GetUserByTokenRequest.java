package io.github.louisp78.sudosumo_backend.exposition;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class GetUserByTokenRequest {
    private String token;
}
