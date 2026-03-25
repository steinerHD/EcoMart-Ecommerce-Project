import { type ItemCarritoResponse } from "../../services/carritoService";
import { formatCurrency } from "../../utils/formatCurrency";
import Button from "../common/Button";

interface CarritoItemProps {
  item: ItemCarritoResponse;
  onEliminar: (id: number) => Promise<void>;
  onActualizar: (id: number, cantidad: number) => Promise<void>;
}

const CarritoItem = ({ item, onEliminar, onActualizar }: CarritoItemProps) => {
  return (
    <div
      className="d-flex align-items-center justify-content-between p-3 mb-3"
      style={{
        backgroundColor: "var(--color-50)",
        borderRadius: "var(--radius-md)",
        border: "1px solid rgba(114, 129, 86, 0.2)",
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
          onClick={() => onActualizar(item.id, item.cantidad - 1)}
          disabled={item.cantidad <= 1}
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
          {item.cantidad}
        </span>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => onActualizar(item.id, item.cantidad + 1)}
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
        {formatCurrency(item.subtotal)}
      </div>

      {/* Eliminar */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onEliminar(item.id)}
      >
        Eliminar
      </Button>

    </div>
  );
};

export default CarritoItem;