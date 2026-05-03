import { type ProductoResponse } from "../../services/productoService";
import ProductoCard from "./ProductoCard";

interface ProductoListProps {
  productos: ProductoResponse[];
  onAgregar: (productoId: number, cantidad: number) => Promise<void>;
}

const ProductoList = ({ productos, onAgregar }: ProductoListProps) => {
  if (productos.length === 0) {
    return (
      <div className="text-center py-5">
        <p style={{ fontSize: "3rem" }}>📦</p>
        <h5 style={{ color: "var(--color-900)" }}>
          No hay productos disponibles
        </h5>
      </div>
    );
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
      {productos.map((producto) => (
        <div className="col" key={producto.id}>
          <ProductoCard producto={producto} onAgregar={onAgregar} />
        </div>
      ))}
    </div>
  );
};

export default ProductoList;