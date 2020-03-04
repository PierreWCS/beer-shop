import React from 'react';
import './Footer.css';
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <div className="footerMainContainer">
      <div className="footerSmallContainer">
        <h1 className="footerBigTitle">Wild Beers</h1>
        <h4 className="footerBigTitleSubtitle">Since 2019</h4>
        <img
          className="logoNavBar"
          src={require("../images/logo.png")}
          alt="logo"
        />
      </div>
      <div className="footerSmallContainer">
        <h2 className="footerSubtitle">Site navigation</h2>
        <Link to="/" className="linkFooter" >Home</Link>
        <Link to="/" className="linkFooter" >About</Link>
        <Link to="/" className="linkFooter" >Beers</Link>
      </div>
      <div className="footerSmallContainer">
        <h2 className="footerSubtitle">Find us</h2>
        <p className="footerInformation">At our store:</p>
        <p className="footerInformation">1214 Alcohol ST</p>
        <p className="footerInformation">Switzerland</p>
        <p className="footerInformation">From 9:00 to 20:00</p>
      </div>
    </div>
  )
};

export default Footer;
