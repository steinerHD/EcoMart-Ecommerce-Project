import api from "./api";
import { type PedidoResponse } from "./carritoService";

export const pedidoService = {
  listarPedidos: async (): Promise<PedidoResponse[]> => {
    const response = await api.get<PedidoResponse[]>("/pedidos");
    return response.data;
  },
};