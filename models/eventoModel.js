// models/eventoModel.js
const pool = require('../config/db');

const getAllEventos = async () => {
  const { rows } = await pool.query('SELECT * FROM evento');
  return rows;
};

const getEventoById = async (id) => {
  const { rows } = await pool.query('SELECT * FROM evento WHERE id = $1', [id]);
  return rows[0];
};

const insertEvento = async ({ nombre_evento, titulo, descripcion, fecha, imagen }) => {
  const { rows } = await pool.query(
    'INSERT INTO evento (nombre_evento, titulo, descripcion, fecha, imagen) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [nombre_evento, titulo, descripcion, fecha, imagen]
  );
  return rows[0];
};

const updateEventoById = async (id, { nombre_evento, titulo, descripcion, fecha, imagen }) => {
  const { rows } = await pool.query(
    'UPDATE evento SET nombre_evento = $1, titulo = $2, descripcion = $3, fecha = $4, imagen = $5 WHERE id = $6 RETURNING *',
    [nombre_evento, titulo, descripcion, fecha, imagen, id]
  );
  return rows[0];
};

const deleteEventoById = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM evento WHERE id = $1', [id]);
  return rowCount > 0;
};

const deleteAllEventos = async () => {
  const { rowCount } = await pool.query('DELETE FROM evento');
  return rowCount > 0;
};

module.exports = {
  getAllEventos,
  getEventoById,
  insertEvento,
  updateEventoById,
  deleteEventoById,
  deleteAllEventos,
};