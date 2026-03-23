-- =============================================
-- EcoMart - Schema DDL
-- =============================================

-- Tabla: usuarios
CREATE TABLE usuarios (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(100)        NOT NULL,
    email       VARCHAR(150)        NOT NULL UNIQUE,
    password    VARCHAR(255)        NOT NULL,
    created_at  TIMESTAMP           DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: productos
CREATE TABLE productos (
    id          SERIAL PRIMARY KEY,
    nombre      VARCHAR(150)        NOT NULL,
    precio      NUMERIC(10,2)       NOT NULL CHECK (precio >= 0),
    stock       INT                 NOT NULL CHECK (stock >= 0),
    created_at  TIMESTAMP           DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: carritos
CREATE TABLE carritos (
    id              SERIAL PRIMARY KEY,
    usuario_id      INT             NOT NULL UNIQUE,
    fecha_creacion  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
    estado          VARCHAR(20)     DEFAULT 'activo' CHECK (estado IN ('activo', 'completado')),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla: items_carrito
CREATE TABLE items_carrito (
    id          SERIAL PRIMARY KEY,
    carrito_id  INT             NOT NULL,
    producto_id INT             NOT NULL,
    cantidad    INT             NOT NULL CHECK (cantidad > 0),
    subtotal    NUMERIC(10,2)   NOT NULL,
    FOREIGN KEY (carrito_id)  REFERENCES carritos(id)  ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE RESTRICT,
    UNIQUE (carrito_id, producto_id)
);