import { formatCurrency } from "../../utils/formatCurrency";
import Button from "../common/Button";

interface CarritoResumenProps {
  total: number;
  cantidadItems: number;
  onCheckout: () => void;
  loadingCheckout: boolean;
}

const CarritoResumen = ({
  total,
  cantidadItems,
  onCheckout,
  loadingCheckout,
}: CarritoResumenProps) => {
  return (
    <div
      className="p-4"
      style={{
        backgroundColor: "var(--color-50)",
        borderRadius: "var(--radius-lg)",
        border: "1px solid rgba(114, 129, 86, 0.2)",
        position: "sticky",
        top: "80px",
      }}
    >
      <h5
        className="mb-4"
        style={{
          color: "var(--color-900)",
          fontFamily: "var(--font-display)",
          borderBottom: "1px solid rgba(114, 129, 86, 0.2)",
          paddingBottom: "0.75rem",
        }}
      >
        Resumen de compra
      </h5>

      {/* Cantidad de items */}
      <div className="d-flex justify-content-between mb-2">
        <span
          style={{
            color: "var(--color-800)",
            fontSize: "var(--text-sm)",
          }}
        >
          Productos
        </span>
        <span
          style={{
            color: "var(--color-900)",
            fontSize: "var(--text-sm)",
            fontWeight: "var(--font-medium)",
          }}
        >
          {cantidadItems} {cantidadItems === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Total */}
      <div
        className="d-flex justify-content-between mb-4 pt-3"
        style={{
          borderTop: "1px solid rgba(114, 129, 86, 0.2)",
          marginTop: "0.5rem",
        }}
      >
        <span
          style={{
            color: "var(--color-900)",
            fontWeight: "var(--font-bold)",
            fontSize: "var(--text-md)",
          }}
        >
          Total
        </span>
        <span
          style={{
            color: "var(--color-900)",
            fontWeight: "var(--font-bold)",
            fontSize: "var(--text-md)",
          }}
        >
          {formatCurrency(total)}
        </span>
      </div>

      {/* Botón checkout */}
      <Button
        fullWidth
        size="lg"
        onClick={onCheckout}
        loading={loadingCheckout}
        disabled={cantidadItems === 0}
      >
        Confirmar compra
      </Button>

    </div>
  );
};

export default CarritoResumen;