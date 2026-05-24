package com.ecomart.backend;

import com.ecomart.backend.service.AuthService;
import com.ecomart.backend.dto.request.LoginRequest;
import com.ecomart.backend.dto.request.RegisterRequest;
import com.ecomart.backend.dto.response.AuthResponse;
import com.ecomart.backend.exception.BadRequestException;
import com.ecomart.backend.model.Usuario;
import com.ecomart.backend.repository.UsuarioRepository;
import com.ecomart.backend.security.JwtUtil;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private UserDetailsService userDetailsService;

    @InjectMocks
    private AuthService authService;

    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;
    private Usuario usuario;

    @BeforeEach
    void setUp() {

        registerRequest = new RegisterRequest();
        registerRequest.setNombre("Juan");
        registerRequest.setApellido("Perez");
        registerRequest.setEmail("juan@test.com");
        registerRequest.setPassword("12345678");

        loginRequest = new LoginRequest();
        loginRequest.setEmail("juan@test.com");
        loginRequest.setPassword("12345678");

        usuario = Usuario.builder()
                .id(1L)
                .nombre("Juan")
                .apellido("Perez")
                .email("juan@test.com")
                .passwordHash("hash")
                .rol(Usuario.RolUsuario.cliente)
                .activo(true)
                .build();
    }

    @Test
    void register_deberiaRegistrarUsuarioCorrectamente() {

        when(usuarioRepository.existsByEmail(registerRequest.getEmail()))
                .thenReturn(false);

        when(passwordEncoder.encode(registerRequest.getPassword()))
                .thenReturn("hash");

        UserDetails userDetails = new User(
                "juan@test.com",
                "hash",
                Collections.emptyList()
        );

        when(userDetailsService.loadUserByUsername("juan@test.com"))
                .thenReturn(userDetails);

        when(jwtUtil.generateToken(userDetails))
                .thenReturn("jwt-token");

        AuthResponse response = authService.register(registerRequest);

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        assertEquals("Juan", response.getNombre());

        verify(usuarioRepository).save(any(Usuario.class));
    }

    @Test
    void register_deberiaLanzarExcepcionSiCorreoExiste() {

        when(usuarioRepository.existsByEmail(registerRequest.getEmail()))
                .thenReturn(true);

        assertThrows(
                BadRequestException.class,
                () -> authService.register(registerRequest)
        );

        verify(usuarioRepository, never()).save(any());
    }

    @Test
    void login_deberiaRetornarAuthResponseCorrectamente() {

        UserDetails userDetails = new User(
                "juan@test.com",
                "hash",
                Collections.emptyList()
        );

        when(usuarioRepository.findByEmail(loginRequest.getEmail()))
                .thenReturn(Optional.of(usuario));

        when(userDetailsService.loadUserByUsername(loginRequest.getEmail()))
                .thenReturn(userDetails);

        when(jwtUtil.generateToken(userDetails))
                .thenReturn("jwt-token");

        AuthResponse response = authService.login(loginRequest);

        verify(authenticationManager).authenticate(
                any(UsernamePasswordAuthenticationToken.class)
        );

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        assertEquals("Juan", response.getNombre());
    }
}