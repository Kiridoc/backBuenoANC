// controllers/pecesController.js
const { getAllPreguntas, getPregunta, insertPregunta, updatePreguntaById, deletePreguntaById } = require('../models/preguntaModel');

const getPreguntas = async (req, res) => {
  try {
    const preguntas = await getAllPreguntas();
    res.json(preguntas);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al obtener las preguntas' });
  }
};

const getPreguntaById = async (req, res) => {
  try {
    const { id } = req.params;
    const pregunta = await getPregunta(id);
    if (!pregunta) return res.status(404).json({ error: 'Pregunta no encontrada' });
    res.json(pregunta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la pregunta' });
  }
};

const createPregunta = async (req, res) => {
    try {
      const { pregunta, respuesta } = req.body;
      if (!pregunta || !respuesta) {
        return res.status(400).json({ error: 'La pregunta y la respuesta son obligatorias' });
      }
  
      const nuevaPregunta = await insertPregunta({ pregunta, respuesta });
      res.status(201).json(nuevaPregunta);
    } catch (error) {
      console.error(error);  // Log para depuración
      res.status(500).json({ error: 'Error al crear la pregunta', details: error.message });
    }
  };
  

const updatePregunta = async (req, res) => {
  try {
    const { id } = req.params;
    const { pregunta, respuesta } = req.body;
    const preguntaActualizada = await updatePreguntaById(id, { pregunta, respuesta });
    if (!preguntaActualizada) return res.status(404).json({ error: 'Pregunta no encontrada' });
    res.json(preguntaActualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la pregunta' });
  }
};

const deletePregunta = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await deletePreguntaById(id);
    if (!resultado) return res.status(404).json({ error: 'Pregunta no encontrada' });
    res.json({ message: 'Pregunta eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la pregunta' });
  }
};

module.exports = {
  getPreguntas,
  getPreguntaById,
  createPregunta,
  updatePregunta,
  deletePregunta,
};
