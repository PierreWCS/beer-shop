import React, { useEffect, useState } from "react";
import "./OrderDetails.css";
import axios from "axios";

const OrderDetails = ({ order, setOrderDetails }) => {
  const [currentOrderDetails, setCurrentOrderDetails] = useState(null);
  useEffect(() => {
    getOrderDetails();
  }, []);

  const getOrderDetails = () => {
    axios({
      method: "get",
      url: `http://localhost:8000/api/orders/${order.user_id}`
    })
      .then(res => {
        console.log(res.data);
        setCurrentOrderDetails(res.data);
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="orderDetailsContainer">
      <button className="closeOrderDetailsButton" onClick={() => setOrderDetails(false)}>Close</button>
      {currentOrderDetails ? (
        <div className="orderDetailsSecondContainer">
          {/*       Customer infos      */}
          <div>
            <p>Lastname: {currentOrderDetails[0].name}</p>
            <p>Firstname: {currentOrderDetails[0].name}</p>
            <p>Date: {order.order_date}</p>
          </div>

          {/*       Order details tab     */}

          <div className="orderDetailsTab">
            {/*       Order products      */}
            <div className="orderDetailsHead">
              <p className="orderDetailsHeadCell">PRODUCT</p>
              <p className="orderDetailsHeadCell">QUANTITY</p>
              <p className="orderDetailsHeadCell">PRICE</p>
              <p className="orderDetailsHeadCell">TOTAL PRICE</p>
            </div>
            {currentOrderDetails.map((product, key) => {
              return (
                <div key={key} className="orderDetailsContentTabHead">
                  <p className="orderDetailsContentCell">{product.name}</p>
                  <p className="orderDetailsContentCell">{product.quantity}</p>
                  <p className="orderDetailsContentCell">{product.price} €</p>
                  <p className="orderDetailsContentCell">{product.price * product.quantity} €</p>
                </div>
              );
            })}
            <div className="totalPriceOrderDetailsContainer">
              <div className="emptyContentTotalPrice" />
              <p className="totalPriceOrderDetails">Total order: {order.total_price}</p>
            </div>
          </div>
          <div className="modifyStatusContainerOrderDetails">
            <p>Order status: {order.order_status}</p>
            <div className="statusModifyOrderDetails">
              <h4>Modify the status:</h4>
              <select>
                <option value="">--Please choose an option--</option>
                <option value="waiting">Waiting</option>
                <option value="treatment">Treatment</option>
                <option value="completed">Completed</option>
              </select>
              <button>Confirm</button>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading data</p>
      )}
    </div>
  );
};

export default OrderDetails;
