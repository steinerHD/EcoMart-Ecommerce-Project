import { useState, useEffect } from "react";
import { productoService, type ProductoResponse } from "../services/productoService";
import { carritoService } from "../services/carritoService";
import { useCarrito } from "../hooks/useCarrito";
import ProductoList from "../components/productos/ProductoList";

const ProductosPage = () => {
  const { recargarCarrito } = useCarrito();

  const [productos, setProductos] = useState<ProductoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ─────────────────────────────────────────
  // Cargar productos
  // ─────────────────────────────────────────

  useEffect(() => {
    const cargarProductos = async () => {
      setLoading(true);
      try {
        const data = await productoService.listarProductos();
        setProductos(data);
      } catch {
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    cargarProductos();
  }, []);

  // ─────────────────────────────────────────
  // Agregar al carrito
  // ─────────────────────────────────────────

  const handleAgregar = async (productoId: number, cantidad: number) => {
    await carritoService.agregarItem({ productoId, cantidad });
    await recargarCarrito();
  };

  // ─────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────

  return (
    <div className="container py-5">

      {/* Título */}
      <div className="mb-4">
        <h2 style={{ fontFamily: "var(--font-display)" }}>
          Productos
        </h2>
        <p style={{ color: "var(--color-300)" }}>
          Selecciona los productos que deseas agregar a tu carrito
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-5">
          <div
            className="spinner-border"
            role="status"
            style={{ color: "var(--color-800)" }}
          >
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3" style={{ color: "var(--color-300)" }}>
            Cargando productos...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="alert alert-danger" role="alert">
          ⚠️ {error}
        </div>
      )}

      {/* Lista de productos */}
      {!loading && !error && (
        <ProductoList
          productos={productos}
          onAgregar={handleAgregar}
        />
      )}

    </div>
  );
};

export default ProductosPage;