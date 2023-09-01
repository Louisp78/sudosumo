package io.github.louisp78.sudosumo_backend.infra;

import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import io.github.louisp78.sudosumo_backend.domain.UserRepository;
import io.github.louisp78.sudosumo_backend.infra.UserRepositoryImpl;
import io.github.louisp78.sudosumo_backend.infra.UserRepositoryJPA;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;


import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@ActiveProfiles("test")
public class UserRepositoryImplTests {

    @Autowired
    private UserRepository userRepository;

    @Test
    @Transactional
    @DirtiesContext
    void testCreateUser() {
        UserDomain userToSave = new UserDomain(1L, "token", 0);
        UserDomain userSaved = userRepository.createUser( "token");

        assertEquals(userToSave, userSaved);
    }
}
