const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Login = require('../models/login.model');
const regexValidity = require('../middlewares/formValidity/regexValidity');
const clearNullProperty = require('../utils/clearNullObjectProperty');
const regexList = require('../utils/regexList');

exports.connect = function userConnectToTheWebsite(request, response) {
  const { email, password } = request.body;

  // Schéma d'erreur
  const errorScheme = {
    text: 'Email ou mot de passe incorrect',
    errorTarget: 'INPUT',
    alertType: 'error',
    inputs: ['email', 'password']
  };

  // Fonction créant une erreur avec status et infos variables
  const sendResponse = function responseSchemeForSending(
    status,
    { text = null, errorTarget = null, alertType, data = null, inputs = null }
  ) {
    return response.status(status).send(
      clearNullProperty({
        alert: {
          type: alertType,
          text
        },
        status,
        type: errorTarget,
        data,
        inputs
      })
    );
  };

  // Verification que des entrées n'ont que des lettres
  const { emailRegex } = regexList;
  const emailCharactersErrorHandler = regexValidity({ email }, emailRegex);
  if (emailCharactersErrorHandler) {
    return sendResponse(400, errorScheme);
  }

  return Login.connect(email, (err, data) => {
    // Decryptage du mot de passe en base de données et verification d'une correspondance avec celui que l'utilisateur a rentrer
    const samePassword = bcrypt.compareSync(password, data.password);
    if (!samePassword) return sendResponse(400, errorScheme);

    if (err) {
      const { status } = err.status;
      return sendResponse(status, errorScheme);
    }

    // Génération du jsonWebToken
    const token = jwt.sign({ data }, `${process.env.SECRET_KEY}`);

    return sendResponse(200, {
      text: 'Vous êtes connecté.',
      data,
      token,
      alertType: 'success'
    });
  });
};
