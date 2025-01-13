// validations/preguntaValidation.js
const Joi = require('joi');

// Esquema de validación para la creación y actualización de preguntas
const preguntaSchema = Joi.object({
  pregunta: Joi.string()
    .min(10)
    .required()
    .messages({
      'string.base': 'La pregunta debe ser un texto',
      'string.empty': 'La pregunta es obligatoria',
      'string.min': 'La pregunta debe tener al menos 10 caracteres',
      'any.required': 'La pregunta es obligatoria',
    }),
  respuesta: Joi.string()
    .min(5)
    .required()
    .messages({
      'string.base': 'La respuesta debe ser un texto',
      'string.empty': 'La respuesta es obligatoria',
      'string.min': 'La respuesta debe tener al menos 5 caracteres',
      'any.required': 'La respuesta es obligatoria',
    }),
});

// Esquema de validación para el ID en los parámetros
const idSchema = Joi.object({
  id: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'El ID debe ser un número',
      'number.integer': 'El ID debe ser un número entero',
      'number.min': 'El ID debe ser mayor que 0',
      'any.required': 'El ID es obligatorio',
    }),
});

module.exports = {
  preguntaSchema,
  idSchema
};
