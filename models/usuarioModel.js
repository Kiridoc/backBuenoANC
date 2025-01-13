// models/usuarioModel.js
const pool = require('../config/db');

//Función para obtener todos los usuarios
const getAllUsers = async () => {
    const { rows } = await pool.query('SELECT * FROM usuario');
    return rows;
};

// Función para eliminar un usuario por ID 
const deleteUserById = async (id) => { 
    const result = await pool.query('DELETE FROM usuario WHERE id = $1 RETURNING *', [id]); 
    return result.rows[0]; // Devuelve el usuario eliminado
};

  module.exports = { getAllUsers, deleteUserById };