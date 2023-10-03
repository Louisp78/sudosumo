package io.github.louisp78.sudosumo_backend.exposition;

import io.github.louisp78.sudosumo_backend.exposition.dto.requests.UserDtoRequest;
import io.github.louisp78.sudosumo_backend.exposition.dto.responses.UserDtoResponse;
import io.github.louisp78.sudosumo_backend.domain.UserDomain;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.Banner;
import org.springframework.security.oauth2.core.oidc.StandardClaimAccessor;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

@Service
public class MapperExpo {

    private final ModelMapper modelMapper;

    @Autowired
    public MapperExpo(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public UserDomain userDtoRequestToDomain(UserDtoRequest userDto) {
        return modelMapper.map(userDto, UserDomain.class);
    }

    public UserDtoResponse userDomainToDtoResponse(UserDomain user) {
        return modelMapper.map(user, UserDtoResponse.class);
    }

    public UserDtoRequest oidcUserToUserDtoRequest(OidcUser user) {
        UserDtoRequest userDtoRequest = new UserDtoRequest();
        userDtoRequest.setEmail(user.getEmail());
        userDtoRequest.setFirstName(user.getGivenName());
        userDtoRequest.setLastName(user.getFamilyName());
        userDtoRequest.setSub(user.getSubject());
        userDtoRequest.setUsername(user.getPreferredUsername());
        return userDtoRequest;
    }
}
