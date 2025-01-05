// routes/preguntas.js
const express = require('express');
const router = express.Router();

const { getPreguntas, getPreguntaById, createPregunta, updatePregunta, deletePregunta } = require('../controllers/preguntasController');

// Rutas de preguntas
router.get('/', getPreguntas);              // Obtener todas las preguntas
router.get('/:id', getPreguntaById);        // Obtener una pregunta por ID
router.post('/', createPregunta);           // Crear una nueva pregunta
router.put('/:id', updatePregunta);         // Actualizar una pregunta
router.delete('/:id', deletePregunta);      // Eliminar una pregunta

module.exports = router;
