import api from "./api";

export interface ProductoResponse {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string;
  categoriaNombre: string;
  activo: boolean;
}

export const productoService = {
  listarProductos: async (): Promise<ProductoResponse[]> => {
    const response = await api.get<ProductoResponse[]>("/productos");
    return response.data;
  },
};