import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./NavBarAdmin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faWineBottle, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

const NavBarAdmin = () => {
  const [messages, setMessages] = useState(null);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getMessagesAndProducts();
  }, []);

  const getMessagesAndProducts = () => {
    Axios.get("http://localhost:8000/api/messages")
      .then(result => result.data)
      .then(data => {
        let stockMessages = data;
        setMessages(stockMessages);
      });
    Axios.get("http://localhost:8000/api/products")
      .then(result => result.data)
      .then(data => {
        let stockProducts = data;
        setProducts(stockProducts);
      });
  };

  return (
    <div className="navBarAdminContainer">
      <NavLink
        activeClassName="activeItemListNavBarAdmin"
        className="itemListNavBarAdmin"
        to="/admin"
      >
        <FontAwesomeIcon className="iconNavBarAdmin" icon={faHome} />
        Admin panel
      </NavLink>
      <NavLink
        activeClassName="activeItemListNavBarAdmin"
        className="itemListNavBarAdmin"
        to="/admin-products"
      >
        <FontAwesomeIcon className="iconNavBarAdmin" icon={faWineBottle} />
        Products
        {products ? (
          <p className="messageNumberAdminNavBar">{products.length}</p>
        ) : null}
      </NavLink>
      <NavLink
        activeClassName="activeItemListNavBarAdmin"
        className="itemListNavBarAdmin"
        to="/admin-messages"
      >
        <FontAwesomeIcon className="iconNavBarAdmin" icon={faEnvelope} />
        Messages
        {messages ? (
          <p className="messageNumberAdminNavBar">{messages.length}</p>
        ) : null}
      </NavLink>
    </div>
  );
};

export default NavBarAdmin;
