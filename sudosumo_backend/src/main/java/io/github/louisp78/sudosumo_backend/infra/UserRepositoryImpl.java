package io.github.louisp78.sudosumo_backend.infra;

import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import io.github.louisp78.sudosumo_backend.domain.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements UserRepository {

    final UserRepositoryJPA userRepositoryJPA;
    @Autowired
    public UserRepositoryImpl(final UserRepositoryJPA usersRepositoryJPA) {
        this.userRepositoryJPA = usersRepositoryJPA;
    }

    public UserDomain createUser(String token) {
        UserEntity userEntityToSave = new UserEntity();
        userEntityToSave.setToken(token);
        UserEntity userSaved = userRepositoryJPA.save(userEntityToSave);
        return MapperInfra.userEntityToDomain(userSaved);
    }

    @Override
    public UserDomain getUserById(long l) {
        UserEntity userFound = userRepositoryJPA.findById(l).orElse(null);
        if (userFound == null) {
            return null;
        }
        return MapperInfra.userEntityToDomain(userFound);
    }

    @Override
    public UserDomain getUserByToken(String token) {
        UserEntity userFound = userRepositoryJPA.findUserEntityByToken(token);
        if (userFound == null) {
            return null;
        }
        return MapperInfra.userEntityToDomain(userFound);
    }
}
