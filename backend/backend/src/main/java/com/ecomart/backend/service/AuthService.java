package com.ecomart.backend.service;

import com.ecomart.backend.dto.request.LoginRequest;
import com.ecomart.backend.dto.request.RegisterRequest;
import com.ecomart.backend.dto.response.AuthResponse;
import com.ecomart.backend.exception.BadRequestException;
import com.ecomart.backend.mapper.UsuarioMapper;
import com.ecomart.backend.model.Usuario;
import com.ecomart.backend.repository.UsuarioRepository;
import com.ecomart.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;

    // ─────────────────────────────────────────
    // Registro
    // ─────────────────────────────────────────

    public AuthResponse register(RegisterRequest request) {

        // 1. Validar que el correo no esté registrado
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException(
                    "El correo ya se encuentra registrado: " + request.getEmail()
            );
        }

        // 2. Hashear la contraseña
        String passwordHash = passwordEncoder.encode(request.getPassword());

        // 3. Construir y guardar el usuario con el mapper
        Usuario usuario = UsuarioMapper.toEntity(request, passwordHash);
        usuarioRepository.save(usuario);

        // 4. Generar el token JWT
        UserDetails userDetails = userDetailsService.loadUserByUsername(usuario.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        // 5. Retornar la respuesta con el token
        return UsuarioMapper.toAuthResponse(usuario, token);
    }

    // ─────────────────────────────────────────
    // Login
    // ─────────────────────────────────────────

    public AuthResponse login(LoginRequest request) {

        // 1. Autenticar — lanza BadCredentialsException si falla
        //    el GlobalExceptionHandler se encarga de retornar 401
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        // 2. Cargar el usuario desde la BD
        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow();

        // 3. Generar el token JWT
        UserDetails userDetails = userDetailsService.loadUserByUsername(usuario.getEmail());
        String token = jwtUtil.generateToken(userDetails);

        // 4. Retornar la respuesta con el token
        return UsuarioMapper.toAuthResponse(usuario, token);
    }
}