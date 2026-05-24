package com.ecomart.backend;

import com.ecomart.backend.controller.PedidoController;
import com.ecomart.backend.dto.response.PedidoResponse;
import com.ecomart.backend.service.PedidoService;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.ResponseEntity;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PedidoControllerTest {

    @Mock
    private PedidoService pedidoService;

    @InjectMocks
    private PedidoController pedidoController;

    @Test
    void listarPedidos_deberiaRetornarLista() {

        PedidoResponse pedido = PedidoResponse.builder()
                .id(1L)
                .estado("pagado")
                .build();

        when(pedidoService.listarPedidos())
                .thenReturn(List.of(pedido));

        ResponseEntity<List<PedidoResponse>> response =
                pedidoController.listarPedidos();

        assertEquals(1, response.getBody().size());

        verify(pedidoService).listarPedidos();
    }
}