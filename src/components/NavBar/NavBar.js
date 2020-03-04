import React from 'react';
import {Link, NavLink} from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navBarContainer">
      <Link to="/" className="logoAndNameNavBar">
        <img className="logoNavBar" src={require('../images/logo.png')} alt="logo"/>
        <h1 className="shopTitle">Wild Beers</h1>
      </Link>
      <div className="navLinkContainer">
        <NavLink activeClassName="activeItemNavBar" className="itemNavBar" to="/about">About</NavLink>
        <NavLink activeClassName="activeItemNavBar" className="itemNavBar" to="/admin">Admin</NavLink>
      </div>
    </div>
  )
};

export default NavBar;
