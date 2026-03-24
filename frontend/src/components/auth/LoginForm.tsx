import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [errorGeneral, setErrorGeneral] = useState("");
    const [loading, setLoading] = useState(false);

    // ─────────────────────────────────────────
    // Manejo de cambios
    // ─────────────────────────────────────────

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setErrorGeneral("");
    };

    // ─────────────────────────────────────────
    // Validación
    // ─────────────────────────────────────────

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.email.trim()) {
            newErrors.email = "El correo es obligatorio";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "El correo no tiene un formato válido";
        }

        if (!formData.password) {
            newErrors.password = "La contraseña es obligatoria";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ─────────────────────────────────────────
    // Envío del formulario
    // ─────────────────────────────────────────

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const response = await authService.login(formData);

            login(response.token, {
                id: 0,
                nombre: response.nombre,
                apellido: response.apellido,
                email: response.email,
            });

            navigate("/productos");
        } catch (error: any) {
            const mensaje =
                error.response?.data?.mensaje || "Correo o contraseña incorrectos";
            setErrorGeneral(mensaje);
        } finally {
            setLoading(false);
        }
    };

    // ─────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center px-3"
            style={{
                background:
                    "linear-gradient(160deg, #728156 0%, #88976C 60%, #728156 100%)",
            }}
        >
            <div className="card shadow-lg w-100" style={{ maxWidth: "440px" }}>

                {/* Header */}
                <div className="card-header text-center">
                    <h4>🌿 EcoMart</h4>
                    <small>Inicia sesión en tu cuenta</small>
                </div>

                {/* Body */}
                <div className="card-body">
                    <form onSubmit={handleSubmit} noValidate>

                        {/* Email */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Correo electrónico
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="correo@ejemplo.com"
                            />
                            {errors.email && (
                                <div className="invalid-feedback">{errors.email}</div>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">
                                Contraseña
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Tu contraseña"
                            />
                            {errors.password && (
                                <div className="invalid-feedback">{errors.password}</div>
                            )}
                        </div>

                        {/* Error general */}
                        {errorGeneral && (
                            <div className="alert alert-danger mb-3" role="alert">
                                ⚠️ {errorGeneral}
                            </div>
                        )}

                        {/* Botón */}
                        <button
                            type="submit"
                            className="btn btn-primary w-100 btn-lg"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                        aria-hidden="true"
                                    />
                                    Iniciando sesión...
                                </>
                            ) : (
                                "Iniciar sesión"
                            )}
                        </button>

                    </form>
                </div>

                {/* Footer */}
                <div className="card-footer text-center">
                    <small>
                        ¿No tienes cuenta?{" "}
                        <Link to="/register" className="link-primary">
                            Regístrate
                        </Link>
                    </small>
                </div>

            </div>
        </div>
    );
};

export default LoginForm;