import React from "react";
import "./About.css";
import Footer from "../Footer/Footer";

const About = () => {
  return (
    <div className="aboutMainContainer">
      <div className="headerAbout" />

      {/*       Beer of the month       */}

      <div className="aboutUsContentContainer">
        <h1 className="beerOfTheMonth">BEER OF THE MONTH</h1>
        <div className="containerAboutAroundTheBeer">
          <div className="firstColumnAbout">
            <div className="1stContainerAbout">
              <h3 className="titleTextAbout leftText">
                CREAMY BUT NOT TOO MUCH
              </h3>
              <p className="smallTextAbout leftText">
                Lorem ipsum dolos sit amet, con sectur adiscing ejit. Aliter
                nulla in mourix
              </p>
            </div>
            <div className="2ndContainerAbout">
              <h3 className="titleTextAbout leftText">MELLOW ON THE BOOZE</h3>
              <p className="smallTextAbout leftText">
                Lorem ipsum dolos sit amet, con sectur adiscing ejit. Aliter
                moulki send our kiwli
              </p>
            </div>
          </div>
          <div>
            <img
              className="brownBeerAbout"
              src={require("../images/StoutBeer.png")}
              alt="beer"
            />
            <h2 className="beerNameAbout">THE WOOFLE BEER</h2>
          </div>
          <div className="secondColumnAbout">
            <div className="3rdContainerAbout">
              <h3 className="titleTextAbout rightText">HAS A DEEP WARMTH</h3>
              <p className="smallTextAbout rightText">
                Lorem ipsum dolos sit amet, con sectur adiscing ejit. Aoijur con
                sectur adiscing con sectur adiscing ipsum dolos sit amet
              </p>
            </div>
            <div className="4thContainerAbout">
              <h3 className="titleTextAbout rightText">A CHOCOLATE SMOOTH</h3>
              <p className="smallTextAbout rightText">
                Lorem ipsum dolos sit amet, con sectur adiscing ejit. Aliter
                nulla in mourix ipsum dolos sit amet lorem ipsum quid de not
                attemps ipsum dolos sit amet
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*       Contact       */}

      <div className="formSectionAbout">
        <h1 className="contactUsTitle">Contact us</h1>
        <form className="formContainerAbout">
          <div className="nameFirstNameContainer">
            <label htmlFor="name">
              <input placeholder="name..." className="nameAndFirstNameInput" type="text" id="name" />
            </label>
            <label htmlFor="firstName">
              <input placeholder="firstname..." className="nameAndFirstNameInput" type="text" id="firstName" />
            </label>
          </div>
          <label htmlFor="email">
            <input placeholder="email..." className="mailInputAbout" type="mail" id="email" />
          </label>
          <label htmlFor="message">
            <input placeholder="message..." className="messageInputAbout" type="text" id="message" />
          </label>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default About;
