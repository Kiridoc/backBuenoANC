const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const { authorize } = require('../middleware/autorizacion');
const verifyToken = require('../middleware/verifyToken');

/** 
 * @swagger
 * tags:
 *  name: usuarios
 *  description: Gestión de autenticación
 */

// Middleware de autenticación para las rutas siguientes
router.use(verifyToken);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener lista de usuarios
 *     tags: [usuarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso prohibido
 */
router.get('/', authorize(1), usuariosController.getUsers);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [usuarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Acceso prohibido
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', authorize(1), usuariosController.deleteUser);

module.exports = router;
