const express = require('express');
const router = express.Router();

const { getShows, getShow, updateShow } = require('../controllers/showsController');
const { authorize, authorize2 } = require('../middleware/autorizacion');
const verifyToken = require('../middleware/verifyToken');

/** 
 * @swagger
 * tags:
 *  name: shows
 *  description: Gestión de shows
 */

/**
 * @swagger
 * /api/shows:
 *   get:
 *     summary: Obtener todos los shows
 *     tags: [shows]
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de shows
 */
router.get('/', getShows);

/**
 * @swagger
 * /api/shows/{id}:
 *   get:
 *     summary: Obtener un show por ID
 *     tags: [shows]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del show
 *     responses:
 *       200:
 *         description: Show encontrado
 *       404:
 *         description: Show no encontrado
 */
router.get('/:id', getShow);

router.use(verifyToken);

/**
 * @swagger
 * /api/shows/{id}:
 *   put:
 *     summary: Actualizar un show
 *     tags: [shows]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del show
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               is_disponible:
 *                 type: boolean
 *               horario_tipo:
 *                 type: string
 *               horario:
 *                 type: string
 *               ubicacion:
 *                 type: string
 *               costo:
 *                 type: number
 *               interaccion_niños:
 *                 type: string
 *               interaccion_adultos:
 *                 type: string
 *     responses:
 *       200:
 *         description: Show actualizado
 *       404:
 *         description: Show no encontrado
 */
router.put('/:id', authorize2(1, 2), updateShow);


module.exports = router;
