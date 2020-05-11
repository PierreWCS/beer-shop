import React, {useEffect} from "react";
import "./PopUp.css";
// import { tada } from 'react-animations';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons";

const PopUp = ({ type, message, setDisplay, timeout }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay(false);
      console.log('End of the popup');
      document.body.style.overflow = "auto";
    }, timeout);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (type === "success") {
    return (
      <div className="popUpContainer">
        <p>{message}</p>
      </div>
    );
  } else if (type === "error") {
    return (
      <div className="popUpContainer">
        <p>{message}</p>
      </div>
    );
  } else {
    return null;
  }
};

export default PopUp;
