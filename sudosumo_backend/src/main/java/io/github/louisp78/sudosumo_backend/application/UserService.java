package io.github.louisp78.sudosumo_backend.application;

import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import io.github.louisp78.sudosumo_backend.domain.UserRepository;
import io.github.louisp78.sudosumo_backend.exposition.dto.requests.UserDtoRequest;
import io.github.louisp78.sudosumo_backend.exposition.dto.responses.UserDtoResponse;
import io.github.louisp78.sudosumo_backend.infra.exceptions.NotEnoughInformationToCreateUserException;
import io.github.louisp78.sudosumo_backend.infra.exceptions.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements UserApplication {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //TODO: check that token is not already in use
    // if not in use, create user
    // if in use, return user
    @Override
    public UserDomain createUser(UserDomain user, String sub) throws NotEnoughInformationToCreateUserException {
        UserDomain existingUser;
        if (sub != null)
            existingUser = userRepository.getUserBySub(sub);
        else
            throw new NotEnoughInformationToCreateUserException();
        if (existingUser != null) {
            return existingUser;
        } else {
            return userRepository.createUser(user, sub);
        }
    }

    @Override
    public UserDomain getUser(Long id) throws UserNotFoundException {
        return userRepository.getUserById(id);
    }

    @Override
    public UserDomain getUser(String sub) throws UserNotFoundException {
        return userRepository.getUserBySub(sub);
    }

    @Override
    public List<UserDomain> getAllUsers() {
        return userRepository.getAllUsers();
    }
}
