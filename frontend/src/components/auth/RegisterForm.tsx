import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";
import Input from "../common/Input";

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
            <div className="row g-3">
              <div className="col-6">
                <Input
                  id="nombre"
                  name="nombre"
                  label="Nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  error={errors.nombre}
                />
              </div>
              <div className="col-6">
                <Input
                  id="apellido"
                  name="apellido"
                  label="Apellido"
                  type="text"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder="Tu apellido"
                  error={errors.apellido}
                />
              </div>
            </div>

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
              placeholder="Mínimo 8 caracteres"
              error={errors.password}
              hint="Usa al menos 8 caracteres para mayor seguridad"
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
              Crear cuenta
            </Button>

          </form>
        </div>

      </div>
    </div>
  );
};

export default RegisterForm;