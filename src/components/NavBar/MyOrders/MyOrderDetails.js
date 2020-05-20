import React, { useEffect, useState } from "react";
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
      setOrderDetails([...result.data]);
    });
  };
  return (
    <div className="myOrderDetailsContainer">
      {/*           Close details            */}
      <button
        onClick={() => setDetails(false)}
        className="closeOrderDetailsButton myOrderButton"
      >
        Back to orders
      </button>
      <h4>Order passed the {order.order_date}</h4>

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
                      Total: {element.price * element.quantity}
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
