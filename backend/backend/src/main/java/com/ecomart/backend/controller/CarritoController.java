package com.ecomart.backend.controller;

import com.ecomart.backend.dto.request.ActualizarItemRequest;
import com.ecomart.backend.dto.request.AgregarItemRequest;
import com.ecomart.backend.dto.response.CarritoResponse;
import com.ecomart.backend.service.CarritoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrito")
@RequiredArgsConstructor
public class CarritoController {

    private final CarritoService carritoService;

    @GetMapping
    public ResponseEntity<CarritoResponse> obtenerCarrito() {
        return ResponseEntity.ok(carritoService.obtenerOCrearCarrito());
    }

    @PostMapping("/items")
    public ResponseEntity<CarritoResponse> agregarItem(
            @Valid @RequestBody AgregarItemRequest request) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(carritoService.agregarItem(request));
    }

    @PutMapping("/items/{id}")
    public ResponseEntity<CarritoResponse> actualizarItem(
            @PathVariable Long id,
            @Valid @RequestBody ActualizarItemRequest request) {
        return ResponseEntity.ok(carritoService.actualizarItem(id, request));
    }

    @DeleteMapping("/items/{id}")
    public ResponseEntity<CarritoResponse> eliminarItem(
            @PathVariable Long id) {
        return ResponseEntity.ok(carritoService.eliminarItem(id));
    }
}