import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import Cart from "./Cart/Cart";
import './DefaultNavBar.css';

const DefaultNavBar = () => {
  const [displayCart, setDisplayCart] = useState(false);
  const [clientCart, setClientCart] = useState(null);
  const [totalCart, setTotalCart] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);

  useEffect(() => {
    getClientCart();
  }, []);

  const getClientCart = () => {
    let stockCart = JSON.parse(localStorage.getItem("clientCart"));
    console.log(stockCart);
    if (stockCart && stockCart.length > 0) {
      let countPrice = 0;
      let countArticles = 0;
      stockCart.filter(product => {
        countPrice = countPrice + product.price * product.quantity;
        countArticles = countArticles + product.quantity;
      });
      setTotalCart(countPrice.toFixed(2));
      setTotalArticles(countArticles);
      setClientCart(stockCart);
    } else {
      return 0;
    }
  };

  return (
    <div className="navBarContainer">
      <Link to="/" className="logoAndNameNavBar">
        <img
          className="logoNavBar"
          src={require("../images/logoBeer.png")}
          alt="logo"
        />
      </Link>
      <div className="navLinkContainer">
        <NavLink
          activeClassName="activeItemNavBar"
          className="itemNavBar"
          to="/about"
        >
          ABOUT US
        </NavLink>
        <NavLink
          activeClassName="activeItemNavBar"
          className="itemNavBar"
          to="/products"
        >
          PRODUCTS
        </NavLink>
        <NavLink
          activeClassName="activeItemNavBar"
          className="itemNavBar"
          to="/sign-in"
        >
          SIGN-IN
        </NavLink>
        <NavLink
          activeClassName="activeItemNavBar"
          className="itemNavBar"
          to="/sign-up"
        >
          SIGN-UP
        </NavLink>
        {displayCart ? (
          <div className="itemNavBarCart itemNavBar">
            <FontAwesomeIcon
              onClick={() => setDisplayCart(false)}
              icon={faWindowClose}
              className="closeCartIcon"
            />
            <Cart
              clientCart={clientCart}
              setClientCart={setClientCart}
              totalCart={totalCart}
              setTotalCart={setTotalCart}
              totalArticles={totalArticles}
              setTotalArticles={setTotalArticles}
            />
          </div>
        ) : (
          <div
            className="itemNavBar cartIconAndNumberDefault"
            onClick={() => setDisplayCart(true)}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="cartIconNavBar fa-2x" />
            {clientCart ? (
              <p className="numberCartNavBar defaultNumberCart">{clientCart.length}</p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultNavBar;
