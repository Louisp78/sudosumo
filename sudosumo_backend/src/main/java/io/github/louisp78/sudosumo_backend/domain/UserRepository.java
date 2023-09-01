package io.github.louisp78.sudosumo_backend.domain;

public interface UserRepository {
    UserDomain createUser(String token);
    UserDomain getUserById(long l);

    UserDomain getUserByToken(String token);
}
