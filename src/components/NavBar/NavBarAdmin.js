import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import LogOut from "./LogOut";

const NavBarAdmin = ({ user }) => {

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
          to="/admin"
        >
          ADMIN
        </NavLink>
        <LogOut />
      </div>
    </div>
  );
};

export default NavBarAdmin;
