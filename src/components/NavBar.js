import React from 'react';
import {NavLink} from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navBarContainer">
      <h1 className="shopTitle">Wild Beers</h1>
      <div className="navLinkContainer">
        <NavLink activeClassName="activeItemNavBar" className="itemNavBar" to="/">Home</NavLink>
        <NavLink activeClassName="activeItemNavBar" className="itemNavBar" to="/cc">About</NavLink>
        <NavLink activeClassName="activeItemNavBar" className="itemNavBar" to="/cc">Beers</NavLink>
      </div>
    </div>
  )
};

export default NavBar;
