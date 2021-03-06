import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBarMobile.css";
import useGlobalState from "../../hooks/useGlobalState";
import LogOut from "./LogOut";

const NavBarMobile = () => {
  const { user } = useGlobalState();
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
            <Link to="/" className="logoAndNameNavBar" onClick={closeMenu}>
              <img
                className="logoNavBar"
                src={require("../images/logoBeer.png")}
                alt="logo"
              />
            </Link>
            <hr className="separatorCart separatorNavBar" />
            <NavLink
              onClick={closeMenu}
              activeClassName="activeItemNavBar"
              className="itemNavBarMobile"
              to="/about"
            >
              About us
            </NavLink>
            <NavLink
              onClick={closeMenu}
              activeClassName="activeItemNavBar"
              className="itemNavBarMobile"
              to="/products"
            >
              Products
            </NavLink>
            {user && user.role === "admin" ? (
              <NavLink
                onClick={closeMenu}
                activeClassName="activeItemNavBar"
                className="itemNavBarMobile"
                to="/admin"
              >
                Admin panel
              </NavLink>
            ) : (
              <NavLink
                onClick={closeMenu}
                activeClassName="activeItemNavBar"
                className="itemNavBarMobile"
                to="/cart"
              >
                Cart
              </NavLink>
            )}
            {user ? (
              <div className="itemNavBarMobile">
                <LogOut />
              </div>
            ) : (
              <NavLink
                onClick={closeMenu}
                activeClassName="activeItemNavBar"
                className="itemNavBarMobile"
                to="/login"
              >
                Login / Register
              </NavLink>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NavBarMobile;
