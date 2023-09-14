package io.github.louisp78.sudosumo_backend.infra;

import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import io.github.louisp78.sudosumo_backend.domain.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepositoryImpl implements UserRepository {

    final UserRepositoryJPA userRepositoryJPA;
    @Autowired
    public UserRepositoryImpl(final UserRepositoryJPA usersRepositoryJPA) {
        this.userRepositoryJPA = usersRepositoryJPA;
    }

    public UserDomain createUser(String email) {
        UserEntity userEntityToSave = new UserEntity();
        userEntityToSave.setEmail(email);
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
    public List<UserDomain> getAllUsers() {
        List<UserEntity> usersFound = userRepositoryJPA.findAll();
        return usersFound.stream().map(MapperInfra::userEntityToDomain).toList();
    }

    @Override
    public UserDomain getUserByEmail(String email) {
        UserEntity userFound = userRepositoryJPA.findUserEntityByEmail(email);
        if (userFound == null) {
            return null;
        }
        return MapperInfra.userEntityToDomain(userFound);
    }
}
