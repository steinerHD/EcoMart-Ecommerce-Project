import { test, expect } from "@playwright/test";

test.describe("Autenticación", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
    await page.evaluate(() => localStorage.clear());
  });

  test("Carga de formulario", async ({ page }) => {
    await expect(page.locator("h4", { hasText: "EcoMart" })).toBeVisible();
    await expect(page.locator("text=Inicia sesión en tu cuenta")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    const submitBtn = page.getByRole("button", { name: /Iniciar sesión/i });
    await expect(submitBtn).toBeVisible();
    await expect(submitBtn).toBeEnabled();
  });

  test("Validación campos vacíos", async ({ page }) => {
    const submitBtn = page.getByRole("button", { name: /Iniciar sesión/i });
    await submitBtn.click();
    await expect(page.locator("text=El correo es obligatorio")).toBeVisible();
    await expect(
      page.locator("text=La contraseña es obligatoria"),
    ).toBeVisible();
  });

  test("Validación formato correo", async ({ page }) => {
    const emailInput = page.locator("#email");
    const passwordInput = page.locator("#password");
    const submitBtn = page.getByRole("button", { name: /Iniciar sesión/i });

    const invalidEmails = [
      "correo-sin-arroba",
      "@sinusuario.com",
      "usuario@sinpunto",
      "usuario@dominio.",
      "correo invalido@ejemplo.com",
    ];

    await passwordInput.fill("ValidPassword123!");

    for (const email of invalidEmails) {
      await emailInput.fill("");
      await emailInput.fill(email);
      await submitBtn.click();
      const errorMsg = page.locator(
        "text=El correo no tiene un formato válido",
      );
      await expect(errorMsg).toBeVisible();
    }
  });

  test("Limpieza de errores", async ({ page }) => {
    const emailInput = page.locator("#email");
    const submitBtn = page.getByRole("button", { name: /Iniciar sesión/i });

    await submitBtn.click();
    await expect(page.locator("text=El correo es obligatorio")).toBeVisible();

    await emailInput.fill("a");
    await expect(page.locator("text=El correo es obligatorio")).toBeHidden();
  });

  test("Error credenciales", async ({ page }) => {
    await page.route("**/api/auth/login", async (route) => {
      await route.fulfill({
        status: 401,
        contentType: "application/json",
        body: JSON.stringify({ mensaje: "Credenciales inválidas" }),
      });
    });

    await page.locator("#email").fill("usuario@ejemplo.com");
    await page.locator("#password").fill("clave-incorrecta");
    await page.getByRole("button", { name: /Iniciar sesión/i }).click();

    const alertMsg = page.locator(".alert.alert-danger");
    await expect(alertMsg).toBeVisible();
    await expect(alertMsg).toContainText("Credenciales inválidas");
  });

  test("Login exitoso", async ({ page }) => {
    await page.route("**/api/auth/login", async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          token: "fake-token",
          nombre: "Pepe",
          apellido: "Tono",
          email: "Pepetono@mail.com",
        }),
      });
    });

    await page.locator("#email").fill("Camilo@ecomart.com");
    await page.locator("#password").fill("password");
    const submitBtn = page.locator('button[type="submit"]');
    const navigationPromise = page.waitForURL("**/productos");
    await submitBtn.click();
    await expect(submitBtn).toBeDisabled();
    await navigationPromise;
    await expect(page).toHaveURL(/\/productos/);

    const lsToken = await page.evaluate(() => localStorage.getItem("token"));
    const lsUserStr = await page.evaluate(() => localStorage.getItem("user"));
    expect(lsToken).toBe("fake-token");
    expect(lsUserStr).toBeTruthy();
  });
});
test.describe("Registro", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/register");
  });

  test("registro exitoso", async ({ page }) => {

    await page.route("**/api/auth/register", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify({
          mensaje: "Usuario registrado"
        }),
      });
    });

    await page.locator("#nombre").fill("Juan");
    await page.locator("#apellido").fill("Pérez");
    await page.locator("#email").fill("juan@test.com");
    await page.locator("#password").fill("Password123!");

    await page.getByRole("button", {
      name: /crear cuenta/i
    }).click();

    // validar redirección
    await expect(page).toHaveURL(/login/);
  });

  test("error backend registro", async ({ page }) => {

    await page.route("**/api/auth/register", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          mensaje: "El correo ya existe"
        }),
      });
    });

    await page.locator("#nombre").fill("Juan");
    await page.locator("#apellido").fill("Pérez");
    await page.locator("#email").fill("juan@test.com");
    await page.locator("#password").fill("Password123!");

    await page.getByRole("button", {
      name: /crear cuenta/i
    }).click();

    await expect(
      page.locator(".alert-danger")
    ).toContainText("El correo ya existe");
  });

});


test.describe("Productos", () => {

  test.beforeEach(async ({ page }) => {

    // simular login
    await page.goto("/login");

    await page.evaluate(() => {
      localStorage.setItem("token", "fake-token");

      localStorage.setItem(
        "user",
        JSON.stringify({
          nombre: "Pepe",
          apellido: "Tono",
          email: "test@test.com",
        })
      );
    });

    // mock productos
    await page.route("**/api/productos", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: 1,
            nombre: "Laptop",
            descripcion: "Laptop gamer",
            precio: 5000,
            stock: 10,
            imagenUrl: "",
            categoriaNombre: "Tecnología",
            activo: true,
          },
        ]),
      });
    });

    await page.goto("/productos");
  });

  test("renderiza productos", async ({ page }) => {

    const card = page.locator(".card").first();

    await expect(card).toContainText("Laptop");

    await expect(card).toContainText(/5000|5\.000|\$5,000/);

    await expect(
      card.getByRole("button", { name: /agregar/i })
    ).toBeVisible();
  });
});
