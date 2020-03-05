import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBarMobile.css";

const NavBarMobile = () => {
  const [toggle, setToggle] = useState(false);

  const closeMenu = () => {
    setToggle(false);
  };

  return (
    <div>
      <div className={`${toggle ? "listNavBar" : "closedMenuBurger"}`}>
        <div className="burgerMenuContainer">
          <div
            onClick={() => setToggle(!toggle)}
            className={`burgerMenu ${toggle ? "change" : null}`}
          >
            <div className="bar1" />
            <div className="bar2" />
            <div className="bar3" />
          </div>
        </div>
        {toggle ? (
          <div className="listNavBarMobile">
            <Link to="/" className="logoAndNameNavBar">
              <img
                className="logoNavBar"
                src={require("../images/logoBeer.png")}
                alt="logo"
              />
            </Link>
            <hr className="separatorCart separatorNavBar" />
            <NavLink
              activeClassName="activeItemNavBar"
              className="itemNavBarMobile"
              to="/about"
            >
              ABOUT US
            </NavLink>
            <NavLink
              activeClassName="activeItemNavBar"
              className="itemNavBarMobile"
              to="/admin"
            >
              ADMIN
            </NavLink>
            <NavLink
              activeClassName="activeItemNavBar"
              className="itemNavBarMobile"
              to="/cart"
            >
              CART
            </NavLink>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavBarMobile;
