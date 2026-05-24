package com.ecomart.backend;

import com.ecomart.backend.controller.CarritoController;
import com.ecomart.backend.dto.request.ActualizarItemRequest;
import com.ecomart.backend.dto.request.AgregarItemRequest;
import com.ecomart.backend.dto.response.CarritoResponse;
import com.ecomart.backend.dto.response.PedidoResponse;
import com.ecomart.backend.service.CarritoService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CarritoControllerTest {

    @Mock
    private CarritoService carritoService;

    @InjectMocks
    private CarritoController carritoController;

    @Test
    void obtenerCarrito_deberiaRetornar200() {

        CarritoResponse responseMock = CarritoResponse.builder()
                .id(1L)
                .total(BigDecimal.valueOf(100))
                .build();

        when(carritoService.obtenerOCrearCarrito())
                .thenReturn(responseMock);

        ResponseEntity<CarritoResponse> response =
                carritoController.obtenerCarrito();

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void agregarItem_deberiaRetornar201() {

        AgregarItemRequest request = new AgregarItemRequest();

        CarritoResponse responseMock = CarritoResponse.builder()
                .id(1L)
                .build();

        when(carritoService.agregarItem(request))
                .thenReturn(responseMock);

        ResponseEntity<CarritoResponse> response =
                carritoController.agregarItem(request);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }

    @Test
    void actualizarItem_deberiaRetornar200() {

        ActualizarItemRequest request =
                new ActualizarItemRequest();

        CarritoResponse responseMock =
                CarritoResponse.builder().build();

        when(carritoService.actualizarItem(1L, request))
                .thenReturn(responseMock);

        ResponseEntity<CarritoResponse> response =
                carritoController.actualizarItem(1L, request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void eliminarItem_deberiaRetornar200() {

        CarritoResponse responseMock =
                CarritoResponse.builder().build();

        when(carritoService.eliminarItem(1L))
                .thenReturn(responseMock);

        ResponseEntity<CarritoResponse> response =
                carritoController.eliminarItem(1L);

        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    void checkout_deberiaRetornar201() {

        PedidoResponse pedido =
                PedidoResponse.builder()
                        .id(1L)
                        .estado("pagado")
                        .build();

        when(carritoService.checkout())
                .thenReturn(pedido);

        ResponseEntity<PedidoResponse> response =
                carritoController.checkout();

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
    }
}