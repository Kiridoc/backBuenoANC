// controllers/eventosController.js
const { getAllEventos, getEventoById, insertEvento, updateEventoById, deleteEventoById, deleteAllEventos } = require('../models/eventoModel');

const getEventos = async (req, res) => {
  try {
    const eventos = await getAllEventos();
    res.json(eventos);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
};

const getEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const evento = await getEventoById(id);
    if (!evento) return res.status(404).json({ error: 'Evento no encontrado' });
    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el evento' });
  }
};

const createEvento = async (req, res) => {
  try {
    const { nombre_evento, titulo, descripcion, fecha, imagen } = req.body;
    if (!nombre_evento || !titulo || !descripcion || !fecha) {
      return res.status(400).json({ error: 'Todos los campos obligatorios deben ser completados' });
    }

    const nuevoEvento = await insertEvento({ nombre_evento, titulo, descripcion, fecha, imagen });
    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el evento' });
  }
};

const updateEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_evento, titulo, descripcion, fecha, imagen } = req.body;
    const eventoActualizado = await updateEventoById(id, { nombre_evento, titulo, descripcion, fecha, imagen });
    if (!eventoActualizado) return res.status(404).json({ error: 'Evento no encontrado' });
    res.json(eventoActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el evento' });
  }
};

const deleteEvento = async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await deleteEventoById(id);
    if (!resultado) return res.status(404).json({ error: 'Evento no encontrado' });
    res.json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el evento' });
  }
};

const deleteEventos = async (req, res) => {
  try {
    const resultado = await deleteAllEventos();
    if (!resultado) return res.status(404).json({ error: 'No se encontraron eventos para eliminar' });
    res.json({ message: 'Todos los eventos fueron eliminados correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar todos los eventos' });
  }
};

module.exports = {
  getEventos,
  getEvento,
  createEvento,
  updateEvento,
  deleteEvento,
  deleteEventos,
};
