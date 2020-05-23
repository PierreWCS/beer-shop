const db = require("./database");

const Order = function (order) {
  this.id = order.id;
  this.order_date = order.order_date;
  this.order_status = order.order_status;
  this.total_price = order.total_price;
  this.user_id = order.user_id;
  this.address_id = order.address_id;
};

const OrderItem = function (orderItem) {
  this.id = orderItem.id;
  this.orders_id = orderItem.orders_id;
  this.product_id = orderItem.product_id;
  this.quantity = orderItem.product_quantity;
};

const OrderAddress = function (orderAddress) {
  this.id = orderAddress.id;
  this.street_number = orderAddress.street_number;
  this.street = orderAddress.street;
  this.zipcode = orderAddress.zipcode;
  this.city = orderAddress.city;
  this.country = orderAddress.country;
};

// Create orders
Order.create = (newOrder, result) => {
  db.query("INSERT INTO orders SET ?", newOrder, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }
    newOrder.id = dbResult.insertId;
    return result(null, { ...newOrder });
  });
};

// Create orders items details
Order.createItem = (newOrderItem, result) => {
  db.query("INSERT INTO order_items SET ?", newOrderItem, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }
    return result(null, { message: "Success" });
  });
};

// Create addresse
Order.createAddress = (newAddress, result) => {
  db.query("INSERT INTO addresses SET ?", newAddress, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }
    newAddress.id = dbResult.insertId;
    return result(null, { ...newAddress });
  });
};

// Get all the orders (admin use)
Order.findAll = (result) => {
  db.query(
    "SELECT orders.id, orders.order_date, orders.order_status, orders.total_price, orders.user_id, addresses.street_number, addresses.street, addresses.zipcode, addresses.city, addresses.country, users.lastname, users.firstname, users.email FROM orders INNER JOIN addresses on addresses.id=address_id INNER JOIN users on users.id=user_id",
    (error, dbResult) => {
      if (error) return result(error, null);
      return result(null, dbResult);
    }
  );
};

Order.findByUserId = (userId, result) => {
  db.query(
    "SELECT orders.id, orders.order_date, orders.order_status, orders.total_price, orders.user_id, orders.address_id, addresses.street_number, addresses.street, addresses.zipcode, addresses.city, addresses.country FROM orders INNER JOIN addresses on addresses.id=address_id WHERE user_id=?",
    [userId],
    (error, dbResult) => {
      if (error) return result(error, null);
      return result(null, dbResult);
    }
  );
};

// Get all the customer orders
Order.detailsByOrderId = (orderId, result) => {
  db.query(
    "SELECT products.name, products.price, order_items.quantity, orders.order_date, orders.user_id, orders.order_status FROM order_items INNER JOIN orders on orders.id=order_items.orders_id INNER JOIN products on products.id=order_items.product_id INNER JOIN addresses on addresses.id=address_id where orders.id=?",
    [orderId],
    (error, dbResult) => {
      if (error) return result(error, null);
      return result(null, dbResult);
    }
  );
};

Order.updateStatus = (id, status, result) => {
  db.query(
    "UPDATE orders SET order_status = ? WHERE id = ?",
    [status, id],
    (error, response) => {
      if (error) {
        return result(error, null);
      }
      if (response.affectedRows === 0) {
        //  Not found product with the id
        return result({ kind: "not_found" }, null);
      }
      return result(null, { id: Number(id), ...status });
    }
  );
};

Order.delete = (orderId, result) => {
  db.query("DELETE FROM orders WHERE id = ?", orderId, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }
    if (dbResult.affectedRows === 0) {
      //  not found the orders with the id
      return result({ kind: "not found" }, null);
    }
    return result(null, dbResult);
  });
};

module.exports = { Order, OrderItem, OrderAddress };
