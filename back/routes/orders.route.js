const express = require("express");
const order = require("../controllers/orders.controller");

const router = express.Router();

// Create new order
router.post("/order", order.create);
router.post("/item", order.createItemOrder);
router.post("/address", order.createAddress);

// Get all the orders
router.get("/", order.findAll);

// Get order with details by ID
router.get("/:orderId", order.detailsByOrderId);

// Get orders by user ID
router.get("/:userId/orders", order.findByUserId);

// Update an order status
router.patch("/:orderId", order.updateStatus);

// Delete order from the base
router.delete("/:orderId", order.delete);

module.exports = router;
