# EcoMart

Módulo de comercio electrónico — Ingeniería de Software 2  
Universidad Autónoma de Occidente

## Estructura del proyecto

| Carpeta | Tecnología | Descripción |
|---------|-----------|-------------|
| `bd/` | PostgreSQL | Scripts DDL, datos semilla y migraciones |
| `backend/` | Spring Boot 3 + Java 21 | API REST con autenticación JWT |
| `frontend/` | React + Vite | Interfaz de usuario |

## Vista previa

<img width="1919" height="880" alt="image" src="https://github.com/user-attachments/assets/2529d533-8e95-499c-b085-b6f5724ca952" />
<img width="1919" height="889" alt="image" src="https://github.com/user-attachments/assets/d11350bb-74a1-4ab6-a603-64535e0664d9" />
<img width="1919" height="879" alt="image" src="https://github.com/user-attachments/assets/45e52201-6d77-442c-9731-b320dd8534b3" />
<img width="1919" height="881" alt="image" src="https://github.com/user-attachments/assets/899d8231-9635-4ec2-9703-e0fb31f402aa" />
<img width="1919" height="882" alt="image" src="https://github.com/user-attachments/assets/3500cd77-1aa1-4352-8a7f-1be869422383" />




## Stack

<<<<<<< Updated upstream
- **Frontend:** React 18, Vite, Axios
- **Backend:** Spring Boot 4, Spring Security, JWT, JPA/Hibernate
- **Base de datos:** PostgreSQL 15
=======
- **Frontend:** React 18, Vite, TypeScript, Axios
- **Backend:** Spring Boot 3, Spring Security, JWT, JPA/Hibernate
- **Base de datos:** PostgreSQL 15

---

## ✅ Requisitos previos

Antes de correr el proyecto necesitas tener instalado lo siguiente.  
Si ya lo tienes, puedes saltarte ese paso.

| Herramienta | Versión mínima | Cómo verificar |
|-------------|---------------|----------------|
| Java (JDK) | 21 | `java -version` |
| Maven | 3.8+ | `mvn -version` |
| Node.js | 18+ | `node -v` |
| npm | 9+ | `npm -v` |
| PostgreSQL | 15 | `psql --version` |
| Git | cualquiera | `git --version` |

> 💡 En Ubuntu/Debian puedes instalar lo que falta con:
> ```bash
> sudo apt update
> sudo apt install -y openjdk-21-jdk maven postgresql postgresql-contrib
> ```
> Node.js se instala desde https://nodejs.org

---

## 🗄️ Paso 1 — Configurar la base de datos

Abre la terminal y ejecuta los siguientes comandos **una sola vez**.

**1.1 — Iniciar PostgreSQL (si no está corriendo):**
```bash
sudo systemctl start postgresql
```

**1.2 — Crear el usuario y la base de datos:**
```bash
sudo -u postgres psql
```

Dentro de la consola de postgres, pega esto y presiona Enter:
```sql
CREATE USER ecomart_user WITH PASSWORD 'ecomart123';
CREATE DATABASE ecomart_db OWNER ecomart_user;
GRANT ALL PRIVILEGES ON DATABASE ecomart_db TO ecomart_user;
\q
```

**1.3 — Crear las tablas y cargar datos de prueba:**
```bash
psql -U ecomart_user -d ecomart_db -f bd/01_schema.sql
psql -U ecomart_user -d ecomart_db -f bd/02_seed.sql
```

> ✅ Si no aparece ningún error, la base de datos está lista.

### ¿Prefieres usar pgAdmin en lugar de la terminal?

**1.1 — Abre pgAdmin** y conéctate a tu servidor local.

**1.2 — Crea el usuario:**  
Click derecho en **Login/Group Roles** → **Create** → **Login/Group Role...**
- En la pestaña **General** → Name: `ecomart_user`
- En la pestaña **Definition** → Password: `ecomart123`
- En la pestaña **Privileges** → activa **Can login?**
- Click en **Save**

**1.3 — Crea la base de datos:**  
Click derecho en **Databases** → **Create** → **Database...**
- Database: `ecomart_db`
- Owner: `ecomart_user`
- Click en **Save**

**1.4 — Ejecuta los scripts SQL:**  
Click derecho en `ecomart_db` → **Query Tool**, luego abre y ejecuta los archivos en este orden:
1. `bd/01_schema.sql`
2. `bd/02_seed.sql`

Luego después de ejecutar estos dos archivos en el Query Tool, la base de datos estará montada pero necesitamos que el usuario tenga permisos, asi que ejecutaremos la siguiente linea:
`
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO ecomart_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO ecomart_user;
`

Una vez ejecutado ese script ya tienes los permisos.

> ✅ Si no aparece ningún error en rojo en el Query Tool, la base de datos está lista.

---

## ⚙️ Paso 2 — Configurar el Backend

Antes de iniciar el backend, abre el archivo:
backend/src/main/resources/application.properties

Verifica que las credenciales de la base de datos coincidan con las que creaste en el paso anterior.  
El archivo debe verse así:

```properties
# Servidor
server.port=8080

# Base de datos
spring.datasource.url=jdbc:postgresql://localhost:5432/ecomart_db
spring.datasource.username=ecomart_user
spring.datasource.password=ecomart123

# JPA / Hibernate
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

# JWT
jwt.secret=ecomart_secret_key_2026_muy_larga_para_que_sea_segura
jwt.expiration=86400000
```

