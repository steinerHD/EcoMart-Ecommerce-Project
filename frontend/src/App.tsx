import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProductosPage from "./pages/ProductosPage";
import CarritoPage from "./pages/CarritoPage";
import ConfirmacionPage from "./pages/ConfirmacionPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">

        <Navbar />

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Navigate to="/productos" replace />} />

            {/* Rutas públicas */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Rutas protegidas */}
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
        </main>

        <Footer />

      </div>
    </BrowserRouter>
  );
};

export default App;