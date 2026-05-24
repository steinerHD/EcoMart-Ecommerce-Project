package com.ecomart.backend.dto.response;

import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@Builder
public class ItemCarritoResponse {

    private Long id;
    private Long productoId;
    private String productoNombre;
    private String productoImagenUrl;
    private BigDecimal precioUnitario;
    private Integer cantidad;
    private BigDecimal subtotal;
    private Integer stock;
}
