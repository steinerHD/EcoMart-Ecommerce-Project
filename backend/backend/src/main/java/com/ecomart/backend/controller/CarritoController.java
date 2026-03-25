package com.ecomart.backend.controller;

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
}