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

export interface AgregarItemRequest {
  productoId: number;
  cantidad: number;
}

export interface ActualizarItemRequest {
  cantidad: number;
}

export const carritoService = {
  obtenerCarrito: async (): Promise<CarritoResponse> => {
    const response = await api.get<CarritoResponse>("/carrito");
    return response.data;
  },

  agregarItem: async (data: AgregarItemRequest): Promise<CarritoResponse> => {
    const response = await api.post<CarritoResponse>("/carrito/items", data);
    return response.data;
  },

  actualizarItem: async (
    id: number,
    data: ActualizarItemRequest
  ): Promise<CarritoResponse> => {
    const response = await api.put<CarritoResponse>(
      `/carrito/items/${id}`,
      data
    );
    return response.data;
  },
};