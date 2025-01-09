// utils/tokenService.js
const jwt = require('jsonwebtoken');

const generateTokens = (userId, role) => {
  const accessToken = jwt.sign(
    { userId, role: Number(role) },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  
  const refreshToken = jwt.sign(
    { userId, role: Number(role) },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '3d' }
  );
  
  return { accessToken, refreshToken };
};

module.exports = { generateTokens };