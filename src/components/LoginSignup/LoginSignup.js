import React from 'react';
import './LoginSignup.css';
import Footer from "../Footer/Footer";

const LoginSignup = () => {
  return (
    <div>
      <div className="signupAndLoginContainer">
        <div className="signupContainerLoginPage">
          <form>
            <label htmlFor="">
              <input id="pswdLogin" type="text"/>
            </label>

          </form>
        </div>
        <div className="loginContainerLoginPage">
          <form>
            <label htmlFor="mailLogin">
              <input id="mailLogin" type="text"/>
            </label>
            <label htmlFor="pswdLogin">
              <input id="pswdLogin" type="text"/>
            </label>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  )
};

export default LoginSignup;
