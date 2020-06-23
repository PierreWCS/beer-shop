import React, { useState } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";
import "./LogOut.css";

const LogOut = () => {
  const { userStateDisconnect, user } = useGlobalState();
  const [redirection, setRedirection] = useState(null);

  const disconnect = () => {
    localStorage.setItem("userStorage", JSON.stringify(null));
    userStateDisconnect();
    setTimeout(() => setRedirection(<Redirect to="/" />), 500);
    setTimeout(() => window.location.reload(), 700);
  };
  if (user && user.role === "admin") {
    return (
      <div className="logOutMainContainer">
        {redirection}

        <div className="logOutContainerAdmin" onClick={disconnect}>
          <FontAwesomeIcon
            icon={faPowerOff}
            className="disconnectIconAdmin"
          />
          <p className="disconnectMessage">Log out</p>
        </div>
      </div>
    );
  } else if (user) {
    return (
      <div className="logOutMainContainer">
        {redirection}

        <div className="logOutContainer" onClick={disconnect}>
          <FontAwesomeIcon icon={faPowerOff} className="fa-2x disconnectIcon" />
          <p className="disconnectMessage">Log out</p>
        </div>
      </div>
    );
  } else return null;
};

export default LogOut;
