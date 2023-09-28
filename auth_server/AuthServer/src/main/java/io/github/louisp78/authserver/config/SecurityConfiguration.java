package io.github.louisp78.sudosumo_backend.infra;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .formLogin(Customizer.withDefaults())
                //.csrf(AbstractHttpConfigurer::disable)
                //.cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> {auth
                                .anyRequest().authenticated();
                })//.oauth2Login(oauth -> oauth.defaultSuccessUrl("/oauth2/google", true));
                /*.oauth2Login(oauth -> {
                    oauth.loginPage("/login").permitAll();
                    //oauth.successHandler()
                })*/.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:3000")); // <-- you may change "*"
        configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE", "PATCH"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList(
                "Accept", "Origin", "Content-Type", "Depth", "User-Agent", "If-Modified-Since,",
                "Cache-Control", "Authorization", "X-Req", "X-File-Size", "X-Requested-With", "X-File-Name"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public UserDetailsService userDetailsService() {
        var u1 = User.withUsername("bill").password("abc123")
                .authorities("read")
                .build();
        var uds = new InMemoryUserDetailsManager();
        uds.createUser(u1);
        return uds;
    }

    //TODO : setup a password encoder ?
}