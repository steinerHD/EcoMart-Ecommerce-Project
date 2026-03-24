import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCarrito } from "../../hooks/useCarrito";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cantidadTotal } = useCarrito();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        backgroundColor: "var(--color-800)",
        borderBottom: "2px solid var(--color-white)",
      }}
    >
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand" to="/productos">
          EcoMart
        </Link>

        {/* Toggler mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ borderColor: "var(--color-white)" }}
        >
          <span
            className="navbar-toggler-icon"
            style={{ filter: "invert(1)" }}
          />
        </button>

        {/* Links */}
        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-3">

            {isAuthenticated ? (
              <>
                {/* Productos */}
                <li className="nav-item">
                  <Link className="nav-link" to="/productos">
                    Productos
                  </Link>
                </li>

                {/* Carrito */}
                <li className="nav-item">
                  <Link
                    className="nav-link d-flex align-items-center gap-1"
                    to="/carrito"
                  >
                    Carrito
                    {cantidadTotal > 0 && (
                      <span className="badge bg-primary ms-1">
                        {cantidadTotal}
                      </span>
                    )}
                  </Link>
                </li>

                {/* Usuario */}
                <li className="nav-item">
                  <span
                    className="nav-link"
                    style={{
                      color: "var(--color-50)",
                      fontSize: "var(--text-sm)",
                    }}
                  >
                    {user?.nombre} {user?.apellido}
                  </span>
                </li>

                {/* Logout */}
                <li className="nav-item">
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-primary px-4" to="/login">
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary px-4" to="/register">
                    Registrarse
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;