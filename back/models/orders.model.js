const db = require("./database");

const Order = function(order) {
  this.id = order.id;
  this.order_date = order.order_date;
  this.order_status = order.order_status;
  this.user_id = order.user_id;
};

const OrderItem = function(orderItem) {
  this.id = orderItem.id;
  this.orders_id = orderItem.orders_id;
  this.product_id = orderItem.product_id;
  this.quantity = orderItem.product_quantity;
};

Order.create = (newOrder, result) => {
  db.query("INSERT INTO orders SET ?", newOrder, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }
    newOrder.id = dbResult.insertId;
    return result(null, { ...newOrder });
  });
};

Order.createItem = (newOrderItem, result) => {
  db.query("INSERT INTO order_items SET ?", newOrderItem, (error, dbResult) => {
    if (error) {
      return result(error, null);
    }
    return result(null, { message: "Success" });
  });
};

module.exports = { Order, OrderItem };
