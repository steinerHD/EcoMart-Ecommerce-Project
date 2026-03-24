import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProductosPage from "./pages/ProductosPage";
import CarritoPage from "./pages/CarritoPage";
import ConfirmacionPage from "./pages/ConfirmacionPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/productos" replace />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/productos" element={
          <ProtectedRoute>
            <ProductosPage />
          </ProtectedRoute>
        } />

        <Route path="/carrito" element={
          <ProtectedRoute>
            <CarritoPage />
          </ProtectedRoute>
        } />

        <Route path="/confirmacion" element={
          <ProtectedRoute>
            <ConfirmacionPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;