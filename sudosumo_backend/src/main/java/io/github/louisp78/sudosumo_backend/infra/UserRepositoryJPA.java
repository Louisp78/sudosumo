package io.github.louisp78.sudosumo_backend.infra;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepositoryJPA extends JpaRepository<UserEntity, Long> {
    UserEntity findUserEntityByEmail(String email);
    UserEntity findUserEntityBySub(String sub);
}
