import React, { useEffect, useState } from "react";
import "./Admin.css";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faEdit, faWindowClose} from "@fortawesome/free-solid-svg-icons";
import NewProduct from "./AdminProducts/NewProduct";
import { Link } from "react-router-dom";
import EditProduct from "./EditProduct";
import NavBarAdmin from "./NavBarAdmin/NavBarAdmin";

const Admin = () => {

  return (
    <div className="adminMainContainer">
      <NavBarAdmin />
      <h1 className="titleAdminPage">Manage your shop</h1>
      <Link className="backtoHomeAdminContainer" to="/">
        <img
          src={require("../images/logoBeer.png")}
          className="logoBackToHome"
          alt=""
        />
        Back to the site
      </Link>
    </div>
  );
};

export default Admin;
