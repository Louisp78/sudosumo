package io.github.louisp78.sudosumo_backend.domain;

import java.util.List;

public interface UserRepository {
    UserDomain createUser(String token);
    UserDomain getUserById(long l);

    List<UserDomain> getAllUsers();

    UserDomain getUserByEmail(String email);
}
