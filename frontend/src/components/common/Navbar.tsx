import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCarrito } from "../../hooks/useCarrito";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cantidadTotal } = useCarrito();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top"
      style={{
        backgroundColor: "var(--color-800)",
        boxShadow: "0 8px 24px rgba( 0,0,0,0.12 )",
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

                {/* Dropdown usuario */}
                <li
                  className="nav-item"
                  style={{ position: "relative" }}
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  {/* Nombre del usuario */}
                  <span
                    className="nav-link d-flex align-items-center gap-1"
                    style={{
                      color: "var(--color-50)",
                      cursor: "pointer",
                      userSelect: "none",
                    }}
                  >
                    {user?.nombre} {user?.apellido}
                    <span
                      style={{
                        fontSize: "var(--text-xs)",
                        transition: "transform 0.2s ease",
                        display: "inline-block",
                        transform: showDropdown
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                    >
                      ▾
                    </span>
                  </span>

                  {/* Dropdown */}
                  {showDropdown && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        right: 0,
                        minWidth: "180px",
                        backgroundColor: "var(--color-50)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid rgba(114, 129, 86, 0.2)",
                        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                        zIndex: 1000,
                        overflow: "hidden",
                      }}
                    >
                      {/* Mis pedidos */}
                      <Link
                        to="/pedidos"
                        style={{
                          display: "block",
                          padding: "0.75rem 1rem",
                          color: "var(--color-900)",
                          fontSize: "var(--text-sm)",
                          fontWeight: "var(--font-medium)",
                          transition: "background-color 0.2s ease",
                          borderBottom: "1px solid rgba(114, 129, 86, 0.15)",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "var(--color-100)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "transparent")
                        }
                      >
                        Mis pedidos
                      </Link>

                      {/* Cerrar sesión */}
                      <button
                        onClick={handleLogout}
                        style={{
                          display: "block",
                          width: "100%",
                          padding: "0.75rem 1rem",
                          color: "var(--color-900)",
                          fontSize: "var(--text-sm)",
                          fontWeight: "var(--font-medium)",
                          textAlign: "left",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          transition: "background-color 0.2s ease",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "var(--color-100)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = "transparent")
                        }
                      >
                        Cerrar sesión
                      </button>

                    </div>
                  )}
                </li>

              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-light px-4 fw-bold shadow-sm" to="/login">
                    Iniciar sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-light px-4 fw-bold shadow-sm" to="/register">
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