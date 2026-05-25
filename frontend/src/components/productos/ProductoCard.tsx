import { useState } from "react";
import { type ProductoResponse } from "../../services/productoService";
import { formatCurrency } from "../../utils/formatCurrency";
import Button from "../common/Button";

interface ProductoCardProps {
  producto: ProductoResponse;
  onAgregar: (productoId: number, cantidad: number) => Promise<void>;
}

const imagenPorNombre: Record<string, string> = {
  "Tote Bag Reciclada": "/imagenes/tote_bag.jpg",
  "Botella Reutilizable": "/imagenes/botella.jpg",
  "Cuaderno Kraft": "/imagenes/cuaderno.jpg",
  "Camiseta Eco": "/imagenes/camiseta.jpg",
  "Jabón Natural": "/imagenes/ja.jpg",
  "Jabón Artesanal": "/imagenes/ja.jpg",
  "Set de Cubiertos Reutilizables": "/imagenes/Set de Cubiertos Reutilizables.jpg",
  "Mochila Ecológica": "/imagenes/Mochila Ecológica.jpg",
  "Cepillo Dental de Bambú": "/imagenes/Cepillo Dental de Bambú.png",
  "Vela Aromática Natural": "/imagenes/Vela Aromática Natural.jpg",
  "Almohada de Algodón Orgánico": "/imagenes/Almohada de Algodón Orgánico.jpg",
};

const ProductoCard = ({ producto, onAgregar }: ProductoCardProps) => {
  const [cantidad, setCantidad] = useState(0);
  const [loading, setLoading] = useState(false);
  const [agregado, setAgregado] = useState(false);

  const handleAgregar = async () => {
    setLoading(true);
    try {
      await onAgregar(producto.id, 1);
      setCantidad(1);
      setAgregado(true);
      setTimeout(() => setAgregado(false), 1500);
    } finally {
      setLoading(false);
    }
  };

  const handleSumar = async () => {
    if (cantidad >= producto.stock) return;
    const nueva = cantidad + 1;
    setCantidad(nueva);
    await onAgregar(producto.id, 1);
  };

  const handleRestar = () => {
    const nueva = cantidad - 1;
    setCantidad(nueva);
    // Si quieres también restar en el backend, aquí llamarías al servicio
  };

  const imagenSrc = producto.imagenUrl || imagenPorNombre[producto.nombre];

  // Stock disponible restando lo que ya está en el contador local
  const stockRestante = producto.stock - cantidad;

  return (
    <div className="card h-100 shadow-sm">
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
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
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

        {/* Stock: muestra el restante en tiempo real */}
        <small style={{ color: stockRestante <= 5 ? "#b03a3a" : "var(--color-800)" }}>
          {stockRestante > 0 ? `${stockRestante} disponibles` : "Sin stock"}
        </small>

        {/* Botón o Contador */}
        <div className="mt-auto pt-2">
          {cantidad === 0 ? (
            /* ── Botón Agregar inicial ── */
            <div
              style={{ transition: "transform 0.2s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
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
          ) : (
            /* ── Contador − n + ── */
            <div
              className="d-flex align-items-center justify-content-between"
              style={{
                backgroundColor: "var(--color-900)",
                borderRadius: "var(--radius-md)",
                padding: "0.3rem 0.5rem",
              }}
            >
              <button
                style={{
                  color: "var(--color-white)",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  lineHeight: 1,
                  padding: "0 0.5rem",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
                onClick={handleRestar}
              >
                −
              </button>

              <span
                style={{
                  color: "var(--color-white)",
                  fontWeight: "var(--font-bold)",
                  fontSize: "var(--text-sm)",
                  minWidth: "1.5rem",
                  textAlign: "center",
                }}
              >
                {cantidad}
              </span>

              <button
                style={{
                  color: cantidad >= producto.stock ? "rgba(255,255,255,0.35)" : "var(--color-white)",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  lineHeight: 1,
                  padding: "0 0.5rem",
                  background: "none",
                  border: "none",
                  cursor: cantidad >= producto.stock ? "not-allowed" : "pointer",
                }}
                onClick={handleSumar}
                disabled={cantidad >= producto.stock}
              >
                +
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductoCard;