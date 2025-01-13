// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const autenController = require('../controllers/autenController');
const { authorize, authorize2 } = require('../middleware/autorizacion');
const verifyToken = require('../middleware/verifyToken');

/** 
 * @swagger
 * tags:
 *  name: autenticación
 *  description: Gestión de autenticación
 */

/**
 * @swagger
 * /api/auten/logueo:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [autenticación]
 *     security: []
 *     description: Permite a un usuario registrado iniciar sesión y recibir tokens JWT.
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
 *                 accessToken:
 *                   type: string
 *                   description: Token JWT de acceso (1 hora)
 *                 refreshToken:
 *                   type: string
 *                   description: Token JWT de actualización (7 días)
 *                 role:
 *                   type: number
 *                   description: Rol del usuario
 *                 userId:
 *                   type: string
 *                   description: ID del usuario
 */
router.post('/logueo', autenController.loginUser);

/**
 * @swagger
 * /api/auten/refresh-token:
 *   post:
 *     summary: Renovar tokens
 *     tags: [autenticación]
 *     security: []
 *     description: Usa un refresh token para obtener nuevos tokens de acceso y actualización
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Token de actualización actual
 *     responses:
 *       200:
 *         description: Tokens renovados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 */
router.post('/refresh-token', autenController.refreshTokens);

// Middleware de autenticación para las rutas siguientes
router.use(verifyToken);

/**
 * @swagger
 * /api/auten/registro:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [autenticación]
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

