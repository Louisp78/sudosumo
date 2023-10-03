package io.github.louisp78.sudosumo_backend.application;

import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import io.github.louisp78.sudosumo_backend.exposition.dto.responses.UserDtoResponse;
import io.github.louisp78.sudosumo_backend.infra.exceptions.NotEnoughInformationToCreateUserException;
import io.github.louisp78.sudosumo_backend.infra.exceptions.UserNotFoundException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

import java.util.List;

//! This interface must take only UserDomain as parameters and return only UserDomain
public interface UserApplication {
    UserDomain createUser(UserDomain user, String sub) throws NotEnoughInformationToCreateUserException;

    UserDomain getUser(Long id) throws UserNotFoundException;
    UserDomain getUser(String sub) throws UserNotFoundException;

    List<UserDomain> getAllUsers();
}
