package com.nomadax.config;

import lombok.Value;
import org.springframework.stereotype.Component;

@Component //si no esta esto no funca Value
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private Long expiration;
}
