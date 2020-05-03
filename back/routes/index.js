const express = require('express');

const products = require('./products.route');
const messages = require('./messages.route');
const users = require('./users.route');
const emails = require('./emails.route');
const orders = require('./orders.route');

// Initialize a router
const router = express.Router();

router.use('/products', products);
router.use('/messages', messages);
router.use('/users', users);
router.use('/emails', emails);
router.use('/orders', orders);

module.exports = router;
