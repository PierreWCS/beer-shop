import React, { useEffect } from "react";
import "./PopUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";

const PopUp = ({ type, message, setDisplay, timeout }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay(false);
      document.body.style.overflow = "auto";
    }, timeout);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (type === "success") {
    return (
      <div className="popUpContainer">
        <div className="popUpMessageContainer">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="fa-4x"
            color="#55efc4"
          />
          <p>{message}</p>
        </div>
      </div>
    );
  } else if (type === "error") {
    return (
      <div className="popUpContainer">
        <div className="popUpMessageContainer">
          <FontAwesomeIcon
            icon={faExclamationCircle}
            className="fa-4x"
            color="#d63031"
          />
          <p>{message}</p>
        </div>
      </div>
    );
  } else if (type === "cart add") {
    return (
      <div className="popUpContainer">
        <div className="popUpMessageContainer">
          <FontAwesomeIcon
            icon={faCartPlus}
            className="fa-4x"
            color="#55efc4"
          />
          <p>{message}</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default PopUp;
