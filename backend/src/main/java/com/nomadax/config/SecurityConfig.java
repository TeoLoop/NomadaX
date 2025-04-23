package com.nomadax.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/**").permitAll()  // Permitir acceso a todas las rutas sin autenticación
                        .anyRequest().authenticated())  // Requiere autenticación para otras rutas
                .csrf(csrf -> csrf.disable());  // Deshabilitar CSRF de la forma nueva (Spring Security 6+)

        return http.build();
    }

}
