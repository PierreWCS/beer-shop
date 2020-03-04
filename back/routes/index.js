const express = require('express');

const products = require('./products.route');

// Initialize a router
const router = express.Router();

router.use('/products', products);

module.exports = router;
