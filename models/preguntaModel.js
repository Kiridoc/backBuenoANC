// models/`preguntaModel`.js
const pool = require('../config/db');

const getAllPreguntas = async () => {
  const { rows } = await pool.query('SELECT * FROM pregunta_frecuente');
  return rows;
};

const getPregunta = async (id) => {
  const { rows } = await pool.query('SELECT * FROM pregunta_frecuente WHERE id = $1', [id]);
  return rows[0];
};

const insertPregunta = async ({ id, pregunta, respuesta }) => {
  const { rows } = await pool.query(
    'INSERT INTO pregunta_frecuente (id, pregunta, respuesta) VALUES ( (SELECT COALESCE(MAX(id), 0) + 1 FROM public.pregunta_frecuente) ,$1, $2) RETURNING *',
    [pregunta, respuesta]
  );
  return rows[0];
};

const updatePreguntaById = async (id, { pregunta, respuesta }) => {
  const { rows } = await pool.query(
    'UPDATE pregunta_frecuente SET pregunta = $1, respuesta = $2 WHERE id = $3 RETURNING *',
    [pregunta, respuesta, id]
  );
  return rows[0];
};

const deletePreguntaById = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM pregunta_frecuente WHERE id = $1', [id]);
  return rowCount > 0;
};

module.exports = {
  getAllPreguntas,
  getPregunta,
  insertPregunta,
  updatePreguntaById,
  deletePreguntaById,
};
