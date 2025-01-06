// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/usuarioModel');

// Función para registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { nombre, password, telefono, rol } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await userModel.getUserByName(nombre);
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya está registrado' });
    }

    // Crear el nuevo usuario
    const newUser = await userModel.createUser(nombre, password, telefono, rol);
    
    // Generar un token JWT para el nuevo usuario
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Usuario registrado', token });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Función para login de un usuario
const loginUser = async (req, res) => {
  const { nombre, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await userModel.getUserByName(nombre);
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Comparar la contraseña con la almacenada (bcrypt)
    const isMatch = await bcrypt.compare(password, user.contrasena);
    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Generar un token JWT para el usuario
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Inicio de sesión exitoso', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el inicio de sesión' });
  }
};

module.exports = { registerUser, loginUser };
