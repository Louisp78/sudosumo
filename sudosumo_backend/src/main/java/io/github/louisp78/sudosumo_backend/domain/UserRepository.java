package io.github.louisp78.sudosumo_backend.domain;

import io.github.louisp78.sudosumo_backend.exposition.dto.responses.UserDtoResponse;
import io.github.louisp78.sudosumo_backend.infra.exceptions.UserNotFoundException;

import java.util.List;

public interface UserRepository {
    UserDomain createUser(UserDomain user, String sub);
    UserDomain getUserById(long l) ;
    UserDomain getUserBySub(String sub);

    List<UserDomain> getAllUsers();

    UserDomain getUserByEmail(String email);

}
