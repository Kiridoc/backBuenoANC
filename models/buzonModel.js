// models/`buzonModel`.js
const pool = require('../config/db');

const getAllBuzones = async () => {
  const { rows } = await pool.query('SELECT * FROM buzon');
  return rows;
};

const getBuzon = async (id) => {
  const { rows } = await pool.query('SELECT * FROM buzon WHERE id = $1', [id]);
  return rows[0];
};

const insertBuzon = async ({ pregunta, correo }) => {
  const { rows } = await pool.query(
    'INSERT INTO buzon (pregunta, correo) VALUES ($1, $2) RETURNING *',
    [pregunta, correo]
  );
  return rows[0];
};

const deleteBuzonById = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM buzon WHERE id = $1', [id]);
  return rowCount > 0;
};

module.exports = {
  getAllBuzones,
  getBuzon,
  insertBuzon,
  deleteBuzonById,
};