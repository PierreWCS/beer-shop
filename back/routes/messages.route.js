const express = require('express');
const message = require('../controllers/messages.controller');

// Initialize a router
const router = express.Router();

// New message
router.post('/', message.create);

// Show all messages
router.get('/', message.findAll);

// Delete message
router.delete('/:messageId', message.delete);

module.exports = router;
