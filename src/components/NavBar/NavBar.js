import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import useGlobalState from "../../hooks/useGlobalState";
import NavBarAdmin from "./NavBarAdmin";
import DefaultNavBar from "./DefaultNavBar";
import LogOut from "./LogOut";

const NavBar = () => {
  const { user } = useGlobalState();

  if (user && user.role === "admin") {
    return <NavBarAdmin />;
  } else if (user) {
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
          <LogOut />
        </div>
      </div>
    );
  } else return <DefaultNavBar />;
};

export default NavBar;
