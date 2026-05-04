import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCarrito } from "../hooks/useCarrito";
import CarritoItem from "../components/carrito/CarritoItem";
import CarritoResumen from "../components/carrito/CarritoResumen";
import CarritoVacio from "../components/carrito/CarritoVacio";
import ModalConfirmacion from "../components/common/ModalConfirmacion";
import { carritoService } from "../services/carritoService";

const CarritoPage = () => {
  const { carrito, loading, recargarCarrito } = useCarrito();
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleActualizar = async (id: number, cantidad: number) => {
    try {
      await carritoService.actualizarItem(id, { cantidad });
      await recargarCarrito();
    } catch (error: any) {
      console.error("Error al actualizar item:", error);
    }
  };

  const handleEliminar = async (id: number) => {
    try {
      await carritoService.eliminarItem(id);
      await recargarCarrito();
    } catch (error: any) {
      console.error("Error al eliminar item:", error);
    }
  };

  const handleCheckout = () => setShowModal(true);

  const handleConfirmarCheckout = async () => {
    setLoadingCheckout(true);
    try {
      const pedido = await carritoService.checkout();
      await recargarCarrito();
      setShowModal(false);
      navigate("/confirmacion", { state: { pedido } });
    } catch (error: any) {
      console.error("Error al confirmar compra:", error);
    } finally {
      setLoadingCheckout(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-carrito">
        <div className="container py-5 text-center">
          <div className="spinner-border" role="status" style={{ color: "var(--color-800)" }}>
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3" style={{ color: "var(--color-300)" }}>Cargando carrito...</p>
        </div>
      </div>
    );
  }

  if (!carrito || carrito.items.length === 0) {
    return (
      <div className="bg-carrito">
        <div className="container py-5">
          <CarritoVacio />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-carrito">
        <div className="container py-5">

          <div className="mb-4">
            <h2 style={{ fontFamily: "var(--font-display)" }}>Mi carrito</h2>
            <p style={{ color: "var(--color-300)" }}>
              {carrito.cantidadItems}{" "}
              {carrito.cantidadItems === 1 ? "producto" : "productos"} en tu carrito
            </p>
          </div>

          <div className="row g-4">
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
            <div className="col-lg-4">
              <CarritoResumen
                total={carrito.total}
                cantidadItems={carrito.cantidadItems}
                onCheckout={handleCheckout}
                loadingCheckout={loadingCheckout}
              />
            </div>
          </div>

        </div>
      </div>

      <ModalConfirmacion
        show={showModal}
        titulo="Confirmar compra"
        mensaje={`¿Estás seguro que deseas confirmar tu compra por un total de $${carrito.total.toLocaleString("es-CO")}?`}
        labelConfirmar="Sí, confirmar"
        labelCancelar="Cancelar"
        loading={loadingCheckout}
        onConfirmar={handleConfirmarCheckout}
        onCancelar={() => setShowModal(false)}
      />
    </>
  );
};

export default CarritoPage;