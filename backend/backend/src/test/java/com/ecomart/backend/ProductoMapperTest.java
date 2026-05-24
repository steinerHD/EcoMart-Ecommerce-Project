package com.ecomart.backend;

import com.ecomart.backend.dto.response.ProductoResponse;
import com.ecomart.backend.mapper.ProductoMapper;
import com.ecomart.backend.model.Categoria;
import com.ecomart.backend.model.Producto;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;

import static org.junit.jupiter.api.Assertions.*;

class ProductoMapperTest {

    @Test
    void toProductoResponse_deberiaMapearCorrectamente() {

        Categoria categoria = Categoria.builder()
                .nombre("Tecnologia")
                .build();

        Producto producto = Producto.builder()
                .id(1L)
                .nombre("Laptop")
                .descripcion("Gaming")
                .precio(BigDecimal.valueOf(5000))
                .stock(10)
                .activo(true)
                .categoria(categoria)
                .build();

        ProductoResponse response =
                ProductoMapper.toProductoResponse(producto);

        assertEquals("Laptop", response.getNombre());
        assertEquals("Tecnologia", response.getCategoriaNombre());
    }

    @Test
    void toProductoResponse_categoriaNull() {

        Producto producto = Producto.builder()
                .id(1L)
                .nombre("Laptop")
                .activo(true)
                .build();

        ProductoResponse response =
                ProductoMapper.toProductoResponse(producto);

        assertNull(response.getCategoriaNombre());
    }
}