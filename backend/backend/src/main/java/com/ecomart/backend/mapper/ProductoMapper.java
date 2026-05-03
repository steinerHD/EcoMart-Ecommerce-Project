package com.ecomart.backend.mapper;

import com.ecomart.backend.dto.response.ProductoResponse;
import com.ecomart.backend.model.Producto;

public class ProductoMapper {

    public static ProductoResponse toProductoResponse(Producto producto) {
        return ProductoResponse.builder()
                .id(producto.getId())
                .nombre(producto.getNombre())
                .descripcion(producto.getDescripcion())
                .precio(producto.getPrecio())
                .stock(producto.getStock())
                .imagenUrl(producto.getImagenUrl())
                .categoriaNombre(
                    producto.getCategoria() != null
                        ? producto.getCategoria().getNombre()
                        : null
                )
                .activo(producto.getActivo())
                .build();
    }

    private ProductoMapper() {}
}