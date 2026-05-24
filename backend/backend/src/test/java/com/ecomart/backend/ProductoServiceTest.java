package com.ecomart.backend;

import com.ecomart.backend.service.ProductoService;

import com.ecomart.backend.model.Producto;
import com.ecomart.backend.repository.ProductoRepository;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductoServiceTest {

    @Mock
    private ProductoRepository productoRepository;

    @InjectMocks
    private ProductoService productoService;

    @Test
    void listarProductos_deberiaRetornarLista() {

        Producto producto = Producto.builder()
                .id(1L)
                .nombre("Laptop")
                .precio(BigDecimal.valueOf(2500))
                .activo(true)
                .build();

        when(productoRepository.findByActivoTrue())
                .thenReturn(List.of(producto));

        var response = productoService.listarProductos();

        assertEquals(1, response.size());
        assertEquals("Laptop", response.get(0).getNombre());

        verify(productoRepository).findByActivoTrue();
    }
}
