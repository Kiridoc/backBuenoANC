// config/db.js
const { Pool } = require('pg');
require('dotenv').config();

// Configuración del pool de conexiones
const pool = new Pool({
  user: process.env.DB_USER,       // Usuario de la base de datos
  host: process.env.DB_HOST,       // Host (generalmente localhost)
  database: process.env.DB_NAME,   // Nombre de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña (debe ser un string válido)
  port: process.env.DB_PORT, 
});

pool.on('connect', () => {
    console.log('Conexión exitosa a PostgreSQL');
  });
  
  pool.on('error', (err) => {
    console.error('Error en el cliente de PostgreSQL:', err.message);
  });

// Exportar el pool para usarlo en otros módulos
module.exports = pool;

