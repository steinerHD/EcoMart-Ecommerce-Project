package com.ecomart.backend.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AuthResponse {

    private String token;
    private String nombre;
    private String apellido;
    private String email;
    private String rol;
}