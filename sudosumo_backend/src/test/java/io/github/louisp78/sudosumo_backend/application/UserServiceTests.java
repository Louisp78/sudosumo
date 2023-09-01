package io.github.louisp78.sudosumo_backend.application;

import io.github.louisp78.sudosumo_backend.application.dto.UserDto;
import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import io.github.louisp78.sudosumo_backend.domain.UserRepository;
import io.github.louisp78.sudosumo_backend.exposition.MapperExpo;
import jakarta.transaction.Transactional;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Bean;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class UserServiceTests {

    @MockBean
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @BeforeEach
    public void setUp() {
        UserDomain userDomain = new UserDomain(1L, "token", 0);

        Mockito.when(userRepository.getUserByToken("token")).thenReturn(userDomain);
        Mockito.when(userRepository.createUser("token")).thenReturn(userDomain);
        Mockito.when(userRepository.getUserById(1L)).thenReturn(userDomain);
    }

    @Test
    void contextLoads() {
        assertThat(userService).isNotNull();
    }

    @Test
    public void testCreateUser() {
        UserDto userDto = new UserDto();
        userDto.setScore(0);

        UserDomain createdUser = userService.createUser( "token");

        assertThat(createdUser).isNotNull();
        assertThat(createdUser.getId()).isEqualTo(1L);
        assertThat(createdUser.getScore()).isEqualTo(0);
    }

    @Test
    public void testCreateAndGetUser() {
        UserDto userDto = new UserDto();
        userDto.setScore(0);

        UserDomain createdUser = userService.createUser( "token");

        assertThat(createdUser).isNotNull();

        UserDomain user = userService.getUser(createdUser.getId());

        assertNotNull(user);
    }

    @Test
    public void testCreateUserButUserAlreadyExist() {
        String token = "token";

        UserDomain createdUser = userService.createUser(token);

        assertThat(createdUser).isNotNull();
        assertThat(createdUser.getId()).isEqualTo(1L);

    }
}
