import React from 'react';
import {Link, NavLink} from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
  return (
      <div className="navBarContainer">
        <Link to="/" className="logoAndNameNavBar">
          <img className="logoNavBar" src={require('../images/logoBeer.png')} alt="logo"/>
        </Link>
        <div className="navLinkContainer">
          <NavLink activeClassName="activeItemNavBar" className="itemNavBar" to="/products">BEERS</NavLink>
          <NavLink activeClassName="activeItemNavBar" className="itemNavBar" to="/about">ABOUT US</NavLink>
          <NavLink activeClassName="activeItemNavBar" className="itemNavBar" to="/admin">ADMIN</NavLink>
        </div>
      </div>
  )
};

export default NavBar;
