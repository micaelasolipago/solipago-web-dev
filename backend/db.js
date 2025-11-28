// backend/db.js
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// 1. Configurar la ruta exacta del archivo .env
// Esto asegura que Node encuentre el archivo aunque lo ejecutes desde otra carpeta
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const { Pool } = pg;

// 2. Verificación de seguridad
if (!process.env.DB_PASSWORD) {
  console.error('❌ ERROR CRÍTICO: La contraseña de BD no se ha cargado.');
  console.error('   -> Revisa tu archivo backend/.env');
  console.error('   -> Asegúrate de que DB_PASSWORD tenga comillas si usa # (ej: DB_PASSWORD="clave#")');
}

// 3. Configuración de la conexión
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

// 4. Función para ejecutar queries (exportada para usar en server.js)
export const query = (text, params) => pool.query(text, params);

// 5. Logs de estado de conexión
pool.on('connect', () => {
  console.log('✅ Conexión a PostgreSQL establecida');
});

pool.on('error', (err) => {
  console.error('❌ Error inesperado en el cliente de PostgreSQL:', err);
});

export default pool;