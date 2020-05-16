const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Login = require("../models/login.model");
const User = require("../models/users.model");
const regexValidity = require("../middlewares/formValidity/regexValidity");
const clearNullProperty = require("../utils/clearNullObjectProperty");
const regexList = require("../utils/regexList");

exports.connect = function userConnectToTheWebsite(request, response) {
  const { email, password } = request.body;

  // Error scheme
  const errorScheme = {
    text: "Your email or your password is wrong",
    errorTarget: "INPUT",
    alertType: "error",
    inputs: ["email", "password"]
  };

  // Creating an error and status
  const sendResponse = function responseSchemeForSending(
    status,
    {
      text = null,
      errorTarget = null,
      alertType,
      data = null,
      inputs = null,
      token
    }
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
        inputs,
        token
      })
    );
  };

  // Entries has only letters
  const { emailRegex } = regexList;
  const emailCharactersErrorHandler = regexValidity({ email }, emailRegex);
  if (emailCharactersErrorHandler) {
    return sendResponse(400, errorScheme);
  }

  return Login.connect(email, (err, data) => {
    if (err) {
      return sendResponse(400, errorScheme);
    } else {
      const samePassword = bcrypt.compareSync(password, data.password);
      if (!samePassword) return sendResponse(400, errorScheme);

      console.log("Token content:", data);

      // JWT generation
      const token = jwt.sign({ data }, `${process.env.SECRET_KEY}`);

      // Store the token in DB
      User.newToken(data.id, token, result => {
        // console.log(result);
      });

      return sendResponse(200, {
        text: "You are connected.",
        data,
        token: token,
        alertType: "success"
      });
    }
  });
};
