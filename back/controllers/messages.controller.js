const Message = require('../models/messages.model');

// Create a new message
exports.create = (request, response) => {
  if (!request.body) {
    return response.status(400).send({
      message: 'Content can not be empty!'
    })
  }

  // Create a message
  const message = new Message({
    id: request.body.id,
    title: request.body.title || null,
    mail: request.body.mail || null,
    name: request.body.name || null,
    firstname: request.body.firstname || null,
    body: request.body.body || null
  });

  // Save message in database
  Message.create(message, (error, data) => {
    if (error) {
      return response.status(500).send({
        message: error.message || 'Some error occured while creating the message.'
      });
    } else {
      return response.send(data);
    }
  });
};

// Get all messages
exports.findAll = (request, response) => {
  Message.findAll((error, dbResult) => {
    if (error) {
      response.status(500).send({
        message: error.message || 'Some error occurred while retrieving messages.'
      });
    } else {
      response.send(dbResult);
    }
  })
};

// Delete Message
exports.delete = (request, response) => {
  const messageId = request.params.messageId.replace(':', '');
  Message.delete(messageId, (error, dbResult) => {
    if (error) {
      if (error.kind === 'not_found') {
        response.status(404).send({
          message: `Not found message with id ${messageId}.`
        });
      } else {
        response.status(500).send({
          message: 'Could not delete message with id ' + messageId
        });
      }
    } else {
      response.send({message: `Message was deleted successfully!`});
    }
  });
};
