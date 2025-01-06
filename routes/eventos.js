const express = require('express');
const router = express.Router();

const { getEventos, getEvento, createEvento, updateEvento, deleteEvento, deleteEventos } = require('../controllers/eventosController');


/** 
 * @swagger
 * tags:
 *  name: eventos-controller
 *  description: Gestión de eventos
 */

/**
 * @swagger
 * /api/eventos:
 *   get:
 *     summary: Obtener todos los eventos
 *     tags: [eventos-controller]
 *     responses:
 *       200:
 *         description: Lista de eventos
 */
/**
 * @swagger
 * /api/eventos/{id}:
 *   get:
 *     summary: Obtener un evento por ID
 *     tags: [eventos-controller]
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
/**
 * @swagger
 * /api/eventos:
 *   post:
 *     summary: Crear un nuevo evento
 *     tags: [eventos-controller]
 *     responses:
 *       201:
 *         description: Evento creado
 */
/**
 * @swagger
 * /api/eventos/{id}:
 *   put:
 *     summary: Actualizar un evento
 *     tags: [eventos-controller]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del evento
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
 *     tags: [eventos-controller]
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
 *     tags: [eventos-controller]
 *     responses:
 *       200:
 *         description: Todos los eventos eliminados
 */

router.get('/', getEventos);              
router.get('/:id', getEvento);        
router.post('/', createEvento);           
router.put('/:id', updateEvento);         
router.delete('/:id', deleteEvento);      
router.delete('/', deleteEventos);       

module.exports = router;
