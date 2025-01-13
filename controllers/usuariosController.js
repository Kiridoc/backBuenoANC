const userModel = require('../models/usuarioModel');

// Función para obtener todos los usuarios
const getUsers = async (req, res) => {
  try {
    const usuarios = await userModel.getAllUsers();
    res.json(usuarios);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Función para eliminar un usuario por ID
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await userModel.deleteUserById(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado', user: deletedUser });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

module.exports = { getUsers, deleteUser };
