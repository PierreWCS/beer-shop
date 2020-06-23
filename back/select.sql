
-- Select order details and user name
select orders.id, orders.user_id, orders.order_date, users.lastname, users.firstname
from orders
INNER JOIN users on users.id=orders.user_id;


-- Select order by customer ID
select products.name, products.price, order_items.quantity, orders.order_date, orders.user_id, orders.order_status
from order_items
INNER JOIN orders on orders.id=order_items.orders_id
INNER JOIN products on products.id=order_items.product_id
where orders.user_id=1;
