import { useLocation, useNavigate } from "react-router-dom";
import { type PedidoResponse } from "../services/carritoService";
import { formatCurrency } from "../utils/formatCurrency";
import Button from "../components/common/Button";

const ConfirmacionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pedido = location.state?.pedido as PedidoResponse | undefined;

  // Si no hay pedido en el state redirige a productos
  if (!pedido) {
    return (
      <div className="container py-5 text-center">
        <h3 style={{ color: "var(--color-900)" }}>
          No hay información del pedido
        </h3>
        <Button onClick={() => navigate("/productos")} size="lg">
          Ver productos
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-7">

          {/* Header confirmacion */}
          <div
            className="text-center p-5 mb-4"
            style={{
              backgroundColor: "var(--color-50)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid rgba(114, 129, 86, 0.2)",
            }}
          >
            <p style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-900)",
                marginBottom: "0.5rem",
              }}
            >
              ¡Compra confirmada!
            </h2>
            <p style={{ color: "var(--color-800)" }}>
              Tu pedido #{pedido.id} ha sido procesado exitosamente
            </p>
          </div>

          {/* Detalle del pedido */}
          <div
            className="p-4 mb-4"
            style={{
              backgroundColor: "var(--color-50)",
              borderRadius: "var(--radius-lg)",
              border: "1px solid rgba(114, 129, 86, 0.2)",
            }}
          >
            <h5
              className="mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-900)",
                borderBottom: "1px solid rgba(114, 129, 86, 0.2)",
                paddingBottom: "0.75rem",
              }}
            >
              Detalle del pedido
            </h5>

            {/* Items */}
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

            {/* Total */}
            <div
              className="d-flex justify-content-between mt-3 pt-3"
              style={{ borderTop: "1px solid rgba(114, 129, 86, 0.2)" }}
            >
              <span
                style={{
                  color: "var(--color-900)",
                  fontWeight: "var(--font-bold)",
                  fontSize: "var(--text-md)",
                }}
              >
                Total pagado
              </span>
              <span
                style={{
                  color: "var(--color-900)",
                  fontWeight: "var(--font-bold)",
                  fontSize: "var(--text-md)",
                }}
              >
                {formatCurrency(pedido.total)}
              </span>
            </div>
          </div>

          {/* Botón volver */}
          <div className="text-center">
            <Button
              size="lg"
              onClick={() => navigate("/productos")}
            >
              Seguir comprando
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ConfirmacionPage;