package io.github.louisp78.sudosumo_backend.exposition;

import io.github.louisp78.sudosumo_backend.exposition.dto.UserDto;
import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import org.modelmapper.ModelMapper;

public final class MapperExpo {

    private static final ModelMapper modelMapper = new ModelMapper();
    private MapperExpo() {
        throw new IllegalStateException("Utility class");
    }

    public static UserDto userDomainToDto(UserDomain user) {
        return modelMapper.map(user, UserDto.class);
    }

    public static UserDomain userDtoToDomain(UserDto userDto) {
        return modelMapper.map(userDto, UserDomain.class);
    }
}
