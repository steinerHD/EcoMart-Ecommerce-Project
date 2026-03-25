import { useCarrito } from "../hooks/useCarrito";
import CarritoItem from "../components/carrito/CarritoItem";
import CarritoResumen from "../components/carrito/CarritoResumen";
import CarritoVacio from "../components/carrito/CarritoVacio";
import { carritoService } from "../services/carritoService";

const CarritoPage = () => {
  const { carrito, loading, recargarCarrito } = useCarrito();

  // ─────────────────────────────────────────
  // Handlers — se implementan en HU-06 y HU-07
  // ─────────────────────────────────────────

  const handleEliminar = async (_id: number) => {};
  const handleActualizar = async (_id: number, _cantidad: number) => {};
  const handleCheckout = () => {};

  // ─────────────────────────────────────────
  // Loading
  // ─────────────────────────────────────────

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div
          className="spinner-border"
          role="status"
          style={{ color: "var(--color-800)" }}
        >
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3" style={{ color: "var(--color-300)" }}>
          Cargando carrito...
        </p>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // Carrito vacío
  // ─────────────────────────────────────────

  if (!carrito || carrito.items.length === 0) {
    return (
      <div className="container py-5">
        <CarritoVacio />
      </div>
    );
  }

  // ─────────────────────────────────────────
  // Carrito con items
  // ─────────────────────────────────────────

  return (
    <div className="container py-5">

      {/* Título */}
      <div className="mb-4">
        <h2 style={{ fontFamily: "var(--font-display)" }}>
          Mi carrito
        </h2>
        <p style={{ color: "var(--color-300)" }}>
          {carrito.cantidadItems}{" "}
          {carrito.cantidadItems === 1 ? "producto" : "productos"} en tu carrito
        </p>
      </div>

      <div className="row g-4">

        {/* Items */}
        <div className="col-lg-8">
          {carrito.items.map((item) => (
            <CarritoItem
              key={item.id}
              item={item}
              onEliminar={handleEliminar}
              onActualizar={handleActualizar}
            />
          ))}
        </div>

        {/* Resumen */}
        <div className="col-lg-4">
          <CarritoResumen
            total={carrito.total}
            cantidadItems={carrito.cantidadItems}
            onCheckout={handleCheckout}
            loadingCheckout={false}
          />
        </div>

      </div>
    </div>
  );
};

export default CarritoPage;