> ⚠️ **Importante:** el campo `spring.datasource.password` debe tener la misma contraseña
> que usaste al crear el usuario en PostgreSQL. Si seguiste esta guía tal cual,
> la contraseña es `ecomart123` y no necesitas cambiar nada.
> Si en tu máquina creaste el usuario con una contraseña diferente, cámbiala aquí.

---

## ▶️ Paso 3 — Iniciar el Backend (Spring Boot)

Abre **una terminal** dentro de la carpeta del proyecto y ejecuta:

```bash
cd backend/backend
mvn spring-boot:run
```

La primera vez Maven descarga todas las dependencias (puede tardar unos minutos ☕).  
Cuando veas esto en la consola, el backend está listo:
Started BackendApplication in X.XXX seconds

> El backend corre en: **http://localhost:8080**

---

## 🌐 Paso 4 — Iniciar el Frontend (React + Vite)

Abre **otra terminal nueva** (sin cerrar la del backend) y ejecuta:

```bash
cd frontend
npm install
npm run dev
```

- `npm install` solo es necesario la **primera vez** o cuando alguien agrega dependencias nuevas.
- `npm run dev` inicia el servidor de desarrollo.

Cuando veas algo como esto, el frontend está listo:
VITE v5.x.x  ready in XXX ms
➜  Local:   http://localhost:5173/

Abre tu navegador en: **http://localhost:5173**

---

## 🚀 Resumen rápido (para las siguientes veces)

Una vez que ya configuraste todo, para levantar el proyecto solo necesitas abrir **3 terminales**:

```bash
# Terminal 1 — Base de datos
sudo systemctl start postgresql

# Terminal 2 — Backend
cd backend && mvn spring-boot:run

# Terminal 3 — Frontend
cd frontend && npm run dev
```

---

## 🔑 Credenciales por defecto

| Campo | Valor |
|-------|-------|
| DB Host | `localhost:5432` |
| DB Name | `ecomart_db` |
| DB User | `ecomart_user` |
| DB Password | `ecomart123` |
| Backend URL | `http://localhost:8080` |
| Frontend URL | `http://localhost:5173` |

---

## ❓ Problemas frecuentes

**El backend falla con "Connection refused" a la base de datos**  
→ Asegúrate de que PostgreSQL esté corriendo: `sudo systemctl status postgresql`

**El backend falla con "password authentication failed"**  
→ La contraseña en `application.properties` no coincide con la de PostgreSQL.  
→ Verifica que `spring.datasource.password` sea exactamente `ecomart123`

**El puerto 8080 ya está en uso**  
→ Mata el proceso: `sudo kill -9 $(lsof -t -i:8080)`

**npm install falla**  
→ Borra la carpeta y vuelve a instalar: `rm -rf node_modules && npm install`

**mvn spring-boot:run falla con "JAVA_HOME not set"**  
→ Ejecuta: `export JAVA_HOME=/usr/lib/jvm/java-21-openjdk-amd64`

---

# Ejecución de pruebas unitarias

El proyecto incluye pruebas unitarias realizadas con:

- JUnit 5
- Mockito
- JaCoCo
- Spring Boot Test

---
Para ejecutar pruebas unitarias
cd backend - 2 veces
mvn clean test
En target en la carpeta site se crea el index.html de jcoco en el cual sale la cobertura
---

# Pruebas del Proyecto en el frontend

## Tecnologías de testing

El proyecto utiliza:

- Vitest → pruebas unitarias
- Testing Library → testing de componentes React
- Playwright → pruebas end-to-end (E2E)

---

# Ejecutar pruebas unitarias

Desde la carpeta `frontend`:

```bash
npm run test
```

Esto ejecuta todas las pruebas unitarias ubicadas en:

```bash
src/tests/
```

---

# Ejecutar pruebas con coverage

```bash
npm run coverage
```

Esto genera el reporte de cobertura del proyecto.

---

# Ejecutar pruebas E2E con Playwright

```bash
npm run test:e2e
```

Las pruebas E2E se encuentran en:

```bash
e2e/
```

---

# Scripts disponibles

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",

  "test": "vitest",
  "coverage": "vitest run --coverage",

  "test:e2e": "playwright test"
}
```

---

# Dependencias utilizadas para testing

```bash
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @playwright/test
```

---

# Configuración de Vitest

Archivo: `frontend/vitest.config.ts`

```ts
/// <reference types="vitest" />

import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.ts',

    include: ['src/tests/**/*.{test,spec}.{ts,tsx}'],

    exclude: [
      'node_modules',
      'dist',
      'e2e',
    ]
  }
})
```

---

# Setup de Testing Library

Archivo: `src/setupTests.ts`

```ts
import '@testing-library/jest-dom'
```

## 📋 Requisitos

Antes de ejecutar las pruebas, asegúrese de tener instalado:

- Java 21
- Maven 3.9+
- PostgreSQL configurado (si desea ejecutar la aplicación completa)

Verificar versiones:

```bash
java -version
mvn -version


## 👥 Equipo

| Nombre | Código |
|--------|--------|
| Steiner Herrera Mosquera | 2236793 |
| Alan Basante | 2236708 |
| Jose Daniel Vivas | 2221005 |
| Melany Ceballos | 2235617 |
| Santiago Gutierrez | 2235501 |

**Docente:** Rodrigo Escobar López
>>>>>>> Stashed changes
