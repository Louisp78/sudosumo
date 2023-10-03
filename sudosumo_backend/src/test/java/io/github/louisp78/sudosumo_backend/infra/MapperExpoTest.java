package io.github.louisp78.sudosumo_backend.infra;

import io.github.louisp78.sudosumo_backend.exposition.MapperExpo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
public class MapperExpoTest {
    final MapperExpo mapperExpo;

    @Autowired
    public MapperExpoTest(MapperExpo mapperExpo) {
        this.mapperExpo = mapperExpo;
    }

    @Test
    public void testOidcUserToUserDtoRequest() {
        // mock OidcUser
        mapperExpo.oidcUserToUserDtoRequest();
    }

}
