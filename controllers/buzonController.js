// controllers/buzonController.js
const { getAllBuzones, getBuzon, insertBuzon, deleteBuzonById } = require('../models/buzonModel');
const { validateCreateBuzon, validateId } = require('../validations/buzonValidation');

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

    // Validar ID
    const idError = validateId(id);
    if (idError) {
      return res.status(400).json({ error: idError });
    }

    const buzon = await getBuzon(id);
    if (!buzon) {
      return res.status(404).json({ error: `Buzón con ID ${id} no encontrado` });
    }
    res.json(buzon);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el buzón' });
  }
};

const createBuzon = async (req, res) => {
  try {
    const { pregunta, correo } = req.body;

    // Validar los datos
    const errors = validateCreateBuzon(pregunta, correo);
    if (errors.length > 0) {
      return res.status(400).json({ error: errors.join(', ') });
    }

    // Inserción en la base de datos
    const nuevoBuzon = await insertBuzon({ pregunta, correo });
    res.status(201).json({
      id: nuevoBuzon.id,
      pregunta: nuevoBuzon.pregunta,
      correo: nuevoBuzon.correo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el buzón' });
  }
};

const deleteBuzon = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar ID
    const idError = validateId(id);
    if (idError) {
      return res.status(400).json({ error: idError });
    }

    const resultado = await deleteBuzonById(id);
    if (!resultado) {
      return res.status(404).json({ error: `Buzón con ID ${id} no encontrado` });
    }
    res.json({ message: 'Buzón eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el buzón' });
  }
};

module.exports = {
  getBuzones,
  getBuzonById,
  createBuzon,
  deleteBuzon,
};
