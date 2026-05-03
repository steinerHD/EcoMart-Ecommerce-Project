import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const CarritoVacio = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center py-5">
      <div
        style={{
          backgroundColor: "#f5f7f4",
          padding: "2.5rem",
          borderRadius: "16px",
          textAlign: "center",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ fontSize: "4rem", marginBottom: "1rem" }}>🛒</p>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-900)",
            marginBottom: "0.5rem",
          }}
        >
          Tu carrito está vacío
        </h3>
        <p
          className="mb-4"
          style={{
            color: "var(--color-800)",
            fontSize: "var(--text-sm)",
          }}
        >
          Agrega productos para comenzar tu compra
        </p>
        <Button onClick={() => navigate("/productos")}>
          Ver productos
        </Button>
      </div>
    </div>
  );
};

export default CarritoVacio;