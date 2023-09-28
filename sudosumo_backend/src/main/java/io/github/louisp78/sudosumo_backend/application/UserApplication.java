package io.github.louisp78.sudosumo_backend.application;

import io.github.louisp78.sudosumo_backend.domain.UserDomain;

import java.util.List;

public interface UserApplication {
    UserDomain createUser(String email);

    UserDomain getUser(Long id);

    List<UserDomain> getAllUsers();

    UserDomain getUserByEmail(String email);
}
