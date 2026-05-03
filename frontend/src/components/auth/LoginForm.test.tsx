import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";
import "@testing-library/jest-dom";

// ─── Mocks ───────────────────────────────────────────────────────────────────

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

const mockLogin = jest.fn();
jest.mock("../../src/hooks/useAuth", () => ({
  useAuth: () => ({ login: mockLogin }),
}));

jest.mock("../../src/services/authService", () => ({
  authService: {
    login: jest.fn(),
  },
}));

jest.mock("../../src/assets/gradBG.png", () => "gradBG.png");

// Stubs for child components
jest.mock("../../src/components/common/Button", () => ({
  __esModule: true,
  default: ({ children, loading, type, onClick }: any) => (
    <button type={type} onClick={onClick} disabled={loading} data-loading={loading}>
      {loading ? "Cargando..." : children}
    </button>
  ),
}));

jest.mock("../../src/components/common/Input", () => ({
  __esModule: true,
  default: ({ id, name, label, type, value, onChange, placeholder, error }: any) => (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={label}
      />
      {error && <span role="alert">{error}</span>}
    </div>
  ),
}));

// ─── Import after mocks ───────────────────────────────────────────────────────
import { authService } from "../../services/authService";
const mockAuthService = authService as jest.Mocked<typeof authService>;

// ─── Helpers ─────────────────────────────────────────────────────────────────
const renderLoginForm = () => render(<LoginForm />);

const fillForm = async (email: string, password: string) => {
  await userEvent.type(screen.getByLabelText("Correo electrónico"), email);
  await userEvent.type(screen.getByLabelText("Contraseña"), password);
};


describe("LoginForm", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });


  describe("Renderizado inicial", () => {
    it("muestra el título EcoMart", () => {
      renderLoginForm();
      expect(screen.getByText("EcoMart")).toBeInTheDocument();
    });

    it("muestra el subtítulo de inicio de sesión", () => {
      renderLoginForm();
      expect(screen.getByText("Inicia sesión en tu cuenta")).toBeInTheDocument();
    });

    it("renderiza el campo de email", () => {
      renderLoginForm();
      expect(screen.getByLabelText("Correo electrónico")).toBeInTheDocument();
    });

    it("renderiza el campo de contraseña", () => {
      renderLoginForm();
      expect(screen.getByLabelText("Contraseña")).toBeInTheDocument();
    });

    it("renderiza el botón de submit", () => {
      renderLoginForm();
      expect(screen.getByRole("button", { name: "Iniciar sesión" })).toBeInTheDocument();
    });

    it("los campos comienzan vacíos", () => {
      renderLoginForm();
      expect(screen.getByLabelText("Correo electrónico")).toHaveValue("");
      expect(screen.getByLabelText("Contraseña")).toHaveValue("");
    });
  });


  describe("Validación de formulario", () => {
    it("muestra error si el email está vacío al hacer submit", async () => {
      renderLoginForm();
      fireEvent.submit(screen.getByRole("button"));
      await waitFor(() => {
        expect(screen.getByText("El correo es obligatorio")).toBeInTheDocument();
      });
    });

    it("muestra error si la contraseña está vacía al hacer submit", async () => {
      renderLoginForm();
      fireEvent.submit(screen.getByRole("button"));
      await waitFor(() => {
        expect(screen.getByText("La contraseña es obligatoria")).toBeInTheDocument();
      });
    });

    it("muestra error si el email no tiene formato válido", async () => {
      renderLoginForm();
      await userEvent.type(screen.getByLabelText("Correo electrónico"), "correo-invalido");
      fireEvent.submit(screen.getByRole("button"));
      await waitFor(() => {
        expect(screen.getByText("El correo no tiene un formato válido")).toBeInTheDocument();
      });
    });

    it("no llama a authService.login si el formulario es inválido", async () => {
      renderLoginForm();
      fireEvent.submit(screen.getByRole("button"));
      await waitFor(() => {
        expect(mockAuthService.login).not.toHaveBeenCalled();
      });
    });

    it("limpia el error de email al escribir en ese campo", async () => {
      renderLoginForm();
      fireEvent.submit(screen.getByRole("button"));
      await waitFor(() => screen.getByText("El correo es obligatorio"));

      await userEvent.type(screen.getByLabelText("Correo electrónico"), "a");
      expect(screen.queryByText("El correo es obligatorio")).not.toBeInTheDocument();
    });
  });


  describe("Submit exitoso", () => {
    const mockResponse = {
      token: "fake-token",
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan@test.com",
      rol: ["usuario"],
    };

    beforeEach(() => {
      mockAuthService.login.mockResolvedValue(mockResponse);
    });

    it("llama a authService.login con los datos correctos", async () => {
      renderLoginForm();
      await fillForm("juan@test.com", "pass123");
      fireEvent.submit(screen.getByRole("button"));

      await waitFor(() => {
        expect(mockAuthService.login).toHaveBeenCalledWith({
          email: "juan@test.com",
          password: "pass123",
        });
      });
    });

    it("llama a login del contexto con el token y datos del usuario", async () => {
      renderLoginForm();
      await fillForm("juan@test.com", "pass123");
      fireEvent.submit(screen.getByRole("button"));

      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith("fake-token", {
          id: 0,
          nombre: "Juan",
          apellido: "Pérez",
          email: "juan@test.com",
          rol: ["user"],
        });
      });
    });

    it("navega a /productos tras login exitoso", async () => {
      renderLoginForm();
      await fillForm("juan@test.com", "pass123");
      fireEvent.submit(screen.getByRole("button"));

      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/productos");
      });
    });
  });


  describe("Manejo de errores del servidor", () => {
    it("muestra el mensaje de error cuando el servidor responde con error", async () => {
      mockAuthService.login.mockRejectedValue({
        response: { data: { mensaje: "Credenciales incorrectas" } },
      });

      renderLoginForm();
      await fillForm("juan@test.com", "wrongpass");
      fireEvent.submit(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByRole("alert")).toHaveTextContent("Credenciales incorrectas");
      });
    });

    it("muestra mensaje genérico si el servidor no retorna mensaje", async () => {
      mockAuthService.login.mockRejectedValue(new Error("Network error"));

      renderLoginForm();
      await fillForm("juan@test.com", "wrongpass");
      fireEvent.submit(screen.getByRole("button"));

      await waitFor(() => {
        expect(screen.getByRole("alert")).toHaveTextContent(
          "Correo o contraseña incorrectos"
        );
      });
    });

    it("el error general se limpia al cambiar un campo", async () => {
      mockAuthService.login.mockRejectedValue(new Error("Error"));

      renderLoginForm();
      await fillForm("juan@test.com", "wrongpass");
      fireEvent.submit(screen.getByRole("button"));
      await waitFor(() => screen.getByRole("alert"));

      await userEvent.type(screen.getByLabelText("Correo electrónico"), "x");
      expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });
  });

});