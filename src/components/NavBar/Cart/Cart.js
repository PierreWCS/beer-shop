import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";
import useGlobalState from "../../../hooks/useGlobalState";
import Axios from "axios";
import OrderInfo from "./OrderInfo";

const Cart = ({ totalCart, setTotalCart, totalArticles, setTotalArticles }) => {
  const { user, userCart, cart } = useGlobalState();
  const [togglePayment, setTogglePayment] = useState(false);

  const minusQuantity = (product) => {
    let stockCart = cart;
    stockCart.map((element, index) => {
      if (element.id === product.id) {
        if (element.quantity > 1) {
          element.quantity -= 1;
        }
      }
      getTotalPrice();
      getTotalArticle();
      userCart(stockCart);
      return 0;
    });
  };

  const plusQuantity = (product) => {
    let stockCart = cart;
    stockCart.map((element) => {
      if (element.id === product.id) {
        element.quantity += 1;
      }
      getTotalPrice();
      getTotalArticle();
      userCart(stockCart);
      return 0;
    });
  };

  const deleteProduct = (product) => {
    let removedProduct = cart.filter((e) => e.id !== product.id);
    userCart(removedProduct);
    let countPrice = 0;
    removedProduct.filter((product) => {
      return (countPrice = countPrice + product.price * product.quantity);
    });
    setTotalCart(countPrice.toFixed(2));
    let countArticles = 0;
    removedProduct.filter((product) => {
      return (countArticles = countArticles + product.quantity);
    });
    setTotalArticles(countArticles);
  };

  const getTotalPrice = () => {
    let count = 0;
    cart.filter((product) => {
      return (count = count + product.price * product.quantity);
    });
    setTotalCart(count.toFixed(2));
  };

  const getTotalArticle = () => {
    let count = 0;
    cart.filter((product) => {
      return (count = count + product.quantity);
    });
    setTotalArticles(count);
  };

  return (
    <div className="cartContainerNavBar">
      <h4>Your cart</h4>
      <hr className="separatorCart" />
      <div className={cart ? "productsContainerCart" : null}>
        {cart
          ? cart.map((product, key) => {
              return (
                <div className="cartProductCard" key={key}>
                  <div className="quantityContainer">
                    <p
                      onClick={() => minusQuantity(product)}
                      className={`minusAndPlusCart minusCart ${
                        product.quantity === 1 ? "disableMinus" : null
                      }`}
                    >
                      -
                    </p>
                    <p>{product.quantity}x</p>
                    <p
                      onClick={() => plusQuantity(product)}
                      className="minusAndPlusCart plusCart"
                    >
                      +
                    </p>
                  </div>
                  <p className="productPriceAndNameCart">{product.name}</p>
                  <div className="closeAndPriceCart">
                    <p className="productPriceAndNameCart">
                      {(product.price * product.quantity).toFixed(2)} €
                    </p>
                    <FontAwesomeIcon
                      onClick={() => deleteProduct(product)}
                      className="deleteItemFromCart"
                      icon={faWindowClose}
                    />
                  </div>
                </div>
              );
            })
          : null}
      </div>
      {cart && cart.length ? (
        <div>
          <p className="totalCartCounter">
            Total price:{" "}
            <span className="totalCounterNumberCart">{totalCart}</span> €
          </p>
          <p className="totalCartCounter">
            Total of articles:{" "}
            <span className="totalCounterNumberCart">{totalArticles}</span>
          </p>
          <button
            onClick={() => {
              if (user) {
                setTogglePayment(true);
              } else alert("You must be connected to make the purchase");
              // setDisplayCart(false);
            }}
            className="aboutUsButton navBarButtonCart"
          >
            Payment
          </button>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
      {togglePayment ? <OrderInfo totalCart={totalCart} /> : null}
    </div>
  );
};

export default Cart;
