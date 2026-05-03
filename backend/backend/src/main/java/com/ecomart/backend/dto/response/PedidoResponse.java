package com.ecomart.backend.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class PedidoResponse {

    private Long id;
    private BigDecimal total;
    private String estado;
    private LocalDateTime createdAt;
    private List<ItemPedidoResponse> items;

    @Getter
    @Builder
    public static class ItemPedidoResponse {
        private Long id;
        private String nombreProducto;
        private Integer cantidad;
        private BigDecimal precioUnitario;
        private BigDecimal subtotal;
    }
}