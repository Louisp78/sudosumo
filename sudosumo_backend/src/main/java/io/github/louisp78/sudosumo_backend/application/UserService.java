package io.github.louisp78.sudosumo_backend.application;

import io.github.louisp78.sudosumo_backend.application.dto.UserDto;
import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import io.github.louisp78.sudosumo_backend.domain.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    public UserDomain createUser(String email) {
        UserDomain existingUser = userRepository.getUserByEmail(email);
        if (existingUser != null) {
            return existingUser;
        } else {
            return userRepository.createUser(email);
        }
    }

    @Override
    public UserDomain getUser(Long id) {
        return userRepository.getUserById(id);
    }

    @Override
    public List<UserDomain> getAllUsers() {
        return userRepository.getAllUsers();
    }

    @Override
    public UserDomain getUserByEmail(String email) {
       return userRepository.getUserByEmail(email);
    }
}
