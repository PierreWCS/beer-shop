const { Order, OrderItem } = require("../models/orders.model");

// Create a new order
exports.create = (request, response) => {
  if (!request.body) {
    return response.status(400).send({
      message: "Content can not be empty"
    });
  }

  const orderData = request.body.orderData;
  //  Create order
  const order = new Order({
    id: orderData.id || null,
    order_date: orderData.order_date || null,
    order_status: orderData.order_status || null,
    total_price: orderData.total_price || null,
    user_id: orderData.user_id || null
  });

  // Save order in DB
  Order.create(order, (error, data) => {
    if (error) {
      return response.status(500).send({
        message: "An error occurred while creating the order."
      });
    }
    return response.status(200).send(data);
  });
};

// Create order items
exports.createItemOrder = (request, response) => {
  if (!request.body) {
    return response.status(400).send({
      message: "Content can not be empty"
    });
  }

  const product = request.body;
  console.log(product);

  //  Create order item
  const orderItem = new OrderItem({
    id: product.id || null,
    orders_id: product.orders_id,
    product_id: product.product_id,
    product_quantity: product.product_quantity
  });

  //  Save order item in DB
  Order.createItem(orderItem, (error, data) => {
    if (error) {
      return response.status(500).send({
        message: "An error has occurred while creating the order item"
      });
    }
    return response.status(200).send(data);
  });
};

// Get all the orders (admin use)
exports.findAll = (request, response) => {
  Order.findAll((error, dbResult) => {
    if (error) {
      response.status(500).send({
        message: error.message || "Some error occurred while retrieving orders."
      });
    } else {
      response.send(dbResult);
    }
  });
};

// Get the order details (admin use)
exports.detailsById = (request, response) => {
  const { orderId } = request.params;

  Order.detailsById(orderId, (error, dbResult) => {
    if (error) {
      response.status(500).send({
        message: "Some error occurred while retrieving order details."
      });
    } else {
      response.send(dbResult);
    }
  });
};

// Update order status
exports.updateStatus = function(request, response) {
  if (!request.body) {
    response.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const { orderId } = request.params;

  Order.updateStatus(orderId, request.body, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        response.status(404).send({
          message: `Not found order with id ${orderId}.`
        });
      } else {
        response.status(500).send({
          message: "Error updating order with id " + orderId
        });
      }
    } else {
      response.send(data);
    }
  });
};

// Delete order
exports.delete = (request, response) => {
  const orderId = request.params.orderId.replace(":", "");
  Order.delete(orderId, (error, dbResult) => {
    if (error) {
      if (error.kind === "not_found") {
        response.status(404).send({
          message: `Not found order with id ${orderId}.`
        });
      } else {
        response.status(500).send({
          message: "Could not delete order with id " + orderId
        });
      }
    } else {
      response.send({ message: `order was deleted successfully!` });
    }
  });
};
