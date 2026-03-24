import { createContext, useState, type ReactNode } from "react";

interface ItemCarrito {
  id: number;
  productoId: number;
  nombre: string;
  precio: number;
  cantidad: number;
  subtotal: number;
}

interface CarritoContextType {
  items: ItemCarrito[];
  total: number;
  setItems: (items: ItemCarrito[]) => void;
  cantidadTotal: number;
}

export const CarritoContext = createContext<CarritoContextType>(
  {} as CarritoContextType
);

export const CarritoProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  const total = items.reduce((acc, item) => acc + item.subtotal, 0);
  const cantidadTotal = items.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CarritoContext.Provider value={{ items, total, setItems, cantidadTotal }}>
      {children}
    </CarritoContext.Provider>
  );
};