package com.ecomart.backend;

import com.ecomart.backend.config.SecurityConfig;

import com.ecomart.backend.security.JwtAuthFilter;
import com.ecomart.backend.security.UserDetailsServiceImpl;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfigurationSource;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class SecurityConfigTest {

    @Mock
    private JwtAuthFilter jwtAuthFilter;

    @Mock
    private UserDetailsServiceImpl userDetailsService;

    private PasswordEncoder passwordEncoder;

    private SecurityConfig securityConfig;

    @BeforeEach
    void setUp() {

        MockitoAnnotations.openMocks(this);

        passwordEncoder = new BCryptPasswordEncoder();

        securityConfig = new SecurityConfig(
                jwtAuthFilter,
                userDetailsService,
                passwordEncoder
        );
    }

    @Test
    void authenticationProvider_deberiaRetornarProvider() {

        AuthenticationProvider provider =
                securityConfig.authenticationProvider();

        assertNotNull(provider);
    }

    @Test
    void corsConfigurationSource_deberiaCrearCors() {

        CorsConfigurationSource source =
                securityConfig.corsConfigurationSource();

        assertNotNull(source);
    }

    @Test
    void authenticationManager_deberiaRetornarManager() throws Exception {

        AuthenticationConfiguration configuration =
                mock(AuthenticationConfiguration.class);

        securityConfig.authenticationManager(configuration);

        verify(configuration).getAuthenticationManager();
    }
}