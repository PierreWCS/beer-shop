import React, { useState, useRef } from "react";
import "../Sign.css";
import "./Signin.css";
import { faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Input from "../../formElements/Input";
import signIn from "../signInFetch";

const Signin = ({ setDisplayUi }) => {
  const [infoMessage, setInfoMessage] = useState(null);
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
        setTimeout(() => setDisplayUi('login'), 2500);
      }
    });
  };

  return (
    <>
      <div className="sign-ctn">
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
            label={{
              for: "signin-lastname",
              text: "Name:",
              className: "signInLabel"
            }}
            attributes={{
              type: "text",
              id: "signin-lastname",
              name: "lastname",
              placeholder: "Hoe"
            }}
            reference={inputsRef.lastname}
          />
          <Input
            label={{
              for: "signin-firstname",
              text: "Firstname:",
              className: "signInLabel"
            }}
            attributes={{
              type: "text",
              id: "signin-firstname",
              name: "firstname",
              placeholder: "John"
            }}
            reference={inputsRef.firstname}
          />
          <Input
            label={{
              for: "signin-email",
              text: "Email:",
              className: "signInLabel"
            }}
            attributes={{
              type: "email",
              id: "signin-email",
              name: "email",
              placeholder: "johnhoe@gmail.com"
            }}
            reference={inputsRef.email}
          />
          <Input
            label={{
              for: "signin-telephone",
              text: "Phone :",
              className: "signInLabel"
            }}
            attributes={{
              type: "tel",
              id: "signin-telephone",
              name: "telephone",
              placeholder: "0612345678"
            }}
            reference={inputsRef.phone}
          />
          <Input
            label={{
              for: "signin-password",
              text: "Password:",
              className: "signInLabel"
            }}
            attributes={{
              type: "password",
              id: "signin-password",
              name: "password",
              placeholder: "min 6 characters"
            }}
            reference={inputsRef.password}
          />
          <Input
            label={{
              for: "signin-password-verification",
              text: "Confirm the password:",
              className: "signInLabel"
            }}
            attributes={{
              type: "password",
              id: "signin-password-verification",
              name: "password-verification",
              className: "signInLabel",
              placeholder: "passwords must be the same"
            }}
            reference={inputsRef.password_verification}
          />
          <button type="submit" className="btn">
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Signin;
