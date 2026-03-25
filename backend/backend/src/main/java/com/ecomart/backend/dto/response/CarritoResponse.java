package com.ecomart.backend.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Builder
public class CarritoResponse {

    private Long id;
    private List<ItemCarritoResponse> items;
    private BigDecimal total;
    private Integer cantidadItems;

    @Getter
    @Builder
    public static class ItemCarritoResponse {
        private Long id;
        private Long productoId;
        private String nombreProducto;
        private String imagenUrl;
        private BigDecimal precioUnitario;
        private Integer cantidad;
        private BigDecimal subtotal;
    }
}