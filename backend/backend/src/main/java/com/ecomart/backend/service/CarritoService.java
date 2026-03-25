package com.ecomart.backend.service;

import com.ecomart.backend.dto.response.CarritoResponse;
import com.ecomart.backend.exception.ResourceNotFoundException;
import com.ecomart.backend.mapper.CarritoMapper;
import com.ecomart.backend.model.Carrito;
import com.ecomart.backend.model.Usuario;
import com.ecomart.backend.repository.CarritoRepository;
import com.ecomart.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CarritoService {

    private final CarritoRepository carritoRepository;
    private final UsuarioRepository usuarioRepository;

    // ─────────────────────────────────────────
    // Obtener o crear carrito activo del usuario
    // ─────────────────────────────────────────

    @Transactional
    public CarritoResponse obtenerOCrearCarrito() {
        Usuario usuario = obtenerUsuarioAutenticado();

        Carrito carrito = carritoRepository
                .findByUsuarioIdAndEstado(
                        usuario.getId(),
                        Carrito.EstadoCarrito.activo
                )
                .orElseGet(() -> crearCarrito(usuario));

        return CarritoMapper.toCarritoResponse(carrito);
    }

    // ─────────────────────────────────────────
    // Crear carrito nuevo
    // ─────────────────────────────────────────

    private Carrito crearCarrito(Usuario usuario) {
        Carrito nuevoCarrito = Carrito.builder()
                .usuario(usuario)
                .estado(Carrito.EstadoCarrito.activo)
                .build();
        return carritoRepository.save(nuevoCarrito);
    }

    // ─────────────────────────────────────────
    // Obtener usuario autenticado desde el contexto
    // ─────────────────────────────────────────

    protected Usuario obtenerUsuarioAutenticado() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Usuario no encontrado: " + email));
    }
}