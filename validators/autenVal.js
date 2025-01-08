const { body } = require('express-validator');

const registerUserValidator = [
  body('nombre').isString().notEmpty(),
  body('password').isString().isLength({ min: 4 }),
  body('telefono').isString().notEmpty(),
  body('rol').isIn(['admin', 'user'])
];

const loginUserValidator = [
  body('nombre').isString().notEmpty(),
  body('password').isString().notEmpty()
];

module.exports = { registerUserValidator, loginUserValidator };

