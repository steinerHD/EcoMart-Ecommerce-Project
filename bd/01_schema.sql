-- =============================================
-- EcoMart - Schema DDL v2
-- =============================================

-- ─────────────────────────────────────────────
-- ENUM types
-- ─────────────────────────────────────────────
CREATE TYPE rol_usuario   AS ENUM ('cliente', 'admin');
CREATE TYPE estado_carrito AS ENUM ('activo', 'completado', 'cancelado');
CREATE TYPE estado_pedido  AS ENUM ('pendiente', 'pagado', 'enviado', 'entregado', 'cancelado');

-- ─────────────────────────────────────────────
-- Tabla: categorias
-- ─────────────────────────────────────────────
CREATE TABLE categorias (
    id          BIGSERIAL    PRIMARY KEY,
    nombre      VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    activo      BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- Tabla: usuarios
-- ─────────────────────────────────────────────
CREATE TABLE usuarios (
    id             BIGSERIAL       PRIMARY KEY,
    nombre         VARCHAR(100)    NOT NULL,
    apellido       VARCHAR(100)    NOT NULL,
    email          VARCHAR(150)    NOT NULL UNIQUE,
    password_hash  VARCHAR(255)    NOT NULL,
    rol            rol_usuario     NOT NULL DEFAULT 'cliente',
    activo         BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- Tabla: productos
-- ─────────────────────────────────────────────
CREATE TABLE productos (
    id            BIGSERIAL       PRIMARY KEY,
    nombre        VARCHAR(150)    NOT NULL,
    descripcion   TEXT,
    precio        NUMERIC(12,2)   NOT NULL CHECK (precio > 0),
    stock         INT             NOT NULL DEFAULT 0 CHECK (stock >= 0),
    imagen_url    VARCHAR(500),
    categoria_id  BIGINT          REFERENCES categorias(id) ON DELETE SET NULL,
    activo        BOOLEAN         NOT NULL DEFAULT TRUE,
    created_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at    TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- Tabla: carritos
-- ─────────────────────────────────────────────
CREATE TABLE carritos (
    id           BIGSERIAL       PRIMARY KEY,
    usuario_id   BIGINT          NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    estado       estado_carrito  NOT NULL DEFAULT 'activo',
    created_at   TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- Tabla: items_carrito
-- ─────────────────────────────────────────────
CREATE TABLE items_carrito (
    id              BIGSERIAL       PRIMARY KEY,
    carrito_id      BIGINT          NOT NULL REFERENCES carritos(id)  ON DELETE CASCADE,
    producto_id     BIGINT          NOT NULL REFERENCES productos(id) ON DELETE RESTRICT,
    cantidad        INT             NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(12,2)   NOT NULL CHECK (precio_unitario > 0),
    UNIQUE (carrito_id, producto_id)
);

-- ─────────────────────────────────────────────
-- Tabla: pedidos  (snapshot del carrito al hacer checkout)
-- ─────────────────────────────────────────────
CREATE TABLE pedidos (
    id           BIGSERIAL       PRIMARY KEY,
    usuario_id   BIGINT          NOT NULL REFERENCES usuarios(id) ON DELETE RESTRICT,
    carrito_id   BIGINT          REFERENCES carritos(id) ON DELETE SET NULL,
    total        NUMERIC(12,2)   NOT NULL CHECK (total >= 0),
    estado       estado_pedido   NOT NULL DEFAULT 'pendiente',
    created_at   TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at   TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ─────────────────────────────────────────────
-- Tabla: items_pedido  (snapshot de los items al momento del checkout)
-- ─────────────────────────────────────────────
CREATE TABLE items_pedido (
    id              BIGSERIAL       PRIMARY KEY,
    pedido_id       BIGINT          NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    producto_id     BIGINT          NOT NULL REFERENCES productos(id) ON DELETE RESTRICT,
    nombre_producto VARCHAR(150)    NOT NULL,  -- snapshot del nombre
    cantidad        INT             NOT NULL CHECK (cantidad > 0),
    precio_unitario NUMERIC(12,2)   NOT NULL CHECK (precio_unitario > 0),
    subtotal        NUMERIC(12,2)   NOT NULL CHECK (subtotal > 0)
);

-- Búsqueda de usuario por email (login)
CREATE INDEX idx_usuarios_email     ON usuarios(email);

-- Filtrar productos activos por categoría
CREATE INDEX idx_productos_categoria ON productos(categoria_id);
CREATE INDEX idx_productos_activo    ON productos(activo);

-- Buscar el carrito activo de un usuario
CREATE INDEX idx_carritos_usuario   ON carritos(usuario_id);
CREATE INDEX idx_carritos_estado    ON carritos(estado);

-- Items de un carrito
CREATE INDEX idx_items_carrito      ON items_carrito(carrito_id);

-- Pedidos de un usuario
CREATE INDEX idx_pedidos_usuario    ON pedidos(usuario_id);

-- Función reutilizable
CREATE OR REPLACE FUNCTION actualizar_updated_at()
RETURNS TRIGGER AS 
$$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$
 LANGUAGE plpgsql;

-- Aplicar a cada tabla que tenga updated_at
CREATE TRIGGER trg_usuarios_updated_at
    BEFORE UPDATE ON usuarios
    FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trg_productos_updated_at
    BEFORE UPDATE ON productos
    FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trg_carritos_updated_at
    BEFORE UPDATE ON carritos
    FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trg_pedidos_updated_at
    BEFORE UPDATE ON pedidos
    FOR EACH ROW EXECUTE FUNCTION actualizar_updated_at();