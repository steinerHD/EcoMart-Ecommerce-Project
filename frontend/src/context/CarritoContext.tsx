import { createContext, useState, useEffect, type ReactNode } from "react";
import { carritoService, type CarritoResponse } from "../services/carritoService";
import { useAuth } from "../hooks/useAuth";

interface CarritoContextType {
  carrito: CarritoResponse | null;
  loading: boolean;
  recargarCarrito: () => Promise<void>;
  cantidadTotal: number;
}

export const CarritoContext = createContext<CarritoContextType>(
  {} as CarritoContextType
);

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const [carrito, setCarrito] = useState<CarritoResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const recargarCarrito = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const data = await carritoService.obtenerCarrito();
      setCarrito(data);
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar carrito cuando el usuario se autentica
  // y limpiarlo cuando cierra sesión
  useEffect(() => {
    if (isAuthenticated) {
      recargarCarrito();
    } else {
      setCarrito(null);
    }
  }, [isAuthenticated]);

  const cantidadTotal = carrito?.cantidadItems ?? 0;

  return (
    <CarritoContext.Provider
      value={{ carrito, loading, recargarCarrito, cantidadTotal }}
    >
      {children}
    </CarritoContext.Provider>
  );
};