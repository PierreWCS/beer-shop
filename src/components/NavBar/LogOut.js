import React, { useState } from "react";
import useGlobalState from "../../hooks/useGlobalState";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect } from "react-router-dom";

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
        <FontAwesomeIcon onClick={disconnect} color={'indianred'} icon={faSignOutAlt} className="fa-2x disconnectIcon" />
      ) : null}
    </div>
  );
};

export default LogOut;
