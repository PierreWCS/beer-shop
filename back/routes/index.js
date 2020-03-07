const express = require('express');

const products = require('./products.route');
const messages = require('./messages.route');
const users = require('./users.route');

// Initialize a router
const router = express.Router();

router.use('/products', products);
router.use('/messages', messages);
router.use('/users', users);

module.exports = router;
