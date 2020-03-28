import React, { useState } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";
import './LogOut.css';

const LogOut = () => {
  const { userStateDisconnect, user } = useGlobalState();
  const [redirection, setRedirection] = useState(null);

  const disconnect = () => {
    localStorage.setItem("userStorage", JSON.stringify(null));
    userStateDisconnect();
    setTimeout(() => setRedirection(<Redirect to="/" />), 500);
    setTimeout(() => window.location.reload(), 700);
  };
  return (
    <div>
      {redirection}

      {user ? (
        <div className="logOutContainer">
          <FontAwesomeIcon onClick={disconnect} color={'#282c34'} icon={faSignOutAlt} className="fa-2x disconnectIcon" />
          <p className="disconnectMessage">Log out</p>
        </div>
      ) : null}
    </div>
  );
};

export default LogOut;
