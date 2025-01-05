// config/db.js
const { Pool } = require('pg');
require('dotenv').config();

// Configuración del pool de conexiones
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'anc',
  password: 'kiritokun',
  port: '5432',
});

pool.on('connect', () => {
    console.log('Conexión exitosa a PostgreSQL');
  });
  
  pool.on('error', (err) => {
    console.error('Error en el cliente de PostgreSQL:', err.message);
  });

// Exportar el pool para usarlo en otros módulos
module.exports = pool;

