package io.github.louisp78.sudosumo_backend.application;

import io.github.louisp78.sudosumo_backend.application.dto.UserDto;
import io.github.louisp78.sudosumo_backend.domain.UserDomain;

public interface UserApplication {
    UserDomain createUser(String token);

    UserDomain getUser(Long id);

    UserDomain getUserByToken(String token);
}
