// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const autenController = require('../controllers/autenController');
const { authorize, authorize2 } = require('../middleware/autorizacion');
const verifyToken = require('../middleware/verifyToken');

/** 
 * @swagger
 * tags:
 *  name: auten-controller
 *  description: Gestión de autenticación
 */

/**
 * @swagger
 * /api/auten/logueo:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [auten-controller]
 *     security: []
 *     description: Permite a un usuario registrado iniciar sesión y recibir un token JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *     responses:
 *       200:
 *         description: Logueo exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 token:
 *                   type: string
 *                   description: El token JWT generado
 *       404:
 *         description: Usuario no encontrado
 *       400:
 *         description: Contraseña incorrecta
 *       500:
 *         description: Error interno del servidor
 */
router.post('/logueo', autenController.loginUser);

// Autenticar todas las rutas primero router.
router.use(verifyToken);

/**
 * @swagger
 * /api/auten/usuarios:
 *   get:
 *     summary: Obtener lista de usuarios
 *     tags: [auten-controller]
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
router.get('/usuarios', authorize(1), autenController.getUsers);
/**
 * @swagger
 * /api/auten/registro:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [auten-controller]
 *     security:
 *       - bearerAuth: []
 *     description: Crea un nuevo usuario en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *               telefono:
 *                 type: string
 *                 description: Teléfono del usuario
 *               rol:
 *                 type: string
 *                 description: Rol del usuario (admin, cliente, etc.)
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: El usuario ya está registrado
 *       500:
 *         description: Error al registrar el usuario
 */
router.post('/registro', authorize(1),autenController.registerUser);

module.exports = router;

