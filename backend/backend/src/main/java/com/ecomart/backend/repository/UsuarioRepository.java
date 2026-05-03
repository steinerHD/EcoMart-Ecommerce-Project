package com.ecomart.backend.repository;

import com.ecomart.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    // Para el login y validar correo duplicado en registro
    Optional<Usuario> findByEmail(String email);

    // Para validar si el correo ya está registrado
    boolean existsByEmail(String email);
}