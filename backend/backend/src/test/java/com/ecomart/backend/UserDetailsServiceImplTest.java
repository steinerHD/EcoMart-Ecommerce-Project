package com.ecomart.backend;

import com.ecomart.backend.model.Usuario;
import com.ecomart.backend.repository.UsuarioRepository;
import com.ecomart.backend.security.UserDetailsServiceImpl;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserDetailsServiceImplTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @InjectMocks
    private UserDetailsServiceImpl service;

    @Test
    void loadUserByUsername_deberiaRetornarUsuario() {

        Usuario usuario = Usuario.builder()
                .email("test@test.com")
                .passwordHash("123")
                .rol(Usuario.RolUsuario.cliente)
                .activo(true)
                .build();

        when(usuarioRepository.findByEmail("test@test.com"))
                .thenReturn(Optional.of(usuario));

        UserDetails user =
                service.loadUserByUsername("test@test.com");

        assertEquals(
                "test@test.com",
                user.getUsername()
        );
    }

    @Test
    void loadUserByUsername_deberiaLanzarErrorSiNoExiste() {

        when(usuarioRepository.findByEmail("test@test.com"))
                .thenReturn(Optional.empty());

        assertThrows(
                UsernameNotFoundException.class,
                () -> service.loadUserByUsername("test@test.com")
        );
    }

    @Test
    void loadUserByUsername_deberiaLanzarErrorSiEstaDesactivado() {

        Usuario usuario = Usuario.builder()
                .email("test@test.com")
                .passwordHash("123")
                .rol(Usuario.RolUsuario.cliente)
                .activo(false)
                .build();

        when(usuarioRepository.findByEmail("test@test.com"))
                .thenReturn(Optional.of(usuario));

        assertThrows(
                UsernameNotFoundException.class,
                () -> service.loadUserByUsername("test@test.com")
        );
    }
}