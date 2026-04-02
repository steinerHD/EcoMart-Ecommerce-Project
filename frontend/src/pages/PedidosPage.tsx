import { useState, useEffect } from "react";
import { pedidoService } from "../services/pedidoService";
import { type PedidoResponse } from "../services/carritoService";
import { formatCurrency } from "../utils/formatCurrency";

const PedidosPage = () => {
  const [pedidos, setPedidos] = useState<PedidoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pedidoAbierto, setPedidoAbierto] = useState<number | null>(null);

  useEffect(() => {
    const cargarPedidos = async () => {
      setLoading(true);
      try {
        const data = await pedidoService.listarPedidos();
        setPedidos(data);
      } catch {
        setError("Error al cargar el historial de pedidos");
      } finally {
        setLoading(false);
      }
    };

    cargarPedidos();
  }, []);

  const togglePedido = (id: number) => {
    setPedidoAbierto((prev) => (prev === id ? null : id));
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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
          Cargando pedidos...
        </p>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // Error
  // ─────────────────────────────────────────

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // Sin pedidos
  // ─────────────────────────────────────────

  if (pedidos.length === 0) {
    return (
      <div className="container py-5 text-center">
        <p style={{ fontSize: "3rem" }}>📦</p>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-900)",
          }}
        >
          Aún no tienes pedidos
        </h3>
        <p style={{ color: "var(--color-800)", fontSize: "var(--text-sm)" }}>
          Realiza tu primera compra para verla aquí
        </p>
      </div>
    );
  }

  // ─────────────────────────────────────────
  // Lista de pedidos
  // ─────────────────────────────────────────

  return (
    <div className="container py-5">

      {/* Título */}
      <div className="mb-4">
        <h2 style={{ fontFamily: "var(--font-display)" }}>
          Mis pedidos
        </h2>
        <p style={{ color: "var(--color-300)" }}>
          {pedidos.length}{" "}
          {pedidos.length === 1 ? "pedido realizado" : "pedidos realizados"}
        </p>
      </div>

      {/* Lista */}
      {pedidos.map((pedido) => (
        <div
          key={pedido.id}
          className="mb-3"
          style={{
            backgroundColor: "var(--color-50)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid rgba(114, 129, 86, 0.2)",
            overflow: "hidden",
          }}
        >

          {/* Header del pedido — clickeable */}
          <div
            className="d-flex align-items-center justify-content-between p-3"
            onClick={() => togglePedido(pedido.id)}
            style={{ cursor: "pointer" }}
          >
            <div className="d-flex flex-column gap-1">
              <span
                style={{
                  fontWeight: "var(--font-semibold)",
                  color: "var(--color-900)",
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-base)",
                }}
              >
                Pedido #{pedido.id}
              </span>
              <small style={{ color: "var(--color-800)" }}>
                {formatFecha(pedido.createdAt)}
              </small>
            </div>

            <div className="d-flex align-items-center gap-3">
              {/* Estado */}
              <span
                className="badge bg-primary"
                style={{ fontSize: "var(--text-xs)" }}
              >
                {pedido.estado}
              </span>

              {/* Total */}
              <span
                style={{
                  fontWeight: "var(--font-bold)",
                  color: "var(--color-900)",
                  fontSize: "var(--text-md)",
                }}
              >
                {formatCurrency(pedido.total)}
              </span>

              {/* Chevron */}
              <span
                style={{
                  color: "var(--color-800)",
                  fontSize: "var(--text-lg)",
                  transition: "transform 0.2s ease",
                  transform:
                    pedidoAbierto === pedido.id
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  display: "inline-block",
                }}
              >
                ▾
              </span>
            </div>
          </div>

          {/* Detalle del pedido — expandible */}
          {pedidoAbierto === pedido.id && (
            <div
              className="px-3 pb-3"
              style={{
                borderTop: "1px solid rgba(114, 129, 86, 0.2)",
                paddingTop: "1rem",
              }}
            >
              {pedido.items.map((item) => (
                <div
                  key={item.id}
                  className="d-flex justify-content-between align-items-center mb-2"
                >
                  <div>
                    <span
                      style={{
                        color: "var(--color-900)",
                        fontWeight: "var(--font-medium)",
                        fontSize: "var(--text-sm)",
                      }}
                    >
                      {item.nombreProducto}
                    </span>
                    <small
                      className="d-block"
                      style={{ color: "var(--color-800)" }}
                    >
                      {item.cantidad} x {formatCurrency(item.precioUnitario)}
                    </small>
                  </div>
                  <span
                    style={{
                      color: "var(--color-900)",
                      fontWeight: "var(--font-semibold)",
                      fontSize: "var(--text-sm)",
                    }}
                  >
                    {formatCurrency(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>
          )}

        </div>
      ))}
    </div>
  );
};

export default PedidosPage;