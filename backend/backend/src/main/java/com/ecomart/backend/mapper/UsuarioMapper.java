package com.ecomart.backend.mapper;

import com.ecomart.backend.dto.request.RegisterRequest;
import com.ecomart.backend.dto.response.AuthResponse;
import com.ecomart.backend.model.Usuario;

public class UsuarioMapper {

    // Convierte RegisterRequest → Usuario (entidad)
    public static Usuario toEntity(RegisterRequest request, String passwordHash) {
        return Usuario.builder()
                .nombre(request.getNombre())
                .apellido(request.getApellido())
                .email(request.getEmail())
                .passwordHash(passwordHash)
                .rol(Usuario.RolUsuario.cliente)
                .activo(true)
                .build();
    }

    // Convierte Usuario + token → AuthResponse
    public static AuthResponse toAuthResponse(Usuario usuario, String token) {
        return AuthResponse.builder()
                .token(token)
                .nombre(usuario.getNombre())
                .apellido(usuario.getApellido())
                .email(usuario.getEmail())
                .rol(usuario.getRol().name())
                .build();
    }

    // Constructor privado para evitar instanciación
    // ya que todos los métodos son estáticos
    private UsuarioMapper() {}
}