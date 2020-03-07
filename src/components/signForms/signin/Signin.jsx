import React, { useState, useRef } from "react";
import "../Sign.css";
import "./Signin.css";
import { Redirect } from "react-router-dom";
import { faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../formElements/Input";
import signIn from "../signInFetch";

const Signin = () => {
  const [infoMessage, setInfoMessage] = useState(null);
  const [redirection, setRedirection] = useState(null);
  const inputsRef = {
    lastname: useRef(null),
    firstname: useRef(null),
    email: useRef(null),
    phone: useRef(null),
    password: useRef(null),
    password_verification: useRef(null)
  };

  const checkSamePassword = function() {
    const { password, password_verification } = inputsRef;
    const samePassword =
      password.current.value === password_verification.current.value;
    const pwdClassList = password_verification.current.classList;
    samePassword ? pwdClassList.remove("error") : pwdClassList.add("error");
  };

  const formSubmit = function sendElementsInfoToVerifying(event) {
    event.preventDefault();

    // Clean de tout les inputs (enlever les bordures rouges d'erreur)
    Object.values(inputsRef).forEach(input =>
      input.current.classList.remove("error")
    );

    const myBody = {
      lastname: inputsRef.lastname.current.value,
      firstname: inputsRef.firstname.current.value,
      email: inputsRef.email.current.value,
      password: inputsRef.password.current.value,
      passwordVerification: inputsRef.password_verification.current.value,
      phone: inputsRef.phone.current.value,
      role: "visitor"
    };

    // Connexion (ref: signFetch.js)
    signIn(myBody).then(result => {
      const { alert, status, inputs } = result;

      setInfoMessage(alert);

      if (status === "ERROR") {
        if (inputs) {
          inputs.forEach(input => {
            inputsRef[input].current.classList.add("error");
          });
        }
      } else if (status === "SUCCESS") {
        setTimeout(() => setRedirection(<Redirect to="/sign-up" />), 2500);
      }
    });
  };

  return (
    <>
      <div className="sign-ctn">
        {redirection}
        <h1>Inscription</h1>
        {infoMessage && (
          <div className={`info--message ${infoMessage.type}`}>
            <FontAwesomeIcon icon={faInfoCircle} className="icon" />
            <span>{infoMessage.text}</span>
            <FontAwesomeIcon
              icon={faTimes}
              className="close"
              onClick={() => setInfoMessage(null)}
            />
          </div>
        )}
        <form
          className="sign-form"
          onSubmit={formSubmit}
          onChange={checkSamePassword}
        >
          <Input
            label={{ for: "signin-lastname", text: "Nom :" }}
            attributes={{
              type: "text",
              id: "signin-lastname",
              name: "lastname"
            }}
            reference={inputsRef.lastname}
          />
          <Input
            label={{ for: "signin-firstname", text: "Prénom :" }}
            attributes={{
              type: "text",
              id: "signin-firstname",
              name: "firstname"
            }}
            reference={inputsRef.firstname}
          />
          <Input
            label={{ for: "signin-email", text: "Email :" }}
            attributes={{ type: "email", id: "signin-email", name: "email" }}
            reference={inputsRef.email}
          />
          <Input
            label={{ for: "signin-telephone", text: "Téléphone :" }}
            attributes={{
              type: "tel",
              id: "signin-telephone",
              name: "telephone"
            }}
            reference={inputsRef.phone}
          />
          <Input
            label={{ for: "signin-password", text: "Mot de passe :" }}
            attributes={{
              type: "password",
              id: "signin-password",
              name: "password"
            }}
            reference={inputsRef.password}
          />
          <Input
            label={{
              for: "signin-password-verification",
              text: "Confirmer le mot de passe :"
            }}
            attributes={{
              type: "password",
              id: "signin-password-verification",
              name: "password-verification"
            }}
            reference={inputsRef.password_verification}
          />
          <button type="submit" className="btn">
            S'inscrire
          </button>
        </form>
      </div>
    </>
  );
};

export default Signin;
