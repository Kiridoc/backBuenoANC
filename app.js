// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//Rutas de rutas XD
const preguntasRoutes = require('./routes/preguntas');
const authRoutes = require('./routes/auth'); 

//Swagger B)
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Swagger configuration
const options = {
    definition: {
      openapi: '3.0.0',  // Definir la versión de OpenAPI
      info: {
        title: 'API de ANC',  // Nombre de tu API
        version: '1.0.0',  // Versión
        description: 'Documentación de la API para gestionar el backend de la página del Acuario Nacional de Cuba',  // Descripción
      },
    },
    apis: ['./routes/*.js'],  // Directorio donde están las rutas de la API (ajusta este directorio si las rutas están en otro lado)
  };
  
  // Generación de la especificación de Swagger
  const swaggerSpec = swaggerJsdoc(options);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para servir la documentación de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de la API
app.use('/api/preguntas', preguntasRoutes);
app.use('/api/auth', authRoutes);  // Monta las rutas de autenticación

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
  console.log(`Documentación Swagger disponible en http://localhost:${PORT}/api-docs`);
});


const pool = require('./config/db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error al conectar a PostgreSQL:', err.message);
  } else {
    console.log('Conexión exitosa. Fecha actual:', res.rows[0]);
  }
});

