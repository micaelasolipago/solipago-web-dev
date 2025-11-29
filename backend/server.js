// backend/server.js
import express from "express";
import cors from "cors";
import "dotenv/config";
import { query } from "./db.js";
import { mapFieldToColumn } from "./utils.js"; // Importamos la utilidad

const app = express();
const port = process.env.SERVER_PORT || 3000;

// Función simulada para verificar credenciales (REEMPLAZAR en un entorno real)
const verifyCredentials = (username, password) => {
  // Simulación: Si el usuario es 'admin' y la contraseña es 'pass123', es válido.
  // Cualquier otra combinación es 'invitado' para ver la lógica de roles.
  if (username === "roberto" && password === "roberto123") {
    // En una BD real, se devolvería el nombre completo del usuario y su rol.
    return {
      success: true,
      username: "Administrador Principal",
      role: "admin",
    };
  }

  if (username === "carlos" && password === "carlos123") {
    return {
      success: true,
      username: "Carlos",
      role: "user",
    };
  }

  if (username === "gabriel" && password === "gabriel123") {
    return {
      success: true,
      username: "Gabriel",
      role: "user",
    };
  }

  if (username === "anibal" && password === "anibal123") {
    return {
      success: true,
      username: "Anibal",
      role: "user",
    };
  }

  if (username === "sofia" && password === "sofia123") {
    return {
      success: true,
      username: "Sofia",
      role: "user",
    };
  }

  if (username === "eduardo" && password === "eduardo123") {
    return {
      success: true,
      username: "Eduardo PROPYMES",
      role: "user",
    };
  }

  // Simular un fallo
  return { success: false, error: "Credenciales inválidas" };
};

// Middleware
app.use(cors());
app.use(express.json());

// ===================================
// RUTAS API
// ===================================

// NUEVA RUTA: POST para simular el inicio de sesión
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Se requiere nombre de usuario y contraseña." });
  }

  const authResult = verifyCredentials(username, password);

  if (authResult.success) {
    res.json({
      message: "Login exitoso",
      user: authResult.username, // Devolvemos el nombre del usuario
    });
  } else {
    res.status(401).json({ error: authResult.error });
  }
});

// GET: Obtener todas las ventas
app.get("/api/ventas", async (req, res) => {
  try {
    const result = await query("SELECT * FROM ventas WHERE is_closed = FALSE ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error al obtener ventas:", err.stack);
    res.status(500).json({ error: "Error interno del servidor." });
  }
});

// POST: Crear una nueva venta
app.post("/api/ventas", async (req, res) => {
  const { id, processId, processName } = req.body;

  if (!id || !processId) {
    return res
      .status(400)
      .json({ error: "Faltan datos obligatorios (id, processId)" });
  }

  try {
    const text = `
      INSERT INTO ventas (id, process_id, process_name)
      VALUES ($1, $2, $3, FALSE)
      RETURNING *
    `;
    const values = [id, processId, processName];

    const result = await query(text, values);
    console.log(`✅ Venta creada: ${id}`);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al crear venta:", err.stack);
    // Manejo de error de duplicados (código 23505 en Postgres)
    if (err.code === "23505") {
      return res.status(409).json({ error: "El ID de venta ya existe." });
    }
    res
      .status(500)
      .json({ error: "Error al crear la venta en base de datos." });
  }
});

// PUT: Actualizar campos de una etapa específica
// URL esperada: /api/ventas/vta-001/stage/Ingeniería
app.put("/api/ventas/:id/stage/:stageName", async (req, res) => {
  const { id, stageName } = req.params;
  const fieldsToUpdate = req.body; // Objeto con { "Nombre del campo": "Valor" }

  if (!fieldsToUpdate || Object.keys(fieldsToUpdate).length === 0) {
    return res
      .status(400)
      .json({ error: "No se enviaron campos para actualizar." });
  }

  // Construcción dinámica de la Query SQL
  // Queremos generar algo como: UPDATE ventas SET col1 = $1, col2 = $2 WHERE id = $3
  let setClauses = [];
  let values = [];
  let paramIndex = 1;

  Object.entries(fieldsToUpdate).forEach(([fieldName, value]) => {
    // Usamos la utilidad para traducir "Nombre Humano" -> "columna_sql"
    const dbColumn = mapFieldToColumn(fieldName, stageName);

    if (dbColumn) {
      setClauses.push(`${dbColumn} = $${paramIndex}`);
      // Convertir string vacío a null para la BD
      values.push(value === "" ? null : value);
      paramIndex++;
    } else {
      console.warn(
        `⚠️ Campo ignorado (no mapeado): "${fieldName}" en etapa "${stageName}"`
      );
    }
  });

  if (setClauses.length === 0) {
    return res.status(400).json({
      error: "Ninguno de los campos enviados corresponde a columnas válidas.",
    });
  }

  // Agregamos el ID al final de los valores para el WHERE
  values.push(id);
  const queryText = `UPDATE ventas SET ${setClauses.join(
    ", "
  )} WHERE id = $${paramIndex} RETURNING *`;

  try {
    const result = await query(queryText, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Venta no encontrada." });
    }

    console.log(`✅ Actualizada venta ${id}, etapa ${stageName}`);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al actualizar venta:", err.stack);
    res.status(500).json({ error: "Error interno al actualizar la venta." });
  }
});

// Ruta de prueba base
app.get("/", (req, res) => {
  res.send("Servidor Vulcano Backend en funcionamiento!");
});

app.delete("/api/ventas/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await query("DELETE FROM ventas WHERE id = $1 RETURNING *", [
      id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Venta no encontrada." });
    }

    console.log(`🗑️ Venta eliminada: ${id}`);
    res.json({ message: "Venta eliminada correctamente", deletedId: id });
  } catch (err) {
    console.error("Error al eliminar venta:", err.stack);
    res.status(500).json({ error: "Error interno al eliminar la venta." });
  }
});

// PUT: Marcar una venta como cerrada (Quitar de la vista)
app.put("/api/ventas/:id/close", async (req, res) => {
  const { id } = req.params;

  try {
    // Solo actualiza la columna is_closed a TRUE
    const queryText =
      "UPDATE ventas SET is_closed = TRUE WHERE id = $1 RETURNING *";
    const result = await query(queryText, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Venta no encontrada." });
    }

    console.log(`🔒 Venta marcada como cerrada: ${id} (CONSERVADA en DB)`);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al marcar venta como cerrada:", err.stack);
    res.status(500).json({ error: "Error interno." });
  }
});


// ===================================
// INICIO DEL SERVIDOR
// ===================================
app.listen(port, () => {
  console.log(`📡 Servidor Express escuchando en http://localhost:${port}`);
});
