// backend/utils.js

// Diccionario de mapeo directo (Nombre en Frontend -> Columna en DB)
const fieldMappings = {
  // 1. Ventas Inicial
  "Nombre del Cliente": "cliente_nombre",
  "Nombre del Producto": "producto_nombre",
  "Fecha de entrega requerida": "fecha_entrega_requerida",
  "Usuario Ventas Inicial": "usuario_ventas_inicial",

  // 2. Ingeniería
  "Fecha inicio Diseño": "fecha_inicio_diseno",
  "Fecha fin Diseño": "fecha_fin_diseno",
  "Usuario Ingeniería": "usuario_ingenieria",
  
  // 3. Administración
  "Costo informado": "admin_costo_informado",
  "Fecha disponibilidad materiales": "fecha_disponibilidad_materiales",
  "Usuario Administración": "usuario_administracion",

  // 4. Producción | PCP
  "Fecha inicio Producción": "fecha_inicio_produccion",
  "Fecha fin Producción": "fecha_fin_produccion",
  "Usuario PCP": "usuario_pcp",

  // 5. Directorio
  "Ok para avanzar": "directorio_ok_avanzar",
  "Usuario Directorio": "usuario_directorio",

  // 6. Ventas Final
  "Fecha rechazo": "fecha_rechazo",
  "Fecha activación del pedido": "fecha_activacion_pedido",
  "Fecha Compromiso": "fecha_entrega_final",
  "Usuario Ventas Final": "usuario_ventas_final"
};

/**
 * Traduce el nombre del campo del frontend a la columna de la base de datos.
 * @param {string} fieldName - El nombre del campo (ej: "Nombre del Cliente").
 * @param {string} stageName - El nombre de la etapa actual (para desambiguación).
 * @returns {string|null} - El nombre de la columna en SQL o null si no existe.
 */
export const mapFieldToColumn = (fieldName, stageName) => {
  // Limpieza básica por si viene con espacios extra
  const cleanField = fieldName.trim();

  // CASO ESPECIAL: "Factibilidad" existe en dos etapas distintas
  if (cleanField === "Factibilidad") {
    if (stageName.includes("Ingeniería")) return "ingenieria_factibilidad";
    if (stageName.includes("Producción") || stageName.includes("PCP")) return "produccion_factibilidad";
    return null; // Si no coincide la etapa, ignorar
  }

  // Mapeo directo
  return fieldMappings[cleanField] || null;
};