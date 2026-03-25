package com.ecomart.backend.controller;

import com.ecomart.backend.dto.response.ProductoResponse;
import com.ecomart.backend.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;

    @GetMapping
    public ResponseEntity<List<ProductoResponse>> listarProductos() {
        return ResponseEntity.ok(productoService.listarProductos());
    }
}