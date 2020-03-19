import React from "react";
import "./Admin.css";
import { Link } from "react-router-dom";
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
