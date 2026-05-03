import { useState } from "react";
import { type ProductoResponse } from "../../services/productoService";
import { formatCurrency } from "../../utils/formatCurrency";
import Button from "../common/Button";

interface ProductoCardProps {
  producto: ProductoResponse;
  onAgregar: (productoId: number, cantidad: number) => Promise<void>;
}

// Mapa de imágenes locales por nombre de producto
const imagenPorNombre: Record<string, string> = {
  "Tote Bag Reciclada": "/imagenes/tote_bag.jpg",
  "Botella Reutilizable": "/imagenes/botella.jpg",
  "Cuaderno Kraft": "/imagenes/cuaderno.jpg",
  "Camiseta Eco": "/imagenes/camiseta.jpg",
  "Jabón Natural": "/imagenes/ja.jpg",
  "Jabón Artesanal": "/imagenes/ja.jpg",
};

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

  const imagenSrc = producto.imagenUrl || imagenPorNombre[producto.nombre];

  return (
    <div
      className="card h-100 shadow-sm"
      style={{ transition: "transform 0.2s ease" }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {/* Imagen */}
      <div
        style={{
          height: "140px",
          backgroundColor: "var(--color-50)",
          borderRadius: "var(--radius-lg) var(--radius-lg) 0 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: "0.5rem",
        }}
      >
        {imagenSrc ? (
          <img
            src={imagenSrc}
            alt={producto.nombre}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <span style={{ fontSize: "3rem" }}>📦</span>
        )}
      </div>

      {/* Body */}
      <div className="card-body d-flex flex-column gap-2">

        {producto.categoriaNombre && (
          <span className="badge bg-primary" style={{ alignSelf: "flex-start" }}>
            {producto.categoriaNombre}
          </span>
        )}

        <h5
          className="mb-0"
          style={{ fontFamily: "var(--font-display)", color: "var(--color-900)" }}
        >
          {producto.nombre}
        </h5>

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

        <small style={{ color: "var(--color-800)" }}>
          {producto.stock > 0 ? `${producto.stock} disponibles` : "Sin stock"}
        </small>

        <div className="d-flex align-items-center gap-2 mt-auto pt-2">
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
              onClick={() => setCantidad((prev) => Math.min(producto.stock, prev + 1))}
              disabled={cantidad >= producto.stock}
            >
              +
            </button>
          </div>

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