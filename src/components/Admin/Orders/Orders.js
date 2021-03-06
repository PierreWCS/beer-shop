import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBarAdmin from "../NavBarAdmin/NavBarAdmin";
import "./Orders.css";
import OrderDetails from "./OrderDetails/OrderDetails";

const Orders = () => {
  const [orders, setOrders] = useState();
  const [orderDetails, setOrderDetails] = useState(false);
  const [orderDetailsIndex, setOrderDetailsIndex] = useState(null);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    axios({
      method: "get",
      url: "http://localhost:8000/api/orders",
    })
      .catch((e) => console.log(e))
      .then((res) => {
        setOrders(res.data);
      });
  };

  return (
    <div className="productsAdmin">
      <NavBarAdmin />
      <div className="productsAdminContainer ordersMainContainerAdmin">
        <h1>Manages your orders</h1>
        {orders ? (
          <div className="ordersTabContainer">
            <div className="headOrdersTab">
              <p className="ordersTabHeadCell">ID</p>
              <p className="ordersTabHeadCell">DATE</p>
              <p className="ordersTabHeadCell">TOTAL PRICE</p>
              <p className="ordersTabHeadCell">STATUS</p>
              <p className="ordersTabHeadCell">DETAILS</p>
            </div>
            {orders.map((order, key) => {
              return (
                <div key={key} className="ordersTabCellContainer">
                  <p className="ordersTabCell">{order.id}</p>
                  <p className="ordersTabCell">{order.order_date}</p>
                  <p className="ordersTabCell">{order.total_price}€</p>
                  <p className="ordersTabCell">{order.order_status}</p>
                  <button
                    onClick={() => {
                      setOrderDetails(true);
                      setOrderDetailsIndex(key);
                    }}
                    className="moreDetailsOrders"
                  >
                    + More details
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p>You have 0 orders</p>
        )}
        {orderDetails ? (
          <OrderDetails
            setOrderDetails={setOrderDetails}
            order={orders[orderDetailsIndex]}
          />
        ) : null}
      </div>
    </div>
  );
};

export default Orders;
