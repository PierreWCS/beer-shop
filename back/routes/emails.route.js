const express = require('express');
const email = require('../controllers/emails.controller');

// Initialize a router
const router = express.Router();

// New email
router.post('/', email.create);

// Show all emails
router.get('/', email.findAll);

// Delete email from the base
router.delete('/:emailId', email.delete);

module.exports = router;
