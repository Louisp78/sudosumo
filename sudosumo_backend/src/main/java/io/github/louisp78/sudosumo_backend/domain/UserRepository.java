package io.github.louisp78.sudosumo_backend.domain;

import java.util.List;

public interface UserRepository {
    UserDomain createUser(String token);
    UserDomain getUserById(long l);

    UserDomain getUserByToken(String token);

    List<UserDomain> getAllUsers();
}
