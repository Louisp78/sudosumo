package io.github.louisp78.sudosumo_backend.integration;

import io.github.louisp78.sudosumo_backend.application.UserService;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@TestPropertySource(locations = "classpath:application-test.properties")
public class UserIntegrationTests {
   @Autowired
   private UserService userService;

   @Test
   @Transactional
   @DirtiesContext
    public void testAddUser() {
        userService.createUser("token");
        assertThat(userService.getUserByToken("token")).isNotNull();
    }

}
