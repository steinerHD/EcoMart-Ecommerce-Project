package com.ecomart.backend;

import com.ecomart.backend.dto.response.CarritoResponse;
import com.ecomart.backend.mapper.CarritoMapper;
import com.ecomart.backend.model.Carrito;
import com.ecomart.backend.model.ItemCarrito;
import com.ecomart.backend.model.Producto;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class CarritoMapperTest {

    @Test
    void toCarritoResponse_deberiaMapearCorrectamente() {

        Producto producto = Producto.builder()
                .id(1L)
                .nombre("Laptop")
                .imagenUrl("img.jpg")
                .build();

        ItemCarrito item = ItemCarrito.builder()
                .id(1L)
                .producto(producto)
                .cantidad(2)
                .precioUnitario(BigDecimal.valueOf(100))
                .build();

        Carrito carrito = Carrito.builder()
                .id(1L)
                .items(List.of(item))
                .build();

        CarritoResponse response =
                CarritoMapper.toCarritoResponse(carrito);

        assertEquals(1L, response.getId());
        assertEquals(1, response.getItems().size());
        assertEquals(200, response.getTotal().intValue());
        assertEquals(2, response.getCantidadItems());
    }
}