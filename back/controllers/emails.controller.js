const Email = require('../models/emails.model');

// Create a new mail
exports.create = (request, response) => {
  if (!request.body) {
    return response.status(400).send({
      message: 'Content can not be empty!'
    })
  }

  // Create a mail
  console.log(request.body);
  const message = new Email({
    id: request.body.id,
    mail: request.body.mail || null,
  });

  // Save mail in database
  Email.create(message, (error, data) => {
    if (error) {
      return response.status(500).send({
        message: error.message || 'Some error occured while creating the email.'
      });
    } else {
      return response.send(data);
    }
  });
};

// Get all mails
exports.findAll = (request, response) => {
  Email.findAll((error, dbResult) => {
    if (error) {
      response.status(500).send({
        message: error.message || 'Some error occurred while retrieving mails.'
      });
    } else {
      response.send(dbResult);
    }
  })
};

// Delete mail
exports.delete = (request, response) => {
  const emailId = request.params.emailId.replace(':', '');
  Email.delete(emailId, (error) => {
    if (error) {
      if (error.kind === 'not_found') {
        response.status(404).send({
          message: `Not found mail with id ${emailId}.`
        });
      } else {
        response.status(500).send({
          message: 'Could not delete mail with id ' + emailId
        });
      }
    } else {
      response.send({message: `Mail was deleted successfully!`});
    }
  });
};
