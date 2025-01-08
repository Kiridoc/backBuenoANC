const express = require('express');
const router = express.Router();

const { getBuzones, getBuzonById, createBuzon, deleteBuzon } = require('../controllers/buzonController');
const { authorize, authorize2 } = require('../middleware/autorizacion');
const verifyToken = require('../middleware/verifyToken');

/** 
 * @swagger
 * tags:
 *  name: buzon-controller
 *  description: Gestión de buzones
 */

/**
 * @swagger
 * /api/buzon:
 *   post:
 *     summary: Crear una nueva pregunta para el buzón
 *     tags: [buzon-controller]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pregunta:
 *                 type: string
 *               correo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Pregunta creada
 *       400:
 *         description: Error en la creación de la pregunta
 */
router.post('/', createBuzon);

router.use(verifyToken);

/**
 * @swagger
 * /api/buzon:
 *   get:
 *     summary: Obtener todos los buzones
 *     tags: [buzon-controller]
 *     security:
 *       - bearerAuth: []
 *     description: Permite crear una nueva pegunta para el buzón.
 *     responses:
 *       200:
 *         description: Lista de buzones
 */

/**
 * @swagger
 * /api/buzon/{id}:
 *   get:
 *     summary: Obtener un buzón por ID
 *     tags: [buzon-controller]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del buzón
 *     responses:
 *       200:
 *         description: Buzón encontrado
 *       404:
 *         description: Buzón no encontrado
 */

/**
 * @swagger
 * /api/buzon/{id}:
 *   delete:
 *     summary: Eliminar un buzón
 *     tags: [buzon-controller]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del buzón
 *     responses:
 *       200:
 *         description: Buzón eliminado
 *       404:
 *         description: Buzón no encontrado
 */

router.get('/', authorize2(1, 2), getBuzones);
router.get('/:id', authorize2(1, 2), getBuzonById);
router.delete('/:id', authorize2(1, 2), deleteBuzon);

module.exports = router;
