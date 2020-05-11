import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import useGlobalState from "../../../hooks/useGlobalState";
import Api from "../../services/Api";

const MyOrders = () => {
  const { user } = useGlobalState();
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOrders = () => {
    Api.getByUserId(`orders/${user.id}/orders`).then(response => {
      setOrders(response.data);
      console.log(response.data);
      console.log(user);
    });
  };

  return (
    <div className="myOrdersContainer">
      <h1 className="titleMyOrders">My current orders</h1>
      <div className="ordersContainerMyOrders">
        <div className="myOrdersTabHeadContainer">
          <p className="myOrdersTabHead">Date</p>
          <p className="myOrdersTabHead">Total price</p>
          <p className="myOrdersTabHead">Status</p>
          <p className="myOrdersTabHead">Order details</p>
        </div>
        {orders
          ? orders.map((order, key) => {
            if(order.order_status === "waiting" || order.order_status === "treatment") {
              return (
                <div className="orderInfosMyOrders" key={key}>
                  <p className="myOrdersTabCell">{order.order_date}</p>
                  <p className="myOrdersTabCell">{order.total_price} €</p>
                  <p className="myOrdersTabCell">{order.order_status}</p>
                  <div className="myOrdersTabCell">
                    <button className="buttonOrderDetails">Details</button>
                  </div>
                </div>
              );
            } else return 0;
          })
          : null}
      </div>
    </div>
  );
};

export default MyOrders;
