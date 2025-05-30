const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, 'YOUR_SECRET', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}
function requireRole(role) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) return res.sendStatus(403);
    next();
  };
}
module.exports = { authenticateToken, requireRole };