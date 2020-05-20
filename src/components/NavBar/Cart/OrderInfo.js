import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "./OrderInfo.css";
import Axios from "axios";
import useGlobalState from "../../../hooks/useGlobalState";
import Api from "../../services/Api";

const OrderInfo = ({ totalCart }) => {
  const [formData, setFormData] = useState(null);
  const [orderNumberStreet, setOrderNumberStreet] = useState(null);
  const [orderStreet, setOrderStreet] = useState(null);
  const [orderZipcode, setOrderZipcode] = useState(null);
  const [orderCity, setOrderCity] = useState(null);
  const [orderCountry, setOrderCountry] = useState(null);
  const { user, userCart } = useGlobalState();

  let initialForm = {
    streetNumber: null,
    street: null,
    city: null,
    zipcode: null,
    country: null,
  };

  const confirmOrder = function async(event) {
    event.preventDefault();
    initialForm = {
      streetNumber: orderNumberStreet,
      street: orderStreet,
      zipcode: orderZipcode,
      city: orderCity,
      country: orderCountry,
    };
    setFormData(initialForm);
    console.log(initialForm);
    if (
      orderNumberStreet &&
      orderStreet &&
      orderZipcode &&
      orderCity &&
      orderCountry
    ) {
      console.log("Saving the order");
      Api.post("orders/address", formData).then((res) => console.log(res));
      // payment();
    } else alert("You must fill all the inputs");
  };

  const payment = async () => {
    // First request, send the order infos
    // Get the current date
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();
    today = mm + "/" + dd + "/" + yyyy;

    const data = {
      orderData: {
        order_date: today,
        order_status: "waiting",
        total_price: totalCart,
        user_id: user.id,
      },
    };
    let newOrderId = 0;
    try {
      await Axios({
        url: "http://localhost:8000/api/orders/order",
        method: "post",
        data: data,
      }).then((res) => {
        newOrderId = res.data.id;
      });
    } catch (e) {
      console.log(e);
    }
    try {
      //  Second request, send the customer cart content
      const customerCart = JSON.parse(localStorage.getItem("clientCart"));
      let products = [];
      for (let i = 0; i < customerCart.length; i++) {
        products.push({
          orders_id: newOrderId,
          product_id: customerCart[i].id,
          product_quantity: customerCart[i].quantity,
        });
      }
      try {
        for (let i = 0; i < products.length; i++) {
          await Axios({
            url: "http://localhost:8000/api/orders/item",
            data: products[i],
            method: "post",
          });
        }
        alert("Your order has been sent");
        userCart(null);
      } catch (e) {
        console.log(e);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="orderInfoPage">
      <h3>Shipping address</h3>
      <hr className="separatorCart" />
      <form className="formContainerOrderInfo" onSubmit={confirmOrder}>
        {/*     Street number and street      */}
        <div>
          <input
            required
            type="text"
            className="inputOrderInfo"
            onChange={(event) => setOrderNumberStreet(event.target.value)}
            placeholder="14..."
          />
          <input
            required
            type="text"
            className="inputOrderInfo"
            onChange={(event) => setOrderStreet(event.target.value)}
            placeholder="Alcohol street..."
          />
        </div>

        {/*     ZipCode and City      */}
        <div>
          <input
            required
            type="text"
            className="inputOrderInfo"
            onChange={(event) => setOrderZipcode(event.target.value)}
            placeholder="35540..."
          />
          <input
            required
            type="text"
            className="inputOrderInfo"
            onChange={(event) => setOrderCity(event.target.value)}
            placeholder="London..."
          />
        </div>

        <input
          required
          type="text"
          className="inputOrderInfo"
          onChange={(event) => setOrderCountry(event.target.value)}
          placeholder="England..."
        />
        <button className="validateAddressOrderInfo">
          <FontAwesomeIcon icon={faShoppingCart} />
          Confirm order
        </button>
      </form>
    </div>
  );
};

export default OrderInfo;
