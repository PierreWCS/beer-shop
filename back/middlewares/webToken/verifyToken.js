const jwt = require('jsonwebtoken');

module.exports = async function verifyTheUserToken(req, res, next) {
  const userToken = req.headers.authorization || null;

  // Vérification du token
  await jwt.verify(userToken, process.env.SECRET_KEY, (err, token) => {
    // Si le token est pas bon
    if (err || !token) {
      return res.status(403).send({
        type: 'TOKEN',
        alert: {
          type: 'error',
          text: 'Forbidden'
        }
      });
    }
    // Si le token est valide
    req[token] = userToken;
    return next();
  });
};
