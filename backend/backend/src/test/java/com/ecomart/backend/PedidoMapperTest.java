package com.ecomart.backend;

import com.ecomart.backend.dto.response.PedidoResponse;
import com.ecomart.backend.mapper.PedidoMapper;
import com.ecomart.backend.model.ItemPedido;
import com.ecomart.backend.model.Pedido;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class PedidoMapperTest {

    @Test
    void toPedidoResponse_deberiaMapearCorrectamente() {

        ItemPedido item = ItemPedido.builder()
                .id(1L)
                .nombreProducto("Mouse")
                .cantidad(2)
                .precioUnitario(BigDecimal.valueOf(50))
                .subtotal(BigDecimal.valueOf(100))
                .build();

        Pedido pedido = Pedido.builder()
                .id(1L)
                .total(BigDecimal.valueOf(100))
                .estado(Pedido.EstadoPedido.pagado)
                .items(List.of(item))
                .build();

        PedidoResponse response =
                PedidoMapper.toPedidoResponse(pedido);

        assertEquals(1L, response.getId());
        assertEquals("pagado", response.getEstado());
        assertEquals(1, response.getItems().size());
    }
}