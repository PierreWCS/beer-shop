import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import useGlobalState from "../../hooks/useGlobalState";
import NavBarAdmin from "./NavBarAdmin";
import DefaultNavBar from "./DefaultNavBar";
import Cart from "./Cart/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSortDown,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import MyAccount from "./MyAccount";
import Api from "../services/Api";

const NavBar = () => {
  const [displayCart, setDisplayCart] = useState(false);
  const [totalCart, setTotalCart] = useState(0);
  const [totalArticles, setTotalArticles] = useState(0);
  const [toggleAccountMenu, setToggleAccountMenu] = useState(false);
  const { user, cart } = useGlobalState();

  useEffect(() => {
    getClientCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getClientCart = () => {
    let stockCart = cart;
    console.log("Client cart:", stockCart);
    if (stockCart && stockCart.length > 0) {
      let countPrice = 0;
      let countArticles = 0;
      stockCart.filter((product) => {
        countPrice = countPrice + product.price * product.quantity;
        countArticles = countArticles + product.quantity;
        return 0;
      });
      setTotalCart(countPrice.toFixed(2));
      setTotalArticles(countArticles);
    } else {
      return 0;
    }
  };

  // If the user is an admin

  if (user && user.role === "admin") {
    return <NavBarAdmin />;
  }

  // If the user is connected with a visitor account
  else if (user) {
    console.log(user);

    Api.post(`users/token/${user.id}`, user).then((result) => console.log(result.data.token));

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

          {/*     Account menu      */}

          <div
            className="itemNavBar accountAndIconContainer"
            onMouseEnter={() => setToggleAccountMenu(true)}
            onMouseLeave={() => setToggleAccountMenu(false)}
          >
            ACCOUNT
            <FontAwesomeIcon className="arrowAccountIcon" icon={faSortDown} />
            {toggleAccountMenu ? <MyAccount user={user} /> : null}
          </div>

          {/*     Cart      */}

          {displayCart ? (
            <div className="itemNavBarCart">
              <FontAwesomeIcon
                icon={faWindowClose}
                className="closeCartIcon"
                onClick={() => setDisplayCart(false)}
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
                <p className="numberCartNavBar defaultUserNumberCart">
                  {cart.length}
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Default nav bar
  else
    return (
      <DefaultNavBar
        totalCart={totalCart}
        setTotalCart={setTotalCart}
        totalArticles={totalArticles}
        setTotalArticles={setTotalArticles}
        displayCart={displayCart}
        setDisplayCart={setDisplayCart}
      />
    );
};

export default NavBar;
