import api from "./api";

export interface ItemCarritoResponse {
  id: number;
  productoId: number;
  nombreProducto: string;
  imagenUrl: string;
  precioUnitario: number;
  cantidad: number;
  subtotal: number;
}

export interface CarritoResponse {
  id: number;
  items: ItemCarritoResponse[];
  total: number;
  cantidadItems: number;
}

export const carritoService = {
  obtenerCarrito: async (): Promise<CarritoResponse> => {
    const response = await api.get<CarritoResponse>("/carrito");
    return response.data;
  },
};