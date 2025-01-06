const express = require('express');
const router = express.Router();

const { getBuzones, getBuzonById, createBuzon, deleteBuzon } = require('../controllers/buzonController');

/** 
 * @swagger
 * tags:
 *  name: buzon-controller
 *  description: Gestión de buzones
 */

/**
 * @swagger
 * /api/buzon:
 *   get:
 *     summary: Obtener todos los buzones
 *     tags: [buzon-controller]
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
 * /api/buzon:
 *   post:
 *     summary: Crear un nuevo buzón
 *     tags: [buzon-controller]
 *     responses:
 *       201:
 *         description: Buzón creado
 */
/**
 * @swagger
 * /api/buzon/{id}:
 *   delete:
 *     summary: Eliminar un buzón
 *     tags: [buzon-controller]
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

router.get('/', getBuzones);
router.get('/:id', getBuzonById);
router.post('/', createBuzon);
router.delete('/:id', deleteBuzon);

module.exports = router;
