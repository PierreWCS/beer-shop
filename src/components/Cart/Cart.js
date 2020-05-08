import React, { useEffect, useState } from "react";
import "./Cart.css";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useGlobalState from "../../hooks/useGlobalState";

const Cart = () => {
  const {userCart,cart} = useGlobalState();

  let stock = 0;

  const deleteProduct = product => {
    let removedProduct = cart.filter(e => e.id !== product.id);
    localStorage.setItem("clientCart", JSON.stringify(removedProduct));
    userCart(removedProduct);
  };

  return (
    <div className="cartContainerMobile">
      <h1 className="cartTitleMobile">CART</h1>
      <div className="productsContainerCartMobile">
        {cart ? (
          cart.map(product => {
            stock += product.price * product.quantity;
            return (
              <div className="productCardCartMobile">
                <p className="productNameCartMobile">{product.name}</p>
                <p className="productPriceCartMobile">{product.price}</p>
                <FontAwesomeIcon
                  onClick={() => deleteProduct(product)}
                  className="deleteItemFromCart deleteCartMobile fa-2x"
                  icon={faWindowClose}
                />
              </div>
            );
          })
        ) : (
          <p>Your cart is empty</p>
        )}
        {cart && cart.length ? (
          <div>
            <p className="totalCartCounter">
              Total quantity: {cart.length}
            </p>
            <p className="totalCartCounter">
              Total price: {stock.toFixed(2)} €
            </p>
            <div className="buttonContainerCart">
              <button className="aboutUsButton buttonCartMobile">
                Payment
              </button>
              <Link to="/" className="aboutUsButton buttonBackToSiteCart">
                Back to the site
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
