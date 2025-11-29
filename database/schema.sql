CREATE TABLE ventas (
    -- 1. Identificación
    id VARCHAR(50) PRIMARY KEY,
    process_id VARCHAR(50) NOT NULL,
    process_name VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- 2. Ventas Inicial
    cliente_nombre VARCHAR(255),
    producto_nombre VARCHAR(255),
    fecha_entrega_requerida DATE,
    usuario_ventas_inicial VARCHAR(100),

    -- 3. Ingeniería
    ingenieria_factibilidad VARCHAR(10), -- 'SI' o 'NO'
    fecha_inicio_diseno DATE,
    fecha_fin_diseno DATE,
    usuario_ingenieria VARCHAR(100),

    -- 4. Administración
    admin_costo_informado VARCHAR(10),   -- 'SI' o 'NO'
    fecha_disponibilidad_materiales DATE,
    usuario_administracion VARCHAR(100),

    -- 5. Producción | PCP
    produccion_factibilidad VARCHAR(10), -- 'SI' o 'NO' (Solo para P4)
    fecha_inicio_produccion DATE,
    fecha_fin_produccion DATE,
    usuario_pcp VARCHAR(100),

    -- 6. Directorio
    directorio_ok_avanzar VARCHAR(10),   -- 'SI' o 'NO'
    usuario_directorio VARCHAR(100),

    -- 7. Ventas Final
    fecha_rechazo DATE,
    fecha_activacion_pedido DATE,
    fecha_entrega_final DATE,
    usuario_ventas_final VARCHAR(100)

    is_closed BOOLEAN
);

-- Opcional: Crear un índice para buscar rápido por cliente
CREATE INDEX idx_ventas_cliente ON ventas(cliente_nombre);