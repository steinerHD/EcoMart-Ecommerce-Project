package com.ecomart.backend.mapper;

import com.ecomart.backend.dto.response.PedidoResponse;
import com.ecomart.backend.model.ItemPedido;
import com.ecomart.backend.model.Pedido;

import java.util.List;

public class PedidoMapper {

    public static PedidoResponse toPedidoResponse(Pedido pedido) {

        List<PedidoResponse.ItemPedidoResponse> items = pedido.getItems()
                .stream()
                .map(PedidoMapper::toItemResponse)
                .toList();

        return PedidoResponse.builder()
                .id(pedido.getId())
                .total(pedido.getTotal())
                .estado(pedido.getEstado().name())
                .createdAt(pedido.getCreatedAt())
                .items(items)
                .build();
    }

    private static PedidoResponse.ItemPedidoResponse toItemResponse(
            ItemPedido item) {
        return PedidoResponse.ItemPedidoResponse.builder()
                .id(item.getId())
                .nombreProducto(item.getNombreProducto())
                .cantidad(item.getCantidad())
                .precioUnitario(item.getPrecioUnitario())
                .subtotal(item.getSubtotal())
                .build();
    }

    private PedidoMapper() {}
}