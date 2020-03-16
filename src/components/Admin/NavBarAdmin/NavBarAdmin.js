import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBarAdmin.css";
import Axios from "axios";

const NavBarAdmin = () => {
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    getMessages();
  }, []);

  const getMessages = () => {
    Axios.get("http://localhost:8000/api/messages")
      .then(result => result.data)
      .then(data => {
        let stockMessages = data;
        setMessages(stockMessages);
      });
  };

  return (
    <div className="navBarAdminContainer">
      <NavLink
        activeClassName="activeItemListNavBarAdmin"
        className="itemListNavBarAdmin"
        to="/admin"
      >
        Admin panel
      </NavLink>
      <NavLink
        activeClassName="activeItemListNavBarAdmin"
        className="itemListNavBarAdmin"
        to="/admin-products"
      >
        Products
      </NavLink>
      <NavLink
        activeClassName="activeItemListNavBarAdmin"
        className="itemListNavBarAdmin"
        to="/admin-messages"
      >
        Messages{messages ? <p className="messageNumberAdminNavBar">{messages.length}</p> : null}
      </NavLink>
    </div>
  );
};

export default NavBarAdmin;
