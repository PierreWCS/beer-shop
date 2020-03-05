import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faWindowClose
} from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";

const NavBar = () => {
  const [displayCart, setDisplayCart] = useState(false);
  const [clientCart, setClientCart] = useState(null);

  useEffect(() => {
    getClientCart();
  }, []);

  const getClientCart = () => {
    let stockCart = JSON.parse(localStorage.getItem("clientCart"));
    console.log(stockCart);
    setClientCart(stockCart);
  };

  const deleteProduct = product => {
    let removedProduct = clientCart.filter(e => e.id !== product.id);
    localStorage.setItem("clientCart", JSON.stringify(removedProduct));
    setClientCart(removedProduct);
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
          to="/products"
        >
          BEERS
        </NavLink>
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
          to="/admin"
        >
          ADMIN
        </NavLink>
        {displayCart ? (
          <div className="itemNavBar">
            <FontAwesomeIcon
              onClick={() => setDisplayCart(false)}
              icon={faWindowClose}
              className="closeCartIcon"
            />
          </div>
        ) : (
          <div className="itemNavBar" onClick={() => setDisplayCart(true)}>
            <FontAwesomeIcon icon={faShoppingCart} className="cartIconNavBar" />
          </div>
        )}
      </div>

      {/*       Client cart       */}

      {displayCart ? (
        <div className="cartContainerNavBar">
          <h2>Your cart</h2>
          {clientCart
            ? clientCart.map(product => {
                return (
                  <div className="cartProductCard">
                    <p className="productPriceAndNameCart">{product.name}</p>
                    <div className="closeAndPriceCart">
                      <p className="productPriceAndNameCart">
                        {product.price} €
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
          {clientCart.length ? (
            <button className="aboutUsButton navBarButtonCart">Payment</button>
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default NavBar;
