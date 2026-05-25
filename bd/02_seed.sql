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
INSERT INTO productos (nombre, descripcion, precio, stock, imagen_url, categoria_id) VALUES
    ('Camiseta Eco',        'Camiseta 100% algodón orgánico',   35000, 50,  '/imagenes/camiseta.jpg', 1),
    ('Tote Bag Reciclada',  'Bolsa fabricada con PET reciclado', 25000, 100, '/imagenes/tote_bag.jpg', 2),
    ('Botella Reutilizable','Acero inoxidable 500ml',            45000, 75,  '/imagenes/botella.jpg', 3),
    ('Cuaderno Kraft',      'Papel reciclado 200 páginas',       18000, 200, '/imagenes/cuaderno.jpg', 3),
    ('Jabón Artesanal',     'Hecho a mano con aceites naturales',12000, 150, '/imagenes/ja.jpg', 4),
    ('Set de Cubiertos Reutilizables', 'Incluye tenedor, cuchara y cuchillo de acero inoxidable', 28000, 120, '/imagenes/Set de Cubiertos Reutilizables.jpg', 2),
    ('Mochila Ecológica',   'Resistente y ligera, hecha con materiales reciclados', 78000, 30, '/imagenes/Mochila Ecológica.jpg', 2),
    ('Cepillo Dental de Bambú', 'Cerdas biodegradables y mango de bambú natural', 22000, 90, '/imagenes/Cepillo Dental de Bambú.png', 4),
    ('Vela Aromática Natural', 'Cera de soja con fragancia cítrica y lavanda', 26000, 120, '/imagenes/Vela Aromática Natural.jpg', 3),
    ('Almohada de Algodón Orgánico', 'Funda suave y relleno hipoalergénico', 62000, 40, '/imagenes/Almohada de Algodón Orgánico.jpg', 3);
