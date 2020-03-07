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

  useEffect(() => {
    getClientCart();
  }, []);

  const getClientCart = () => {
    let stockCart = JSON.parse(localStorage.getItem("clientCart"));
    console.log(stockCart);
    let count = 0;
    let total = stockCart.filter(product => {
      return (count = count + product.price * product.quantity);
    });
    setTotalCart(count.toFixed(2));
    setClientCart(stockCart);
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
          <div className="itemNavBarCart">
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
            />
          </div>
        ) : (
          <div
            className="itemNavBar cartIconAndNumberDefault"
            onClick={() => setDisplayCart(true)}
          >
            <FontAwesomeIcon icon={faShoppingCart} className="cartIconNavBar" />
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
