package com.ecomart.backend.service;

import com.ecomart.backend.dto.request.AgregarItemRequest;
import com.ecomart.backend.dto.response.CarritoResponse;
import com.ecomart.backend.exception.BadRequestException;
import com.ecomart.backend.exception.ResourceNotFoundException;
import com.ecomart.backend.mapper.CarritoMapper;
import com.ecomart.backend.model.Carrito;
import com.ecomart.backend.model.ItemCarrito;
import com.ecomart.backend.model.Producto;
import com.ecomart.backend.model.Usuario;
import com.ecomart.backend.repository.CarritoRepository;
import com.ecomart.backend.repository.ItemCarritoRepository;
import com.ecomart.backend.repository.ProductoRepository;
import com.ecomart.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CarritoService {

    private final CarritoRepository carritoRepository;
    private final UsuarioRepository usuarioRepository;
    private final ProductoRepository productoRepository;
    private final ItemCarritoRepository itemCarritoRepository;

    // ─────────────────────────────────────────
    // Obtener o crear carrito activo
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
    // Agregar item al carrito
    // ─────────────────────────────────────────

    @Transactional
    public CarritoResponse agregarItem(AgregarItemRequest request) {
        Usuario usuario = obtenerUsuarioAutenticado();

        // 1. Obtener o crear carrito activo
        Carrito carrito = carritoRepository
                .findByUsuarioIdAndEstado(
                        usuario.getId(),
                        Carrito.EstadoCarrito.activo
                )
                .orElseGet(() -> crearCarrito(usuario));

        // 2. Validar que el producto existe y está activo
        Producto producto = productoRepository.findById(request.getProductoId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Producto no encontrado: " + request.getProductoId()));

        if (!producto.getActivo()) {
            throw new BadRequestException(
                    "El producto no está disponible: " + producto.getNombre());
        }

        // 3. Validar stock disponible
        if (producto.getStock() < request.getCantidad()) {
            throw new BadRequestException(
                    "Stock insuficiente. Disponible: " + producto.getStock());
        }

        // 4. Si el producto ya está en el carrito, actualizar cantidad
        Optional<ItemCarrito> itemExistente = itemCarritoRepository
                .findByCarritoIdAndProductoId(carrito.getId(), producto.getId());

        if (itemExistente.isPresent()) {
            ItemCarrito item = itemExistente.get();
            int nuevaCantidad = item.getCantidad() + request.getCantidad();

            if (producto.getStock() < nuevaCantidad) {
                throw new BadRequestException(
                        "Stock insuficiente. Disponible: " + producto.getStock());
            }

            item.setCantidad(nuevaCantidad);
            itemCarritoRepository.save(item);
        } else {
            // 5. Si no existe, crear nuevo item
            ItemCarrito nuevoItem = ItemCarrito.builder()
                    .carrito(carrito)
                    .producto(producto)
                    .cantidad(request.getCantidad())
                    .precioUnitario(producto.getPrecio())
                    .build();
            carrito.getItems().add(nuevoItem);
        }

        carritoRepository.save(carrito);

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
    // Obtener usuario autenticado
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