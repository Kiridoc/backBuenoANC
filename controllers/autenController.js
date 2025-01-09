const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/usuarioModel');
const { generateTokens } = require('../utils/tokenService');
const { validateRegisterUser, validateLoginUser } = require('../validations/autenValidation');

// Función para obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const usuarios = await userModel.getAllUsers();
    res.json(usuarios);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Función para registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { nombre, password, telefono, rol } = req.body;

  // Validar los datos del registro
  const { error } = validateRegisterUser({ nombre, password, telefono, rol });

  if (error) {
    return res.status(400).json({
      error: 'Errores en la validación de los datos',
      details: error.details.map(err => err.message)
    });
  }

  try {
    const existingUser = await userModel.getUserByName(nombre);
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya está registrado' });
    }

    const newUser = await userModel.createUser(nombre, password, telefono, rol);

    const tokens = generateTokens(newUser.id, newUser.rol);

    res.status(201).json({ 
      message: 'Usuario registrado', 
      ...tokens 
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Función para login de un usuario
const loginUser = async (req, res) => {
  const { nombre, password } = req.body;

  // Validar los datos de login
  const { error } = validateLoginUser({ nombre, password });

  if (error) {
    return res.status(400).json({
      error: 'Errores en la validación de los datos',
      details: error.details.map(err => err.message)
    });
  }

  try {
    const user = await userModel.getUserByName(nombre);
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.contrasena);
    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    console.log('Usuario encontrado:', { id: user.id, rol: user.rol });

    const tokens = generateTokens(user.id, user.rol);

    res.status(200).json({ 
      message: 'Inicio de sesión exitoso',
      ...tokens,
      role: user.rol,
      userId: user.id
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
};

// Nuevo método para refresh tokens
const refreshTokens = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ error: 'Refresh token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const tokens = generateTokens(decoded.userId, decoded.role);
    
    res.json(tokens);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Refresh token expirado. Por favor, inicie sesión nuevamente.' 
      });
    }
    res.status(403).json({ error: 'Refresh token no válido' });
  }
};

module.exports = { registerUser, loginUser, getUsers, refreshTokens };
