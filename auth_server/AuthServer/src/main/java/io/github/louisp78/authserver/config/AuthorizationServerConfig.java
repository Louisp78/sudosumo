package io.github.louisp78.sudosumo_backend.infra;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import io.github.louisp78.sudosumo_backend.infra.keys.JwksKeys;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.OidcScopes;
import org.springframework.security.oauth2.server.authorization.client.InMemoryRegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.config.annotation.web.configuration.OAuth2AuthorizationServerConfiguration;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.security.web.SecurityFilterChain;

import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.util.UUID;

@Configuration
public class AuthorizationServerConfig {

     @Bean
     @Order(Ordered.HIGHEST_PRECEDENCE)
    public SecurityFilterChain securityAuthFilterChain(HttpSecurity http) throws Exception {
         OAuth2AuthorizationServerConfiguration.applyDefaultSecurity(http);
         return http.formLogin(Customizer.withDefaults()).build();

    }

    @Bean
    public RegisteredClientRepository registeredClientRepository() {
         var registerClient = RegisteredClient.withId(UUID.randomUUID().toString())
                 .clientId("client")
                 .clientSecret("secret")
                 .scope(OidcScopes.OPENID)
                 .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                 .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                 .authorizationGrantType(AuthorizationGrantType.REFRESH_TOKEN)
                 .redirectUri("http://localhost:3000/authorized")
                 .tokenSettings(TokenSettings.builder()
                         .accessTokenTimeToLive(Duration.ofHours(10))
                         .refreshTokenTimeToLive(Duration.ofHours(10))
                         .build())
                 .clientSettings(ClientSettings.builder()
                         .requireAuthorizationConsent(true)
                         .build())
                 .build();

         return new InMemoryRegisteredClientRepository(registerClient);
    }

    //TODO : possible missing provider settings here

    public JWKSource<SecurityContext> jwkSource() throws NoSuchAlgorithmException {
        RSAKey rsaKey = JwksKeys.generateRSAKey();

        JWKSet set = new JWKSet(rsaKey);
        return (jwkSelector, securityContext) -> jwkSelector.select(set);
    }
}
