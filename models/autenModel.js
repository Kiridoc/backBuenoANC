// models/userModel.js
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

// Función para crear un nuevo usuario
const createUser = async (nombre, password, telefono, rol) => {
  const salt = await bcrypt.genSalt(10);  // Crear un "salt" para encriptar la contraseña
  const hashedPassword = await bcrypt.hash(password, salt);

  // Guardar el usuario en la base de datos
  const result = await pool.query(
    'INSERT INTO usuario (id, nombre, contrasena, telefono, is_asignado, rol) VALUES ( (SELECT COALESCE(MAX(id), 0) + 1 FROM public.usuario) , $1, $2, $3, false, $4) RETURNING *',
    [nombre, hashedPassword, telefono, rol]
  );

  return result.rows[0];  // Devuelve el usuario creado
};

// Función para obtener un usuario por nombre
const getUserByName = async (nombre) => {
  const result = await pool.query('SELECT * FROM usuario WHERE nombre = $1', [nombre]);
  return result.rows[0];  // Devuelve el usuario encontrado
};


module.exports = { createUser, getUserByName };

