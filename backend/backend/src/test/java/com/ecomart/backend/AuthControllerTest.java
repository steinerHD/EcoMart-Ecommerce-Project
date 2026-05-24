package com.ecomart.backend;

import com.ecomart.backend.controller.AuthController;
import com.ecomart.backend.dto.request.LoginRequest;
import com.ecomart.backend.dto.request.RegisterRequest;
import com.ecomart.backend.dto.response.AuthResponse;
import com.ecomart.backend.service.AuthService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private AuthService authService;

    @InjectMocks
    private AuthController authController;

    @Test
    void register_deberiaRetornar201() {

        RegisterRequest request = new RegisterRequest();
        request.setNombre("Juan");
        request.setApellido("Perez");
        request.setEmail("test@test.com");
        request.setPassword("12345678");

        AuthResponse authResponse = AuthResponse.builder()
                .token("token")
                .email("test@test.com")
                .build();

        when(authService.register(request))
                .thenReturn(authResponse);

        ResponseEntity<AuthResponse> response =
                authController.register(request);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
    }

    @Test
    void login_deberiaRetornar200() {

        LoginRequest request = new LoginRequest();
        request.setEmail("test@test.com");
        request.setPassword("12345678");

        AuthResponse authResponse = AuthResponse.builder()
                .token("token")
                .email("test@test.com")
                .build();

        when(authService.login(request))
                .thenReturn(authResponse);

        ResponseEntity<AuthResponse> response =
                authController.login(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertNotNull(response.getBody());
    }
}