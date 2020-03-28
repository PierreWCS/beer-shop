import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import Cart from "./Cart/Cart";
import "./DefaultNavBar.css";

const DefaultNavBar = ({
  totalCart,
  setTotalCart,
  clientCart,
  setClientCart,
  totalArticles,
  setTotalArticles,
  displayCart,
  setDisplayCart
}) => {
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
          to="/login"
        >
          LOGIN
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
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="cartIconNavBar fa-2x"
            />
            {clientCart ? (
              <p className="numberCartNavBar defaultNumberCart">
                {clientCart.length}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultNavBar;
