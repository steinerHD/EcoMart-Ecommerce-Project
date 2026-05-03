package com.ecomart.backend.service;

import com.ecomart.backend.dto.response.ProductoResponse;
import com.ecomart.backend.mapper.ProductoMapper;
import com.ecomart.backend.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoService {

    private final ProductoRepository productoRepository;

    public List<ProductoResponse> listarProductos() {
        return productoRepository.findByActivoTrue()
                .stream()
                .map(ProductoMapper::toProductoResponse)
                .toList();
    }
}