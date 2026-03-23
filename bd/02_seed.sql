-- =============================================
-- EcoMart - Datos de prueba
-- =============================================

-- Categorias
INSERT INTO categorias (nombre, descripcion) VALUES
    ('Ropa',        'Prendas de vestir sostenibles'),
    ('Accesorios',  'Bolsas, mochilas y más'),
    ('Hogar',       'Productos para el hogar ecológico'),
    ('Cuidado',     'Jabones, cremas y cosméticos naturales');

-- Productos
INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id) VALUES
    ('Camiseta Eco',        'Camiseta 100% algodón orgánico',   35000, 50,  1),
    ('Tote Bag Reciclada',  'Bolsa fabricada con PET reciclado', 25000, 100, 2),
    ('Botella Reutilizable','Acero inoxidable 500ml',            45000, 75,  3),
    ('Cuaderno Kraft',      'Papel reciclado 200 páginas',       18000, 200, 3),
    ('Jabón Artesanal',     'Hecho a mano con aceites naturales',12000, 150, 4);

-- Usuario admin
INSERT INTO usuarios (nombre, apellido, email, password_hash, rol) VALUES
    ('Admin', 'EcoMart', 'admin@ecomart.com',
     '\$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin');