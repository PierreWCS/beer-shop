import React from "react";
import LogOut from "./LogOut";
import { Link } from "react-router-dom";
import "./MyAccount.css";
import { faHistory, faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MyAccount = ({ user }) => {
  return (
    <div className="myAccountContainer">
      <div className="scrollingMenuContentContainer">
        <h3>Menu</h3>
        <hr className="separatorScrollingMenu" />
        <Link to="my-orders" className="linkContainerAccountMenu">
          <FontAwesomeIcon
            icon={faShoppingBag}
            className="iConOrdersAccount fa-2x"
          />
          <p className="linkAccountMenu">My orders</p>
        </Link>
        <div className="linkContainerAccountMenu">
          <LogOut />
        </div>
        {user ? <p>Connected as {user.lastname}</p> : <p>no user</p>}
      </div>
    </div>
  );
};

export default MyAccount;
