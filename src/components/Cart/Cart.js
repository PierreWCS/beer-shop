import React from "react";
import "./Cart.css";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import useGlobalState from "../../hooks/useGlobalState";

const Cart = () => {
  const { userCart, cart } = useGlobalState();

  const minusQuantity = function (product) {
    let stockCart = cart;
    stockCart.map((element) => {
      if (element.id === product.id) {
        if (element.quantity > 1) {
          element.quantity -= 1;
        }
      }
      userCart(stockCart);
      return 0;
    });
  };

  const plusQuantity = function (product) {
    let stockCart = cart;
    stockCart.map((element) => {
      if (element.id === product.id) {
        element.quantity += 1;
      }
      userCart(stockCart);
      return 1;
    });
  };

  const deleteProduct = (product) => {
    let removedProduct = cart.filter((e) => e.id !== product.id);
    localStorage.setItem("clientCart", JSON.stringify(removedProduct));
    userCart(removedProduct);
  };

  return (
    <div className="cartContainerMobile">
      <h1 className="cartTitleMobile">CART</h1>
      <div className="productsContainerCartMobile">
        {cart ? (
          cart.map((product) => {
            return (
              <div className="productCardCartMobile">
                <p className="productNameCartMobile">{product.name}</p>
                <div className="productQuantityCartMobile">
                  <p
                    className="quantitySelectorMobileCart minusMobileCart"
                    onClick={() => minusQuantity(product)}
                  >
                    -
                  </p>
                  <p>{product.quantity}</p>
                  <p
                    className="quantitySelectorMobileCart plusMobileCart"
                    onClick={() => plusQuantity(product)}
                  >
                    +
                  </p>
                </div>
                <p className="productPriceCartMobile">
                  {(product.price * product.quantity).toFixed(2)} €
                </p>
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
              Total quantity: {cart.total_articles}
            </p>
            <p className="totalCartCounter">
              Total price: {cart.total_price} €
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
