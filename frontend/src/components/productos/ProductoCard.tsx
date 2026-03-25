import { useState } from "react";
import { type ProductoResponse } from "../../services/productoService";
import { formatCurrency } from "../../utils/formatCurrency";
import Button from "../common/Button";

interface ProductoCardProps {
  producto: ProductoResponse;
  onAgregar: (productoId: number, cantidad: number) => Promise<void>;
}

const ProductoCard = ({ producto, onAgregar }: ProductoCardProps) => {
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(false);
  const [agregado, setAgregado] = useState(false);

  const handleAgregar = async () => {
    setLoading(true);
    try {
      await onAgregar(producto.id, cantidad);
      setAgregado(true);
      setCantidad(1);
      setTimeout(() => setAgregado(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="card h-100 shadow-sm"
      style={{ transition: "transform 0.2s ease" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.transform = "translateY(-4px)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = "translateY(0)")
      }
    >
      {/* Imagen */}
      <div
        style={{
          height: "180px",
          backgroundColor: "var(--color-300)",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {producto.imagenUrl ? (
          <img
            src={producto.imagenUrl}
            alt={producto.nombre}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ fontSize: "3rem" }}>📦</span>
        )}
      </div>

      {/* Body */}
      <div className="card-body d-flex flex-column gap-2">

        {/* Categoria */}
        {producto.categoriaNombre && (
          <span
            className="badge bg-primary"
            style={{ alignSelf: "flex-start" }}
          >
            {producto.categoriaNombre}
          </span>
        )}

        {/* Nombre */}
        <h5
          className="mb-0"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-900)",
          }}
        >
          {producto.nombre}
        </h5>

        {/* Descripcion */}
        {producto.descripcion && (
          <p
            className="mb-0"
            style={{
              fontSize: "var(--text-sm)",
              color: "var(--color-800)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {producto.descripcion}
          </p>
        )}

        {/* Precio */}
        <p
          className="mb-0"
          style={{
            fontSize: "var(--text-lg)",
            fontWeight: "var(--font-bold)",
            color: "var(--color-900)",
          }}
        >
          {formatCurrency(producto.precio)}
        </p>

        {/* Stock */}
        <small style={{ color: "var(--color-800)" }}>
          {producto.stock > 0
            ? `${producto.stock} disponibles`
            : "Sin stock"}
        </small>

        {/* Selector cantidad y botón */}
        <div className="d-flex align-items-center gap-2 mt-auto pt-2">

          {/* Control cantidad */}
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
              disabled={cantidad <= 1}
            >
              −
            </button>
            <span
              style={{
                minWidth: "1.5rem",
                textAlign: "center",
                fontWeight: "var(--font-semibold)",
                color: "var(--color-900)",
              }}
            >
              {cantidad}
            </span>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() =>
                setCantidad((prev) => Math.min(producto.stock, prev + 1))
              }
              disabled={cantidad >= producto.stock}
            >
              +
            </button>
          </div>

          {/* Botón agregar */}
          <Button
            size="sm"
            fullWidth
            loading={loading}
            disabled={producto.stock === 0}
            onClick={handleAgregar}
          >
            {agregado ? "Agregado ✓" : "Agregar"}
          </Button>

        </div>
      </div>
    </div>
  );
};

export default ProductoCard;