import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import PopUp from "../Popups/PopUp";

const Footer = () => {
  const [clientEmail, setClientEmail] = useState(null);
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [popUpType, setPopUpType] = useState(null);

  const handleChangeNewsletter = (event) => {
    setClientEmail(event.target.value);
  };

  const validateClientEmail = (e) => {
    e.preventDefault();
    let url = "http://localhost:8000/api/emails";

    function validateEmail(email) {
      let re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
    if (validateEmail(clientEmail)) {
      Axios({
        method: "post",
        url: url,
        data: {
          mail: clientEmail,
        },
      })
        .then((response) => {
          console.log(response);
          setClientEmail(null);
          setPopUpType("success");
          setDisplayPopUp(true);
          document.body.style.overflow = "hidden";
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setPopUpType("error");
      setDisplayPopUp(true);
      document.body.style.overflow = "hidden";
    }
  };

  return (
    <div className="footerMainContainer">
      <div className="footerContentContainer">
        <div className="footerSmallContainer footerNb1">
          <h1 className="footerBigTitle">Wild Beers</h1>
          <h4 className="footerBigTitleSubtitle">Since 2019</h4>
          <img
            className="logoNavBar"
            src={require("../images/logoBeer.png")}
            alt="logo"
          />
        </div>
        <div className="footerSmallContainer footerNb2">
          <h2 className="footerSubtitle">Site navigation</h2>
          <hr className="separatorFooter" />
          <Link to="/" className="linkFooter">
            Home
          </Link>
          <Link to="/about" className="linkFooter">
            About us
          </Link>
          <Link to="/products" className="linkFooter">
            Our beers
          </Link>
          <Link to="/login" className="linkFooter">
            Login / Register
          </Link>
        </div>
        <div className="footerSmallContainer footerNb3">
          <h2 className="footerSubtitle">Find us</h2>
          <hr className="separatorFooter" />
          <p className="footerInformation">At our store:</p>
          <p className="footerInformation">1214 Alcohol ST</p>
          <p className="footerInformation">Genève, Switzerland</p>
          <h2 className="footerSubtitle">Stay aware</h2>
          <hr className="separatorFooter" />
          <p className="footerInformation">Receive special offers</p>
          <form
            className="newsletterContainerFooter"
            onSubmit={validateClientEmail}
          >
            <input
              className="newsletterInputFooter"
              type="text"
              placeholder="E-mail"
              onChange={handleChangeNewsletter}
            />
            <button className="subscribeButtonFooter">Subscribe</button>
          </form>
        </div>
      </div>
      {displayPopUp ? (
        popUpType === "success" ? (
          <PopUp
            setDisplay={setDisplayPopUp}
            message="You successfully subscribed to our newsletter !"
            type="success"
            timeout="3000"
          />
        ) : (
          <PopUp
            setDisplay={setDisplayPopUp}
            message="Oops ! Your email is probably not correct"
            type="error"
            timeout="5000"
          />
        )
      ) : null}
      <p className="madeWithLove">
        Made with &#9829; by Pierre LEGRAIN !{" "}
        <a
          className="linkToGithub"
          rel="noopener noreferrer"
          href="https://github.com/PierreWCS/beer-shop"
          target="_blank"
        >
          Code here
        </a>
      </p>
    </div>
  );
};

export default Footer;
