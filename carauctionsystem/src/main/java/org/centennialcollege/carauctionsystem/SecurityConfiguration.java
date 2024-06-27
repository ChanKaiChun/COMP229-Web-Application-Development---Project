package org.centennialcollege.carauctionsystem;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf((csrf) -> csrf.disable())
            .authorizeHttpRequests((authz) -> authz
                    .requestMatchers("/swagger-ui/**", "/api-docs/**").permitAll() // For swagger
                    .requestMatchers("/login/**", "/register/**").permitAll() // For register and login
                    .anyRequest().denyAll()
            )
            .httpBasic(withDefaults());
        return http.build();
    }
}
