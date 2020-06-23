import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import "./MyOrderDetails.css";
import Api from "../../services/Api";

const MyOrderDetails = ({ order, setDetails }) => {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    getOrderDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOrderDetails = () => {
    Api.get("orders/" + order.id).then((result) => {
      console.log(result.data);
      setOrderDetails(result.data);
    });
  };

  return (
    <div className="myOrderDetailsContainer">
      {/*           Close details            */}
      <button onClick={() => setDetails(false)} className="myOrderButton">
        <FontAwesomeIcon icon={faArrowAltCircleLeft} className="fa-2x" />
        Back to orders
      </button>

      {/*     Date, status and order address      */}
      <div className="orderDetailsContainerMyOrder">
        <p className="orderDetailsMyOrderTitle">Order date: </p>
        <p className="orderDateMyOrder">{order.order_date}</p>
        <div>
          <p className="orderDetailsMyOrderTitle">Shipping address:</p>
          {orderDetails ? (
            <>
              <p className="orderDetailsAddress">
                {order.street_number} {order.street}
              </p>
              <p className="orderDetailsAddress">
                {order.zipcode} {order.city}
              </p>
              <p className="orderDetailsAddress">{order.country}</p>
            </>
          ) : null}
        </div>
      </div>

      {/*           Order details head tab             */}

      <div className="arrayContainerMyOrderDetails">
        <div className="myOrderDetailsHeadContainer">
          <p className="myOrderDetailsHeadCell">Product</p>
          <p className="myOrderDetailsHeadCell">Quantity</p>
          <p className="myOrderDetailsHeadCell">Price</p>
          <p className="myOrderDetailsHeadCell">Total price</p>
        </div>

        {/*           Order details content           */}

        <div className="tabContentMyOrder">
          {orderDetails
            ? orderDetails.map((element, key) => {
                return (
                  <div key={key} className="myOrderDetailsContentContainer">
                    <p className="myOrderDetailsContentCell">{element.name}</p>
                    <p className="myOrderDetailsContentCell">
                      {element.quantity}
                    </p>
                    <p className="myOrderDetailsContentCell">
                      {element.price} €
                    </p>
                    <p className="myOrderDetailsContentCell">
                      {element.price * element.quantity}€
                    </p>
                  </div>
                );
              })
            : null}
          <div className="totalPriceOrderDetailsContainer">
            <div className="emptyContentTotalPrice" />
            <p className="totalPriceOrderDetails">{order.total_price} €</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyOrderDetails;
