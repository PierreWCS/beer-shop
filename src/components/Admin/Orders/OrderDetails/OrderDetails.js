import React, { useEffect, useState } from "react";
import "./OrderDetails.css";
import axios from "axios";
import Api from "../../../services/Api";

const OrderDetails = ({ order, setOrderDetails }) => {
  const [currentOrderDetails, setCurrentOrderDetails] = useState(null);
  const [newStatus, setNewStatus] = useState(null);
  useEffect(() => {
    getOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOrderDetails = () => {
    axios({
      method: "get",
      url: `http://localhost:8000/api/orders/${order.id}`,
    })
      .then((res) => {
        setCurrentOrderDetails(res.data);
      })
      .catch((err) => console.log(err));
  };

  const updateStatus = () => {
    if (!newStatus) {
      alert("You must select an option");
    } else if (
      window.confirm(
        `Do you really want to change the order's status to: ${newStatus} ?`
      )
    ) {
      order.order_status = newStatus;
      Api.update(`orders/${order.id}`, order)
        .then((res) => {
          console.log(res);
          alert("Order has been updated");
          setOrderDetails(false);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="orderDetailsContainer">
      <button
        className="closeOrderDetailsButton"
        onClick={() => setOrderDetails(false)}
      >
        Close
      </button>
      {currentOrderDetails ? (
        <div className="orderDetailsSecondContainer">
          {/*       Customer infos      */}
          <div className="customerDetailsContainer">
            {/* Customer details  */}
            <div className="nameAndEmailCustomerOrder">
              <h4>Customer:</h4>
              <p>
                {order.lastname} {order.firstname}
              </p>
              <p>{order.email}</p>
            </div>

            {/* Address */}
            <div className="addressOrderDetailsAdmin">
              <h4>Address:</h4>
              <p>
                {order.street_number} {order.street}
              </p>
              <p>
                {order.zipcode} {order.city}
              </p>
              <p>{order.country}</p>
            </div>
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
                  <p className="orderDetailsContentCell">
                    {(product.price * product.quantity).toFixed(2)} €
                  </p>
                </div>
              );
            })}
            <div className="totalPriceOrderDetailsContainer">
              <div className="emptyContentTotalPrice" />
              <p className="totalPriceOrderDetails">
                Total order: {order.total_price}
              </p>
            </div>
          </div>
          <div className="modifyStatusContainerOrderDetails">
            <div className="dateAndStatusOrderDetails">
              <p>Order date: {order.order_date}</p>
              <p>Order status: {order.order_status}</p>
            </div>
            <div className="statusModifyOrderDetails">
              <h4>Modify the status:</h4>
              <select onChange={(event) => setNewStatus(event.target.value)}>
                <option value="">--Please choose an option--</option>
                <option value="waiting">Waiting</option>
                <option value="treatment">Treatment</option>
                <option value="completed">Completed</option>
              </select>
              <button onClick={updateStatus}>Confirm</button>
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
