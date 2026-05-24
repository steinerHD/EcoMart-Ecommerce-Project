package com.ecomart.backend;

import com.ecomart.backend.dto.request.ActualizarItemRequest;
import com.ecomart.backend.dto.request.AgregarItemRequest;
import com.ecomart.backend.exception.BadRequestException;
import com.ecomart.backend.exception.ResourceNotFoundException;
import com.ecomart.backend.model.Carrito;
import com.ecomart.backend.model.ItemCarrito;
import com.ecomart.backend.model.Pedido;
import com.ecomart.backend.model.Producto;
import com.ecomart.backend.model.Usuario;
import com.ecomart.backend.repository.CarritoRepository;
import com.ecomart.backend.repository.ItemCarritoRepository;
import com.ecomart.backend.repository.PedidoRepository;
import com.ecomart.backend.repository.ProductoRepository;
import com.ecomart.backend.repository.UsuarioRepository;
import com.ecomart.backend.service.CarritoService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CarritoServiceTest {

    @Mock
    private CarritoRepository carritoRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private ProductoRepository productoRepository;

    @Mock
    private ItemCarritoRepository itemCarritoRepository;

    @Mock
    private PedidoRepository pedidoRepository;

    @InjectMocks
    private CarritoService carritoService;

    private Usuario usuario;
    private Producto producto;
    private Carrito carrito;

    @BeforeEach
    void setUp() {

        usuario = Usuario.builder()
                .id(1L)
                .email("test@test.com")
                .nombre("Juan")
                .apellido("Perez")
                .activo(true)
                .rol(Usuario.RolUsuario.cliente)
                .build();

        producto = Producto.builder()
                .id(1L)
                .nombre("Mouse")
                .precio(BigDecimal.valueOf(50))
                .stock(10)
                .activo(true)
                .build();

        carrito = Carrito.builder()
                .id(1L)
                .usuario(usuario)
                .estado(Carrito.EstadoCarrito.activo)
                .items(new ArrayList<>())
                .build();

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                        "test@test.com",
                        null
                )
        );
    }

    @Test
    void obtenerOCrearCarrito_deberiaRetornarCarritoExistente() {

        when(usuarioRepository.findByEmail("test@test.com"))
                .thenReturn(Optional.of(usuario));

        when(carritoRepository.findByUsuarioIdAndEstado(
                1L,
                Carrito.EstadoCarrito.activo
        )).thenReturn(Optional.of(carrito));

        var response = carritoService.obtenerOCrearCarrito();

        assertNotNull(response);
        assertEquals(1L, response.getId());

        verify(carritoRepository)
                .findByUsuarioIdAndEstado(1L, Carrito.EstadoCarrito.activo);
    }

    @Test
    void agregarItem_deberiaAgregarProductoCorrectamente() {

        AgregarItemRequest request = new AgregarItemRequest();
        request.setProductoId(1L);
        request.setCantidad(2);

        when(usuarioRepository.findByEmail("test@test.com"))
                .thenReturn(Optional.of(usuario));

        when(carritoRepository.findByUsuarioIdAndEstado(
                1L,
                Carrito.EstadoCarrito.activo
        )).thenReturn(Optional.of(carrito));

        when(productoRepository.findById(1L))
                .thenReturn(Optional.of(producto));

        when(itemCarritoRepository.findByCarritoIdAndProductoId(1L, 1L))
                .thenReturn(Optional.empty());

        var response = carritoService.agregarItem(request);

        assertNotNull(response);

        verify(carritoRepository).save(any(Carrito.class));
    }

    @Test
    void agregarItem_deberiaLanzarErrorPorStock() {

        AgregarItemRequest request = new AgregarItemRequest();
        request.setProductoId(1L);
        request.setCantidad(20);

        when(usuarioRepository.findByEmail("test@test.com"))
                .thenReturn(Optional.of(usuario));

        when(carritoRepository.findByUsuarioIdAndEstado(
                1L,
                Carrito.EstadoCarrito.activo
        )).thenReturn(Optional.of(carrito));

        when(productoRepository.findById(1L))
                .thenReturn(Optional.of(producto));

        assertThrows(
                BadRequestException.class,
                () -> carritoService.agregarItem(request)
        );
    }

    @Test
    void actualizarItem_deberiaActualizarCantidad() {

        ItemCarrito item = ItemCarrito.builder()
                .id(1L)
                .producto(producto)
                .cantidad(1)
                .precioUnitario(BigDecimal.valueOf(50))
                .build();

        carrito.getItems().add(item);

        ActualizarItemRequest request = new ActualizarItemRequest();
        request.setCantidad(3);

        when(usuarioRepository.findByEmail("test@test.com"))
                .thenReturn(Optional.of(usuario));

        when(carritoRepository.findByUsuarioIdAndEstado(
                1L,
                Carrito.EstadoCarrito.activo
        )).thenReturn(Optional.of(carrito));

        var response = carritoService.actualizarItem(1L, request);

        assertNotNull(response);
        assertEquals(3, item.getCantidad());

        verify(carritoRepository).save(carrito);
    }

    @Test
    void eliminarItem_deberiaEliminarItem() {

        ItemCarrito item = ItemCarrito.builder()
                .id(1L)
                .producto(producto)
                .cantidad(1)
                .precioUnitario(BigDecimal.valueOf(50))
                .build();

        carrito.getItems().add(item);

        when(usuarioRepository.findByEmail("test@test.com"))
                .thenReturn(Optional.of(usuario));

        when(carritoRepository.findByUsuarioIdAndEstado(
                1L,
                Carrito.EstadoCarrito.activo
        )).thenReturn(Optional.of(carrito));

        var response = carritoService.eliminarItem(1L);

        assertNotNull(response);
        assertEquals(0, carrito.getItems().size());

        verify(carritoRepository).save(carrito);
    }

    @Test
    void checkout_deberiaCrearPedido() {

        ItemCarrito item = ItemCarrito.builder()
                .id(1L)
                .producto(producto)
                .cantidad(2)
                .precioUnitario(BigDecimal.valueOf(50))
                .build();

        carrito.getItems().add(item);

        when(usuarioRepository.findByEmail("test@test.com"))
                .thenReturn(Optional.of(usuario));

        when(carritoRepository.findByUsuarioIdAndEstado(
                1L,
                Carrito.EstadoCarrito.activo
        )).thenReturn(Optional.of(carrito));

        var response = carritoService.checkout();

        assertNotNull(response);
        assertEquals("pagado", response.getEstado());

        verify(pedidoRepository).save(any(Pedido.class));
        verify(carritoRepository, times(1)).save(carrito);
    }

    @Test
    void checkout_deberiaLanzarErrorSiCarritoEstaVacio() {

        when(usuarioRepository.findByEmail("test@test.com"))
                .thenReturn(Optional.of(usuario));

        when(carritoRepository.findByUsuarioIdAndEstado(
                1L,
                Carrito.EstadoCarrito.activo
        )).thenReturn(Optional.of(carrito));

        assertThrows(
                BadRequestException.class,
                () -> carritoService.checkout()
        );
    }

    @Test
    void actualizarItem_deberiaLanzarErrorSiNoExisteItem() {

        ActualizarItemRequest request = new ActualizarItemRequest();
        request.setCantidad(2);

        when(usuarioRepository.findByEmail("test@test.com"))
                .thenReturn(Optional.of(usuario));

        when(carritoRepository.findByUsuarioIdAndEstado(
                1L,
                Carrito.EstadoCarrito.activo
        )).thenReturn(Optional.of(carrito));

        assertThrows(
                ResourceNotFoundException.class,
                () -> carritoService.actualizarItem(99L, request)
        );
    }
}