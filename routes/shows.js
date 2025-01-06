const express = require('express');
const router = express.Router();

const { getShows, getShow, updateShow } = require('../controllers/showsController');

/** 
 * @swagger
 * tags:
 *  name: shows-controller
 *  description: Gestión de shows
 */

/**
 * @swagger
 * /api/shows:
 *   get:
 *     summary: Obtener todos los shows
 *     tags: [shows-controller]
 *     responses:
 *       200:
 *         description: Lista de shows
 */
/**
 * @swagger
 * /api/shows/{id}:
 *   get:
 *     summary: Obtener un show por ID
 *     tags: [shows-controller]
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
/**
 * @swagger
 * /api/shows/{id}:
 *   put:
 *     summary: Actualizar un show
 *     tags: [shows-controller]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del show
 *     responses:
 *       200:
 *         description: Show actualizado
 *       404:
 *         description: Show no encontrado
 */

router.get('/', getShows);
router.get('/:id', getShow);
router.put('/:id', updateShow);

module.exports = router;
