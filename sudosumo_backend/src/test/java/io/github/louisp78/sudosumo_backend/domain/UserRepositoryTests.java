package io.github.louisp78.sudosumo_backend.domain;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import io.github.louisp78.sudosumo_backend.domain.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

public class UserRepositoryTests {

    @Mock
    private UserRepository userRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Test
    void testCreateUser() {
        UserDomain userToSave = new UserDomain();
        when(userRepository.createUser(userToSave,"token")).thenReturn(userToSave);

        UserDomain userSaved = userRepository.createUser(userToSave, "token");

        assertEquals(userToSave, userSaved);
    }

    @Test
    void testGetUserById() {
        long id = 1L;
        UserDomain expectedUser = new UserDomain();
        expectedUser.setId(id);
        when(userRepository.getUserById(id)).thenReturn(expectedUser);

        UserDomain actualUser = userRepository.getUserById(id);

        assertEquals(expectedUser, actualUser);
    }

}
