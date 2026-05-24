package com.ecomart.backend;

import com.ecomart.backend.controller.ProductoController;
import com.ecomart.backend.dto.response.ProductoResponse;
import com.ecomart.backend.service.ProductoService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ProductoControllerTest {

    @Mock
    private ProductoService productoService;

    @InjectMocks
    private ProductoController productoController;

    @Test
    void listarProductos_deberiaRetornarLista() {

        ProductoResponse producto = ProductoResponse.builder()
                .id(1L)
                .nombre("Mouse")
                .precio(BigDecimal.valueOf(100))
                .build();

        when(productoService.listarProductos())
                .thenReturn(List.of(producto));

        ResponseEntity<List<ProductoResponse>> response =
                productoController.listarProductos();

        assertEquals(200, response.getStatusCode().value());
        assertEquals(1, response.getBody().size());
    }
}