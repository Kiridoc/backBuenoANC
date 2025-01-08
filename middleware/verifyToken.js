// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;  // Asegurarnos de que capturamos el rol del token
    console.log('Token decodificado:', decoded); // Para debugging
    console.log('Role asignado:', req.userRole); // Para debugging
    next();
  } catch (error) {
    console.error('Error de verificación:', error); // Para debugging
    res.status(403).json({ error: 'Token no válido' });
  }
};

module.exports = verifyToken;

