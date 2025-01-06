// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
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
router.post('/register', authController.registerUser);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
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
 *         description: Login exitoso
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
router.post('/login', authController.loginUser);

module.exports = router;

