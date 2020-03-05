import React from "react";
import "./About.css";
import Footer from "../Footer/Footer";

const About = () => {
  return (
    <div className="aboutMainContainer">
      <div className="headerAbout" />

      {/*       Contact       */}

      <div className="formSectionAbout">
        <h1 className="contactUsTitle">Contact us</h1>
        <form className="formContainerAbout">
          <div className="nameFirstNameContainer">
            <label htmlFor="name">
              <input required placeholder="name..." className="nameAndFirstNameInput" type="text" id="name" />
            </label>
            <label htmlFor="firstName">
              <input required placeholder="firstname..." className="nameAndFirstNameInput" type="text" id="firstName" />
            </label>
          </div>
          <label htmlFor="email">
            <input required placeholder="email..." className="mailInputAbout" type="mail" id="email" />
          </label>
          <label htmlFor="message">
            <input required placeholder="message..." className="messageInputAbout" type="text" id="message" />
          </label>
        </form>
        <button className="aboutUsButton formButton">Send</button>
      </div>
      <Footer />
    </div>
  );
};

export default About;
