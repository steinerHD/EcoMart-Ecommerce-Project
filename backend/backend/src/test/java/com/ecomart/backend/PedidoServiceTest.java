package com.ecomart.backend;

import com.ecomart.backend.model.Pedido;
import com.ecomart.backend.model.Usuario;
import com.ecomart.backend.repository.PedidoRepository;
import com.ecomart.backend.repository.UsuarioRepository;
import com.ecomart.backend.service.PedidoService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class PedidoServiceTest {

    @Mock
    private PedidoRepository pedidoRepository;

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private PedidoService pedidoService;

    private Usuario usuario;

    @BeforeEach
    void setUp() {

        usuario = Usuario.builder()
                .id(1L)
                .email("test@test.com")
                .nombre("Juan")
                .build();

        SecurityContextHolder.getContext().setAuthentication(
                new UsernamePasswordAuthenticationToken(
                        "test@test.com",
                        null
                )
        );
    }

    @Test
    void listarPedidos_deberiaRetornarPedidos() {

        Pedido pedido = Pedido.builder()
                .id(1L)
                .total(BigDecimal.valueOf(100))
                .estado(Pedido.EstadoPedido.pendiente)
                .build();

        when(usuarioRepository.findByEmail("test@test.com"))
                .thenReturn(Optional.of(usuario));

        when(pedidoRepository.findByUsuarioIdOrderByCreatedAtDesc(1L))
                .thenReturn(List.of(pedido));

        var response = pedidoService.listarPedidos();

        assertEquals(1, response.size());

        verify(pedidoRepository)
                .findByUsuarioIdOrderByCreatedAtDesc(1L);
    }
}