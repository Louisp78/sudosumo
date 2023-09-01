package io.github.louisp78.sudosumo_backend.domain;

import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;


public class UserDomainTests {
	@Test
	public void objectInstance() {
		UserDomain userDomain = new UserDomain();
		userDomain.setId(1L);
		userDomain.setToken("token");
		userDomain.setScore(0);

		assertEquals(userDomain.getId(), 1L);
		assertEquals(userDomain.getToken(), "token");
		assertEquals(userDomain.getScore(), 0);
	}

}
