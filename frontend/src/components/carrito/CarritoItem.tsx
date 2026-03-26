import { useState, useEffect, useRef } from "react";
import { type ItemCarritoResponse } from "../../services/carritoService";
import { formatCurrency } from "../../utils/formatCurrency";
import Button from "../common/Button";

interface CarritoItemProps {
  item: ItemCarritoResponse;
  onEliminar: (id: number) => Promise<void>;
  onActualizar: (id: number, cantidad: number) => Promise<void>;
}

const CarritoItem = ({ item, onEliminar, onActualizar }: CarritoItemProps) => {
  const [cantidad, setCantidad] = useState(item.cantidad);
  const [actualizando, setActualizando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setCantidad(item.cantidad);
  }, [item.cantidad]);

  const handleCantidad = (nuevaCantidad: number) => {
    if (nuevaCantidad < 1) return;

    setCantidad(nuevaCantidad);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      setActualizando(true);
      try {
        await onActualizar(item.id, nuevaCantidad);
      } finally {
        setActualizando(false);
      }
    }, 800);
  };

  const handleEliminar = async () => {
    setEliminando(true);
    try {
      await onEliminar(item.id);
    } finally {
      setEliminando(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-between p-3 mb-3"
      style={{
        backgroundColor: "var(--color-50)",
        borderRadius: "var(--radius-md)",
        border: "1px solid rgba(114, 129, 86, 0.2)",
        opacity: actualizando || eliminando ? 0.7 : 1,
        transition: "opacity 0.2s ease",
      }}
    >

      {/* Info del producto */}
      <div className="d-flex flex-column gap-1" style={{ flex: 1 }}>
        <span
          style={{
            fontWeight: "var(--font-semibold)",
            color: "var(--color-900)",
            fontSize: "var(--text-base)",
            fontFamily: "var(--font-display)",
          }}
        >
          {item.nombreProducto}
        </span>
        <span
          style={{
            color: "var(--color-800)",
            fontSize: "var(--text-sm)",
          }}
        >
          {formatCurrency(item.precioUnitario)} por unidad
        </span>
      </div>

      {/* Control de cantidad */}
      <div className="d-flex align-items-center gap-2 mx-3">
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => handleCantidad(cantidad - 1)}
          disabled={cantidad <= 1 || actualizando || eliminando}
        >
          −
        </button>

        <span
          style={{
            minWidth: "2rem",
            textAlign: "center",
            fontWeight: "var(--font-bold)",
            color: "var(--color-900)",
            fontSize: "var(--text-base)",
          }}
        >
          {actualizando ? (
            <span
              className="spinner-border spinner-border-sm"
              style={{ color: "var(--color-800)" }}
            />
          ) : (
            cantidad
          )}
        </span>

        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => handleCantidad(cantidad + 1)}
          disabled={actualizando || eliminando}
        >
          +
        </button>
      </div>

      {/* Subtotal */}
      <div
        className="mx-3"
        style={{
          minWidth: "120px",
          textAlign: "right",
          fontWeight: "var(--font-bold)",
          color: "var(--color-900)",
          fontSize: "var(--text-md)",
        }}
      >
        {formatCurrency(item.precioUnitario * cantidad)}
      </div>

      {/* Eliminar */}
      <Button
        variant="outline"
        size="sm"
        loading={eliminando}
        disabled={actualizando}
        onClick={handleEliminar}
      >
        Eliminar
      </Button>

    </div>
  );
};

export default CarritoItem;