// controllers/pecesController.js
const { getAllPreguntas, getPregunta, insertPregunta, updatePreguntaById, deletePreguntaById } = require('../models/preguntaModel');
const { preguntaSchema, idSchema } = require('../validations/preguntaValidation');

// Validación para obtener todas las preguntas
const getPreguntas = async (req, res) => {
  try {
    const preguntas = await getAllPreguntas();
    res.json(preguntas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener las preguntas' });
  }
};

// Validación para obtener una pregunta por ID
const getPreguntaById = async (req, res) => {
  const { error } = idSchema.validate(req.params);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const { id } = req.params;
    const pregunta = await getPregunta(id);
    if (!pregunta) return res.status(404).json({ error: 'Pregunta no encontrada' });
    res.json(pregunta);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la pregunta' });
  }
};

// Validación para crear una nueva pregunta
const createPregunta = async (req, res) => {
  const { error } = preguntaSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const { pregunta, respuesta } = req.body;
    const nuevaPregunta = await insertPregunta({ pregunta, respuesta });
    res.status(201).json(nuevaPregunta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la pregunta', details: error.message });
  }
};

// Validación para actualizar una pregunta
const updatePregunta = async (req, res) => {
  const { error: paramError } = idSchema.validate(req.params);
  if (paramError) return res.status(400).json({ error: paramError.details[0].message });

  const { error: bodyError } = preguntaSchema.validate(req.body);
  if (bodyError) return res.status(400).json({ error: bodyError.details[0].message });

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

// Validación para eliminar una pregunta
const deletePregunta = async (req, res) => {
  const { error } = idSchema.validate(req.params);
  if (error) return res.status(400).json({ error: error.details[0].message });

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
  deletePregunta
};
