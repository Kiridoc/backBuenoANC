// validators/userValidation.js
const Joi = require('joi');

// Validación de datos para registrar un usuario
const registerUserSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).required().messages({
    'string.base': 'El nombre debe ser una cadena de texto',
    'string.empty': 'El nombre no puede estar vacío',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'string.max': 'El nombre no puede tener más de 50 caracteres',
    'any.required': 'El nombre es obligatorio'
  }),
  password: Joi.string().min(4).required().messages({
    'string.base': 'La contraseña debe ser una cadena de texto',
    'string.empty': 'La contraseña no puede estar vacía',
    'string.min': 'La contraseña debe tener al menos 4 caracteres',
    'any.required': 'La contraseña es obligatoria'
  }),
  telefono: Joi.string().pattern(/^\d{8}$/, 'telefono').optional().messages({
    'string.base': 'El teléfono debe ser una cadena de texto',
    'string.pattern.base': 'El teléfono debe tener 8 dígitos',
  }),
  rol: Joi.string().valid('admin', 'user').optional().default('user').messages({
    'string.base': 'El rol debe ser una cadena de texto',
    'any.only': 'El rol debe ser "admin" o "user"',
  })
});

// Validación de datos para login de usuario
const loginUserSchema = Joi.object({
  nombre: Joi.string().min(3).max(50).required().messages({
    'string.base': 'El nombre debe ser una cadena de texto',
    'string.empty': 'El nombre no puede estar vacío',
    'string.min': 'El nombre debe tener al menos 3 caracteres',
    'string.max': 'El nombre no puede tener más de 50 caracteres',
    'any.required': 'El nombre es obligatorio'
  }),
  password: Joi.string().min(4).required().messages({
    'string.base': 'La contraseña debe ser una cadena de texto',
    'string.empty': 'La contraseña no puede estar vacía',
    'string.min': 'La contraseña debe tener al menos 4 caracteres',
    'any.required': 'La contraseña es obligatoria'
  })
});

// Función para validar el registro de usuario
const validateRegisterUser = (data) => {
  return registerUserSchema.validate(data, { abortEarly: false });
};

// Función para validar el login de usuario
const validateLoginUser = (data) => {
  return loginUserSchema.validate(data, { abortEarly: false });
};

module.exports = { validateRegisterUser, validateLoginUser };
