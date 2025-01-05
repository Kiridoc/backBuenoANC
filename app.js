// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const preguntasRoutes = require('./routes/preguntas');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/preguntas', preguntasRoutes);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
  });

  // Manejo de errores global
app.use((err, req, res, next) => {
    console.error('Error en el servidor:', err.message); // Muestra el error en la consola
    res.status(500).json({ error: 'Error interno del servidor' });
  });

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


const pool = require('./config/db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error al conectar a PostgreSQL:', err.message);
  } else {
    console.log('Conexión exitosa. Fecha actual:', res.rows[0]);
  }
});
