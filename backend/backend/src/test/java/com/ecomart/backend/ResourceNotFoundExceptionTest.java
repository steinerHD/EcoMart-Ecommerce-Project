package com.ecomart.backend;

import com.ecomart.backend.exception.ResourceNotFoundException;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ResourceNotFoundExceptionTest {

    @Test
    void constructor_deberiaGuardarMensaje() {

        ResourceNotFoundException ex =
                new ResourceNotFoundException("No encontrado");

        assertEquals(
                "No encontrado",
                ex.getMessage()
        );
    }
}