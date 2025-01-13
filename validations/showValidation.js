// validators/showValidation.js
const Joi = require('joi');

// Definir el esquema de validación para los shows
const showSchema = Joi.object({
  nombre: Joi.string().min(3).max(100).required().messages({
    'string.base': 'El nombre debe ser una cadena de texto',
    'string.empty': 'El nombre no puede estar vacío',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'string.max': 'El nombre no puede tener más de 100 caracteres',
    'any.required': 'El nombre es obligatorio'
  }),
  is_disponible: Joi.boolean().optional().default(true).messages({
    'boolean.base': 'El campo "is_disponible" debe ser un valor booleano'
  }),
  horario_tipo: Joi.string().valid().optional().messages({
    'string.base': 'El tipo de horario debe ser una cadena de texto'
  }),
  horario: Joi.string().required().messages({
    'string.base': 'El horario debe ser una cadena de texto',
    'string.empty': 'El horario no puede estar vacío',
    'string.pattern.base': 'El horario debe tener el formato HH:MM',
    'any.required': 'El horario es obligatorio'
  }),
  ubicacion: Joi.string().min(3).max(255).required().messages({
    'string.base': 'La ubicación debe ser una cadena de texto',
    'string.empty': 'La ubicación no puede estar vacía',
    'string.min': 'La ubicación debe tener al menos 3 caracteres',
    'string.max': 'La ubicación no puede tener más de 255 caracteres',
    'any.required': 'La ubicación es obligatoria'
  }),
  costo: Joi.required().messages({
    'string.base': 'El costo debe ser una cadena de texto',
    'any.required': 'El costo es obligatorio'
  }),
  interaccion_niños: Joi.required().optional().messages({
    'string.base': 'El costo de "interaccion_niños" debe ser una cadena de texto',
    'any.required': 'El costo es obligatorio'
  }),
  interaccion_adultos: Joi.required().optional().messages({
    'string.base': 'El costo de "interaccion_adultos" debe ser un una cadena de texto',
    'any.required': 'El costo es obligatorio'
  })
});

// Función para validar los datos de un show
const validateShow = (data) => {
  return showSchema.validate(data, { abortEarly: false });
};

module.exports = { validateShow };
