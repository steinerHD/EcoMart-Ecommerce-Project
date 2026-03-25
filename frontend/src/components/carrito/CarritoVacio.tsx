import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const CarritoVacio = () => {
  const navigate = useNavigate();

  return (
    <div className="text-center py-5">
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
        style={{ color: "var(--color-800)", fontSize: "var(--text-sm)" }}
      >
        Agrega productos para comenzar tu compra
      </p>
      <Button onClick={() => navigate("/productos")}>
        Ver productos
      </Button>
    </div>
  );
};

export default CarritoVacio;