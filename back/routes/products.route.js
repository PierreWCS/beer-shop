const express = require('express');
const products = require('../controllers/products.controller');

// Initialize a router
const router = express.Router();

// New product
router.post('/', products.create);

// Show all products
router.get('/', products.findAll);

// Update the product
router.patch('/:productId', products.update);

// Delete product
router.delete('/:productId', products.delete);

module.exports = router;
