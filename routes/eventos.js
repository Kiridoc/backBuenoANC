const express = require('express');
const router = express.Router();

const { getEventos, getEvento, createEvento, updateEvento, deleteEvento, deleteEventos } = require('../controllers/eventosController');
const { authorize, authorize2 } = require('../middleware/autorizacion');
const verifyToken = require('../middleware/verifyToken')

/** 
 * @swagger
 * tags:
 *  name: eventos
 *  description: Gestión de eventos
 */

/**
 * @swagger
 * /api/eventos:
 *   get:
 *     summary: Obtener todos los eventos
 *     tags: [eventos]
 *     security: []
 *     responses:
 *       200:
 *         description: Lista de eventos
 */
/**
 * @swagger
 * /api/eventos/{id}:
 *   get:
 *     summary: Obtener un evento por ID
 *     tags: [eventos]
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento no encontrado
 */

router.use(verifyToken);

/**
 * @swagger
 * /api/eventos:
 *   post:
 *     summary: Crear un nuevo evento
 *     tags: [eventos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_evento:
 *                 type: string
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date-time
 *               imagen:
 *                 type: string
 *     responses:
 *       201:
 *         description: Evento creado
 */
/**
 * @swagger
 * /api/eventos/{id}:
 *   put:
 *     summary: Actualizar un evento
 *     tags: [eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del evento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre_evento:
 *                 type: string
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha:
 *                 type: string
 *                 format: date-time
 *               imagen:
 *                 type: string
 *     responses:
 *       200:
 *         description: Evento actualizado
 *       404:
 *         description: Evento no encontrado
 */

/**
 * @swagger
 * /api/eventos/{id}:
 *   delete:
 *     summary: Eliminar un evento
 *     tags: [eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Evento eliminado
 *       404:
 *         description: Evento no encontrado
 */
/**
 * @swagger
 * /api/eventos:
 *   delete:
 *     summary: Eliminar todos los eventos
 *     tags: [eventos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Todos los eventos eliminados
 */

router.get('/', getEventos);              
router.get('/:id', getEvento);        
router.post('/', authorize2(1, 2) , createEvento);           
router.put('/:id', authorize2(1, 2), updateEvento);         
router.delete('/:id', authorize2(1, 2), deleteEvento);      
router.delete('/', authorize2(1, 2), deleteEventos);       

module.exports = router;
