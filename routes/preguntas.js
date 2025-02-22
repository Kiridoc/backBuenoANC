// routes/preguntas.js
const express = require('express');
const router = express.Router();

const { getPreguntas, getPreguntaById, createPregunta, updatePregunta, deletePregunta } = require('../controllers/preguntasController');

const { authorize, authorize2 } = require('../middleware/autorizacion');

const verifyToken = require('../middleware/verifyToken');

// Rutas de preguntas

/** 
 * @swagger
 * tags:
 *  name: preguntas frecuentes
 *  description: Gestión de preguntas frecuentes
 */

/**
 * @swagger
 * /api/preguntas:
 *   get:
 *     summary: Obtener todas las preguntas frecuentes
 *     tags: [preguntas frecuentes]
 *     security: []
 *     description: Retorna una lista de todas las preguntas frecuentes almacenadas.
 *     responses:
 *       200:
 *         description: Lista de preguntas frecuentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   pregunta:
 *                     type: string
 *                   respuesta:
 *                     type: string
 */
router.get('/', getPreguntas);              // Obtener todas las preguntas

/**
 * @swagger
 * /api/preguntas/{id}:
 *   get:
 *     summary: Obtener una pregunta por ID
 *     tags: [preguntas frecuentes]
 *     security: []
 *     description: Retorna una pregunta específica según el ID proporcionado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la pregunta que se desea obtener
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pregunta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 pregunta:
 *                   type: string
 *                 respuesta:
 *                   type: string
 *       404:
 *         description: Pregunta no encontrada
 */
router.get('/:id', getPreguntaById);        // Obtener una pregunta por ID

router.use(verifyToken);

/**
 * @swagger
 * /api/preguntas:
 *   post:
 *     summary: Crear una nueva pregunta
 *     tags: [preguntas frecuentes]
 *     security:
 *       - bearerAuth: []
 *     description: Permite crear una nueva pregunta frecuente en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pregunta:
 *                 type: string
 *               respuesta:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pregunta creada exitosamente
 *       400:
 *         description: Error en los datos proporcionados
 */
router.post('/', authorize2(1 , 2) ,createPregunta);           // Crear una nueva pregunta

/**
 * @swagger
 * /api/preguntas/{id}:
 *   put:
 *     summary: Actualizar una pregunta
 *     tags: [preguntas frecuentes]
 *     security:
 *       - bearerAuth: []
 *     description: Permite actualizar una pregunta existente en el sistema.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la pregunta a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pregunta:
 *                 type: string
 *               respuesta:
 *                 type: string
 *     responses:
 *       200:
 *         description: Pregunta actualizada exitosamente
 *       404:
 *         description: Pregunta no encontrada
 */
router.put('/:id', authorize2(1,2) , updatePregunta);         // Actualizar una pregunta

/**
 * @swagger
 * /api/preguntas/{id}:
 *   delete:
 *     summary: Eliminar una pregunta
 *     tags: [preguntas frecuentes]
 *     security:
 *       - bearerAuth: []
 *     description: Permite eliminar una pregunta específica por ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la pregunta a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pregunta eliminada exitosamente
 *       404:
 *         description: Pregunta no encontrada
 */
router.delete('/:id', authorize2(1,2) , deletePregunta);      // Eliminar una pregunta

module.exports = router;

