const bcrypt = require("bcrypt");
const User = require("../models/users.model.js");
const verifyPassword = require("../middlewares/formValidity/verifyPassword");
const noEmptyInputs = require("../middlewares/formValidity/noEmptyInputs");
const verifyPhoneNumber = require("../middlewares/formValidity/verifyPhoneNumber");
const regexValidity = require("../middlewares/formValidity/regexValidity");
const regexList = require("../utils/regexList");

exports.create = function createUser(request, response) {
  const {
    lastname,
    firstname,
    email,
    password,
    passwordVerification,
    phone,
    role,
  } = request.body;

  // Create user
  const user = new User({
    lastname: lastname || null,
    firstname: firstname || null,
    email: email || null,
    password: password || null,
    phone: phone || null,
    role: role || null,
  });

  // no empty inputs verification
  const emptyInputsErrorHandler = noEmptyInputs(user);
  if (emptyInputsErrorHandler) {
    return response.status(400).send(emptyInputsErrorHandler);
  }

  const { onlyLetters } = regexList;
  const invalidCharactersErrorHandler = regexValidity(
    { lastname, firstname },
    onlyLetters
  );

  if (invalidCharactersErrorHandler) {
    return response.status(400).send(invalidCharactersErrorHandler);
  }

  const { emailRegex } = regexList;
  const emailCharactersErrorHandler = regexValidity({ email }, emailRegex);
  if (emailCharactersErrorHandler) {
    return response.status(400).send(emailCharactersErrorHandler);
  }

  const phoneErrorHandler = verifyPhoneNumber(phone, 10);
  if (phoneErrorHandler) {
    return response.status(400).send(phoneErrorHandler);
  }

  // password verification
  const passwordErrorHandler = verifyPassword(password, 8, 12);
  if (passwordErrorHandler) {
    return response.status(400).send(passwordErrorHandler);
  }

  if (passwordVerification !== password) {
    return response.status(400).send({
      type: "INPUT",
      inputs: ["password_verification"],
      alert: {
        type: "error",
        text: "Passwords doesn't match",
      },
    });
  }

  user.password = bcrypt.hashSync(user.password, 10);

  return User.create(user, (error, data) => {
    if (error) {
      return response.status(500).send({
        message:
          error.message || "Some error occurred while creating the user.",
      });
    }
    return response.status(201).send({
      alert: {
        type: "success",
        text: "You are now registered",
      },
      data,
    });
  });
};

// Get all the users
exports.findAll = (request, response) => {
  User.findAll((error, data) => {
    if (error) {
      response.status(500).send({
        message: error.message || "Some error occurred while retrieving users.",
      });
    }
    return response.status(200).send(data);
  });
};

// Get user by ID
exports.findById = (request, response) => {
  User.findById(request.params.userId, (error, dbResult) => {
    if (error) {
      if (error.kind === "not_found") {
        response.status(404).send({
          message: `Not found user with id ${request.params.userId}.`,
        });
      } else {
        response.status(500).send({
          message: `Error retrieving user with id ${request.params.userId}`,
        });
      }
    }
    // Envoi de la réponse
    return response.status(200).send(dbResult);
  });
};

// Modify an user
exports.update = (request, response) => {
  User.update(request.params.userId, new User(request.body), (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        response.status(404).send({
          message: `Not found user with id ${request.params.userId}.`,
        });
      } else {
        response.status(500).send({
          message: `Error updating user with id ${request.params.userId}`,
        });
      }
    }

    return response.status(200).send(data);
  });
};

// Save token in DB
exports.newToken = function (request, response) {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const { userId } = request.params;
  const { token } = request.body;

  User.newToken(userId, token, (error) => {
    if (error) {
      if (error.kind === "not_found") {
        response.status(404).send({
          message: "Token can not be empty",
        });
      } else {
        response.status(500).send({
          message: "Error givin the token to the user " + userId,
        });
      }
    } else {
      response.send(token);
    }
  });
};

exports.verifyToken = function (request, response) {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const { userId } = request.params;
  const { token } = request.body;

  User.verifyToken(userId, (error, dbResult) => {
    if (error) {
      if (error.kind === "not_found") {
        response.status(404).send({
          message: "Token can not be empty",
        });
      } else {
        response.status(500).send({
          message: "Error finding the token to the user " + userId,
        });
      }
    } else {
      return dbResult.token === token;
    }
  });
};

// Delete an user
exports.delete = (request, response) => {
  User.delete(request.params.userId, (error) => {
    if (error) {
      if (error.kind === "not_found") {
        response.status(404).send({
          message: `Not found user with id ${request.params.userId}.`,
        });
      } else {
        response.status(500).send({
          message: `Could not delete user with id ${request.params.userId}`,
        });
      }
    }

    return response.send({ message: `user was deleted successfully!` });
  });
};
