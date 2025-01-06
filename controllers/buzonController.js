// controllers/buzonController.js
const { getAllBuzones, getBuzon, insertBuzon, deleteBuzonById } = require('../models/buzonModel');

const getBuzones = async (req, res) => {
  try {
    const buzones = await getAllBuzones();
    res.json(buzones);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener los buzones' });
  }
};

const getBuzonById = async (req, res) => {
  try {
    const { id } = req.params;
    const buzon = await getBuzon(id);
    if (!buzon) return res.status(404).json({ error: 'Buzon no encontrado' });
    res.json(buzon);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el buzon' });
  }
};

const createBuzon = async (req, res) => {
  try {
    const { pregunta, correo } = req.body;
    if (!pregunta || !correo) {
      return res.status(400).json({ error: 'La pregunta y el correo son obligatorios' });
    }

    const nuevoBuzon = await insertBuzon({ pregunta, correo });
    res.status(201).json(nuevoBuzon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el buzon' });
  }
};

const deleteBuzon = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await deleteBuzonById(id);
    if (!resultado) return res.status(404).json({ error: 'Buzon no encontrado' });
    res.json({ message: 'Buzon eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el buzon' });
  }
};

module.exports = {
  getBuzones,
  getBuzonById,
  createBuzon,
  deleteBuzon,
};