import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import Cart from "./Cart/Cart";
import "./DefaultNavBar.css";
import useGlobalState from "../../hooks/useGlobalState";

const DefaultNavBar = ({
  totalCart,
  setTotalCart,
  totalArticles,
  setTotalArticles,
  displayCart,
  setDisplayCart
}) => {
  const { cart } = useGlobalState();
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
            {cart && cart.length ? (
              <p className="numberCartNavBar defaultNumberCart">
                {cart.length}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultNavBar;
