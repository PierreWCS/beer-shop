const express = require('express');

const products = require('./products.route');
const messages = require('./messages.route');

// Initialize a router
const router = express.Router();

router.use('/products', products);
router.use('/messages', messages);

module.exports = router;
