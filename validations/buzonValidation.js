const Joi = require('joi');

/**
 * Esquema para validar la creación de un buzón (pregunta y correo).
 */
const createBuzonSchema = Joi.object({
  pregunta: Joi.string().trim().min(1).required().messages({
    'string.base': 'La pregunta debe ser una cadena de texto.',
    'string.empty': 'La pregunta no puede estar vacía.',
    'any.required': 'La pregunta es obligatoria.'
  }),
  correo: Joi.string().email().required().messages({
    'string.base': 'El correo debe ser una cadena de texto.',
    'string.empty': 'El correo no puede estar vacío.',
    'string.email': 'El correo debe ser un correo electrónico válido.',
    'any.required': 'El correo es obligatorio.'
  })
});

/**
 * Esquema para validar el ID de un buzón (ID debe ser numérico).
 */
const idBuzonSchema = Joi.string().pattern(/^[0-9]+$/).required().messages({
  'string.base': 'El ID debe ser una cadena de texto.',
  'string.empty': 'El ID no puede estar vacío.',
  'string.pattern.base': 'El ID debe ser un número válido.',
  'any.required': 'El ID es obligatorio.'
});

/**
 * Validación para crear un buzón.
 * @param {string} pregunta - Pregunta en el buzón.
 * @param {string} correo - Correo al que se enviará la respuesta.
 * @returns {Array} - Arreglo de errores, si los hay.
 */
const validateCreateBuzon = (pregunta, correo) => {
  const { error } = createBuzonSchema.validate({ pregunta, correo });
  if (error) {
    return error.details.map(detail => detail.message);
  }
  return [];
};

/**
 * Validación para verificar que el ID es válido.
 * @param {string} id - El ID del buzón.
 * @returns {string|null} - El error si hay uno, o null si es válido.
 */
const validateId = (id) => {
  const { error } = idBuzonSchema.validate(id);
  if (error) {
    return error.details[0].message;
  }
  return null;
};

module.exports = {
  validateCreateBuzon,
  validateId,
};
