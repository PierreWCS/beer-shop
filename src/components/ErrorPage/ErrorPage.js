import React from 'react';
import './ErrorPage.css';
import {Link} from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="errorPageMainContainer">
      <h1 className="oopsErrorPage">Oops</h1>
      <h3>404 - PAGE NOT FOUND</h3>
      <p>There is nothing there</p>
      <Link className="backToHomeErrorPage" to="/">Back to homepage</Link>
    </div>
  )
};

export default ErrorPage;
