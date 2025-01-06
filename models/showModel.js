// models/showModel.js
const pool = require('../config/db');

const getAllShows = async () => {
  const { rows } = await pool.query('SELECT * FROM show');
  return rows;
};

const getShowById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM show WHERE id = $1', [id]);
  return rows[0];
};

const updateShowById = async (id, { nombre, is_disponible, horario_tipo, horario, ubicacion, costo, interaccion_niños, interaccion_adultos }) => {
  const { rows } = await pool.query(
    'UPDATE show SET nombre = $1, is_disponible = $2, horario_tipo = $3, horario = $4, ubicacion = $5, costo = $6, interaccion_niños = $7, interaccion_adultos = $8 WHERE id = $9 RETURNING *',
    [nombre, is_disponible, horario_tipo, horario, ubicacion, costo, interaccion_niños, interaccion_adultos, id]
  );
  return rows[0];
};

module.exports = {
  getAllShows,
  getShowById,
  updateShowById,
};