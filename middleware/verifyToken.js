// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;  // Almacena el ID del usuario en la solicitud
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token no válido' });
  }
};

module.exports = verifyToken;
