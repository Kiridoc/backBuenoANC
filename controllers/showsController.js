// controllers/showsController.js
const { getAllShows, getShowById, updateShowById } = require('../models/showModel');

const getShows = async (req, res) => {
  try {
    const shows = await getAllShows();
    res.json(shows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los shows' });
  }
};

const getShow = async (req, res) => {
  try {
    const { id } = req.params;
    const show = await getShowById(id);
    if (!show) return res.status(404).json({ error: 'Show no encontrado' });
    res.json(show);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el show' });
  }
};

const updateShow = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, is_disponible, horario_tipo, horario, ubicacion, costo, interaccion_niños, interaccion_adultos } = req.body;
    const showActualizado = await updateShowById(id, { nombre, is_disponible, horario_tipo, horario, ubicacion, costo, interaccion_niños, interaccion_adultos });
    if (!showActualizado) return res.status(404).json({ error: 'Show no encontrado' });
    res.json(showActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el show' });
  }
};

module.exports = {
  getShows,
  getShow,
  updateShow,
};