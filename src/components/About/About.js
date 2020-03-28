import React, { useState } from "react";
import "./About.css";
import Footer from "../Footer/Footer";
import Axios from "axios";
import { Redirect } from "react-router-dom";

const About = () => {
  const [messageTitle, setMessageTitle] = useState(null);
  const [messageMail, setMessageMail] = useState(null);
  const [messageName, setMessageName] = useState(null);
  const [messageFirstName, setMessageFirstName] = useState(null);
  const [messageBody, setMessageBody] = useState(null);
  const [redirection, setRedirection] = useState(false);

  const handleChangeTitle = event => {
    setMessageTitle(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeMail = event => {
    setMessageMail(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeName = event => {
    setMessageName(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeFirstName = event => {
    setMessageFirstName(event.target.value);
    console.log(event.target.value);
  };

  const handleChangeBody = event => {
    setMessageBody(event.target.value);
    console.log(event.target.value);
  };

  const addNewMessage = () => {
    let url = "http://localhost:8000/api/messages";
    if (
      messageTitle &&
      messageMail &&
      messageName &&
      messageFirstName &&
      messageBody
    ) {
      Axios({
        method: "post",
        url: url,
        data: {
          title: messageTitle,
          mail: messageMail,
          name: messageName,
          firstname: messageFirstName,
          body: messageBody
        }
      })
        .then(response => console.log(response))
        .catch(error => {
          console.log(error);
        });
      alert("Your message has been sent");
      setRedirection(true);
    } else alert("Fields need to be completed");
  };

  return (
    <div className="aboutMainContainer">
      <div className="headerAbout" />
      <div>
        <h1 className="aboutUsTitlePage">ABOUT US</h1>
      </div>
      <div className="aboutUsContainerText">
        <img
          className="breweryAboutUs"
          src={require("../images/breweryAboutUsSince.jpg")}
          alt=""
        />
        <div className="textAboutUsSmallContainer">
          <h1 className="titleAboutUsText">Wild Beers</h1>
          <h3 className="smallSubtitleAbout">Since 2019</h3>
          <p className="textHistoryAbout">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
            ut sollicitudin nunc, eu tempor augue. Aenean lobortis suscipit purus
            fermentum hendrerit. Nunc posuere pellentesque libero eget mollis. Sed
            diam ante, varius a pellentesque vel, auctor sit amet neque. Duis
            facilisis lectus sit amet purus maximus, ut mattis magna fermentum.
            Mauris ultrices justo dolor, in congue mi aliquam vel. Donec
            pellentesque libero ut dolor ultricies auctor.{" "}
          </p>
        </div>
      </div>

      {/*       Contact       */}

      <div className="formSectionAbout">
        <h1 className="contactUsTitle">Contact us</h1>
        <hr className="separatorCart separatorFormAbout" />
        <form className="formContainerAbout">
          <label htmlFor="title">
            <input
              onChange={handleChangeTitle}
              required
              placeholder="title..."
              className="titleInput inputAboutAll"
              type="text"
              id="title"
            />
          </label>
          <div className="nameFirstNameContainer">
            <label htmlFor="name">
              <input
                onChange={handleChangeName}
                required
                placeholder="name..."
                className="nameAndFirstNameInput inputAboutAll"
                type="text"
                id="name"
              />
            </label>
            <label htmlFor="firstName">
              <input
                onChange={handleChangeFirstName}
                required
                placeholder="firstname..."
                className="nameAndFirstNameInput inputAboutAll"
                type="text"
                id="firstName"
              />
            </label>
          </div>
          <label htmlFor="email">
            <input
              onChange={handleChangeMail}
              required
              placeholder="email..."
              className="mailInputAbout inputAboutAll"
              type="mail"
              id="email"
            />
          </label>
          <label htmlFor="message">
            <textarea
              onChange={handleChangeBody}
              required
              placeholder="message..."
              className="messageInputAbout inputAboutAll"
              type="text"
              id="message"
            />
          </label>
        </form>
        <button onClick={addNewMessage} className="aboutUsButton formButton">
          Send
        </button>
      </div>
      {redirection ? <Redirect to="/" /> : null}
      <Footer />
    </div>
  );
};

export default About;
