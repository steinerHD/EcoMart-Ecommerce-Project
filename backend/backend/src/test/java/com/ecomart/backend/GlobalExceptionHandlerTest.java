package com.ecomart.backend;

import com.ecomart.backend.exception.BadRequestException;
import com.ecomart.backend.exception.GlobalExceptionHandler;
import com.ecomart.backend.exception.ResourceNotFoundException;

import org.junit.jupiter.api.Test;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

class GlobalExceptionHandlerTest {

    private final GlobalExceptionHandler handler =
            new GlobalExceptionHandler();

    @Test
    void handleBadRequest_deberiaRetornar400() {

        ResponseEntity<Map<String, Object>> response =
                handler.handleBadRequest(
                        new BadRequestException("Error")
                );

        assertEquals(400, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals("Error", response.getBody().get("mensaje"));
    }

    @Test
    void handleResourceNotFound_deberiaRetornar404() {

        ResponseEntity<Map<String, Object>> response =
                handler.handleResourceNotFound(
                        new ResourceNotFoundException("No encontrado")
                );

        assertEquals(404, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(
                "No encontrado",
                response.getBody().get("mensaje")
        );
    }

    @Test
    void handleBadCredentials_deberiaRetornar401() {

        ResponseEntity<Map<String, Object>> response =
                handler.handleBadCredentials(
                        new BadCredentialsException("Credenciales")
                );

        assertEquals(401, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(
                "Correo o contraseña incorrectos",
                response.getBody().get("mensaje")
        );
    }

    @Test
    void handleGenericException_deberiaRetornar500() {

        ResponseEntity<Map<String, Object>> response =
                handler.handleGenericException(
                        new RuntimeException("Error")
                );

        assertEquals(500, response.getStatusCode().value());
        assertNotNull(response.getBody());
        assertEquals(
                "Error interno del servidor",
                response.getBody().get("mensaje")
        );
    }
}