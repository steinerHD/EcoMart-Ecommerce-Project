package com.ecomart.backend.service;

import com.ecomart.backend.dto.response.PedidoResponse;
import com.ecomart.backend.exception.ResourceNotFoundException;
import com.ecomart.backend.mapper.PedidoMapper;
import com.ecomart.backend.model.Usuario;
import com.ecomart.backend.repository.PedidoRepository;
import com.ecomart.backend.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final UsuarioRepository usuarioRepository;

    public List<PedidoResponse> listarPedidos() {
        Usuario usuario = obtenerUsuarioAutenticado();

        return pedidoRepository
                .findByUsuarioIdOrderByCreatedAtDesc(usuario.getId())
                .stream()
                .map(PedidoMapper::toPedidoResponse)
                .toList();
    }

    private Usuario obtenerUsuarioAutenticado() {
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();

        return usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Usuario no encontrado: " + email));
    }
}