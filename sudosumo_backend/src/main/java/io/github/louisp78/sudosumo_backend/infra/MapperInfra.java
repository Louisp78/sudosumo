package io.github.louisp78.sudosumo_backend.infra;

import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import org.modelmapper.ModelMapper;

public final class MapperInfra {

    private static final ModelMapper modelMapper = new ModelMapper();
    private MapperInfra() throws IllegalStateException {
        throw new IllegalStateException("Utility class");
    }

    public static UserEntity userDomainToEntity(UserDomain userDomain) throws IllegalArgumentException {
        if (userDomain == null) {
            throw new IllegalArgumentException("userDomain is null");
        }
        return modelMapper.map(userDomain, UserEntity.class);
    }

    public static UserDomain userEntityToDomain(UserEntity userEntity) throws IllegalArgumentException {
        if (userEntity == null) {
            throw new IllegalArgumentException("userEntity is null");
        }
        return modelMapper.map(userEntity, UserDomain.class);
    }
}
