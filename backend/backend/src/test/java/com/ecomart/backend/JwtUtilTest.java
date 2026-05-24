package com.ecomart.backend;

import com.ecomart.backend.security.JwtUtil;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.lang.reflect.Field;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class JwtUtilTest {

    private JwtUtil jwtUtil;

    @BeforeEach
    void setUp() throws Exception {

        jwtUtil = new JwtUtil();

        Field secretField =
                JwtUtil.class.getDeclaredField("secret");

        secretField.setAccessible(true);

        secretField.set(
                jwtUtil,
                "abcdefghijklmnopqrstuvxyzabcdefghijklmnopqrstuvxyz"
        );

        Field expirationField =
                JwtUtil.class.getDeclaredField("expiration");

        expirationField.setAccessible(true);

        expirationField.set(jwtUtil, 1000000L);
    }

    @Test
    void generateToken_deberiaGenerarTokenValido() {

        UserDetails user = new User(
                "test@test.com",
                "123",
                List.of()
        );

        String token = jwtUtil.generateToken(user);

        assertNotNull(token);
    }

    @Test
    void extractEmail_deberiaRetornarEmail() {

        UserDetails user = new User(
                "test@test.com",
                "123",
                List.of()
        );

        String token = jwtUtil.generateToken(user);

        String email = jwtUtil.extractEmail(token);

        assertEquals("test@test.com", email);
    }

    @Test
    void isTokenValid_deberiaRetornarTrue() {

        UserDetails user = new User(
                "test@test.com",
                "123",
                List.of()
        );

        String token = jwtUtil.generateToken(user);

        boolean valido =
                jwtUtil.isTokenValid(token, user);

        assertTrue(valido);
    }
}