import React from "react";
import LogOut from "./LogOut";
import { Link } from "react-router-dom";
import "./MyAccount.css";
import {faShoppingBag, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyAccount = () => {
  return (
    <div className="myAccountContainer">
      <Link to="my-orders" className="linkContainerAccountMenu">
        <FontAwesomeIcon icon={faShoppingBag} className="fa-2x" />
        <p className="linkAccountMenu">
          Orders
        </p>
      </Link>
      <div className="linkContainerAccountMenu">
        <LogOut />
      </div>
    </div>
  );
};

export default MyAccount;
