const Joi = require('joi');

/**
 * Esquema para validar la creación y actualización de eventos.
 */
const createAndUpdateEventoSchema = Joi.object({
  nombre_evento: Joi.string().trim().min(1).required().messages({
    'string.base': 'El nombre del evento debe ser una cadena de texto.',
    'string.empty': 'El nombre del evento no puede estar vacío.',
    'any.required': 'El nombre del evento es obligatorio.'
  }),
  titulo: Joi.string().trim().min(1).required().messages({
    'string.base': 'El título debe ser una cadena de texto.',
    'string.empty': 'El título no puede estar vacío.',
    'any.required': 'El título es obligatorio.'
  }),
  descripcion: Joi.string().trim().min(1).required().messages({
    'string.base': 'La descripción debe ser una cadena de texto.',
    'string.empty': 'La descripción no puede estar vacía.',
    'any.required': 'La descripción es obligatoria.'
  }),
  fecha: Joi.date().required().messages({
    'date.base': 'La fecha debe ser una fecha válida.',
    'any.required': 'La fecha es obligatoria.'
  }),
  imagen: Joi.string().uri().optional().messages({
    'string.uri': 'La imagen debe ser una URL válida (si se proporciona).'
  })
});

/**
 * Validación para crear o actualizar un evento.
 * @param {object} evento - Datos del evento.
 * @returns {Array} - Arreglo de errores, si los hay.
 */
const validateCreateUpdateEvento = (evento) => {
  const { error } = createAndUpdateEventoSchema.validate(evento);
  if (error) {
    return error.details.map(detail => detail.message);
  }
  return [];
};

module.exports = {
  validateCreateUpdateEvento,
};
