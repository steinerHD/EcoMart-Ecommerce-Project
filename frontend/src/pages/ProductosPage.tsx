import { useAuth } from "../hooks/useAuth";

const ProductosPage = () => {
  const { user } = useAuth();

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h2>Productos</h2>
        <p>Bienvenido, {user?.nombre} {user?.apellido}</p>
      </div>

      <div className="alert alert-info">
        Próximamente: listado de productos — HU-04
      </div>
    </div>
  );
};

export default ProductosPage;