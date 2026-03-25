package com.ecomart.backend.mapper;

import com.ecomart.backend.dto.response.CarritoResponse;
import com.ecomart.backend.model.Carrito;
import com.ecomart.backend.model.ItemCarrito;

import java.math.BigDecimal;
import java.util.List;

public class CarritoMapper {

    public static CarritoResponse toCarritoResponse(Carrito carrito) {

        List<CarritoResponse.ItemCarritoResponse> items = carrito.getItems()
                .stream()
                .map(CarritoMapper::toItemResponse)
                .toList();

        BigDecimal total = items.stream()
                .map(CarritoResponse.ItemCarritoResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int cantidadItems = carrito.getItems()
                .stream()
                .mapToInt(ItemCarrito::getCantidad)
                .sum();

        return CarritoResponse.builder()
                .id(carrito.getId())
                .items(items)
                .total(total)
                .cantidadItems(cantidadItems)
                .build();
    }

    private static CarritoResponse.ItemCarritoResponse toItemResponse(
            ItemCarrito item) {

        BigDecimal subtotal = item.getPrecioUnitario()
                .multiply(BigDecimal.valueOf(item.getCantidad()));

        return CarritoResponse.ItemCarritoResponse.builder()
                .id(item.getId())
                .productoId(item.getProducto().getId())
                .nombreProducto(item.getProducto().getNombre())
                .imagenUrl(item.getProducto().getImagenUrl())
                .precioUnitario(item.getPrecioUnitario())
                .cantidad(item.getCantidad())
                .subtotal(subtotal)
                .build();
    }

    private CarritoMapper() {}
}