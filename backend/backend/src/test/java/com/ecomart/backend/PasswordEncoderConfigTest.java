package com.ecomart.backend;

import com.ecomart.backend.config.PasswordEncoderConfig;
import org.junit.jupiter.api.Test;

import org.springframework.security.crypto.password.PasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

class PasswordEncoderConfigTest {

    @Test
    void passwordEncoder_deberiaCrearEncoder() {

        PasswordEncoderConfig config =
                new PasswordEncoderConfig();

        PasswordEncoder encoder =
                config.passwordEncoder();

        assertNotNull(encoder);

        String password = "123456";

        String hash = encoder.encode(password);

        assertTrue(encoder.matches(password, hash));
    }
}