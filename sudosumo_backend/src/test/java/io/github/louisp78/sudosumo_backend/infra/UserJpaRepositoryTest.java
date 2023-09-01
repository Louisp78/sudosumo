package io.github.louisp78.sudosumo_backend.infra;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@TestPropertySource(locations = "classpath:application-test.properties")
public class UserJpaRepositoryTest {

    @Autowired
    private UserRepositoryJPA userRepositoryJPA;

    @Test
    @Transactional
    @DirtiesContext
    public void testCreateUser() {
        UserEntity userEntityToSave = new UserEntity();
        userEntityToSave.setToken("token");
        UserEntity userSaved = userRepositoryJPA.save(userEntityToSave);

        assertThat(userSaved).isNotNull();
        assertThat(userSaved.getId()).isEqualTo(1L);
    }

    @Test
    @Transactional
    @DirtiesContext
    public void testGetUserByToken() {
        UserEntity userEntityToSave = new UserEntity();
        userEntityToSave.setToken("token");
        UserEntity userSaved = userRepositoryJPA.save(userEntityToSave);
        UserEntity userFound = userRepositoryJPA.findUserEntityByToken("token");

        assertThat(userFound).isNotNull();
        assertThat(userFound.getId()).isEqualTo(1L);
    }


}
