import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";

const RegisterForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [errorGeneral, setErrorGeneral] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
        setErrorGeneral("");
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.nombre.trim())
            newErrors.nombre = "El nombre es obligatorio";

        if (!formData.apellido.trim())
            newErrors.apellido = "El apellido es obligatorio";

        if (!formData.email.trim()) {
            newErrors.email = "El correo es obligatorio";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "El correo no tiene un formato válido";
        }

        if (!formData.password) {
            newErrors.password = "La contraseña es obligatoria";
        } else if (formData.password.length < 8) {
            newErrors.password = "La contraseña debe tener mínimo 8 caracteres";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const response = await authService.register(formData);
            login(response.token, {
                id: 0,
                nombre: response.nombre,
                apellido: response.apellido,
                email: response.email,
            });
            navigate("/productos");
        } catch (error: any) {
            const mensaje =
                error.response?.data?.mensaje || "Error al registrar el usuario";
            setErrorGeneral(mensaje);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center px-3"
            style={{
                background:
                    "linear-gradient(160deg, #728156 0%, #88976C 60%, #728156 100%)",
            }}
        >
            <div className="card shadow-lg w-100" style={{ maxWidth: "480px" }}>

                {/* Header */}
                <div className="card-header text-center">
                    <h4>EcoMart</h4>
                    <small>Crea tu cuenta para empezar</small>
                </div>

                {/* Body */}
                <div className="card-body">
                    <form onSubmit={handleSubmit} noValidate>

                        {/* Nombre y Apellido */}
                        <div className="row g-3 mb-3">
                            <div className="col-6">
                                <label htmlFor="nombre" className="form-label">
                                    Nombre
                                </label>
                                <input
                                    id="nombre"
                                    name="nombre"
                                    type="text"
                                    className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    placeholder="Tu nombre"
                                />
                                {errors.nombre && (
                                    <div className="invalid-feedback">{errors.nombre}</div>
                                )}
                            </div>

                            <div className="col-6">
                                <label htmlFor="apellido" className="form-label">
                                    Apellido
                                </label>
                                <input
                                    id="apellido"
                                    name="apellido"
                                    type="text"
                                    className={`form-control ${errors.apellido ? "is-invalid" : ""}`}
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    placeholder="Tu apellido"
                                />
                                {errors.apellido && (
                                    <div className="invalid-feedback">{errors.apellido}</div>
                                )}
                            </div>
                        </div>

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
                                placeholder="Mínimo 8 caracteres"
                            />
                            {errors.password && (
                                <div className="invalid-feedback">{errors.password}</div>
                            )}
                            <div className="form-text mt-1">
                                Usa al menos 8 caracteres para mayor seguridad
                            </div>
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
                                    Registrando...
                                </>
                            ) : (
                                "Crear cuenta"
                            )}
                        </button>

                    </form>
                </div>

                {/* Footer */}
                <div className="card-footer text-center">
                    <small>
                        ¿Ya tienes cuenta?{" "}
                        <Link to="/login" className="link-primary">
                            Inicia sesión
                        </Link>
                    </small>
                </div>

            </div>
        </div>
    );
};

export default RegisterForm;