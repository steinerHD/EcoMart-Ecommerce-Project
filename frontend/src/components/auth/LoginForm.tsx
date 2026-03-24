import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";
import Input from "../common/Input";
import bgImage from "../../assets/gradBG.png";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setErrorGeneral("");
  };

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

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center px-3"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="card shadow-lg w-100" style={{ maxWidth: "440px" }}>

        {/* Header */}
        <div className="card-header text-center">
          <h4>EcoMart</h4>
          <small>Inicia sesión en tu cuenta</small>
        </div>

        {/* Body */}
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>

            {/* Email */}
            <Input
              id="email"
              name="email"
              label="Correo electrónico"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="correo@ejemplo.com"
              error={errors.email}
            />

            {/* Password */}
            <Input
              id="password"
              name="password"
              label="Contraseña"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Tu contraseña"
              error={errors.password}
            />

            {/* Error general */}
            {errorGeneral && (
              <div className="alert alert-danger mb-3" role="alert">
                ⚠️ {errorGeneral}
              </div>
            )}

            {/* Botón */}
            <Button
              type="submit"
              fullWidth
              size="lg"
              loading={loading}
            >
              Iniciar sesión
            </Button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default LoginForm;