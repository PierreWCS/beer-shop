import React, {useState} from 'react';
import './LoginSignup.css';
import Footer from "../Footer/Footer";
import Signup from "../signForms/signup/Signup";
import Signin from "../signForms/signin/Signin";

const LoginSignup = () => {
  const [displayUi, setDisplayUi] = useState('login');
  return (
      <div className="signupAndLoginMainContainer">
        <div className="signupAndLoginContainer">
          <div className="imageContainerLoginPage">
            <h1 className="titleLogin">Wild Beers</h1>
            <p className="subTitleLogin">Since 2019</p>
          </div>
          <div className="loginContainerLoginPage">
            <div className="displaySelectorContainer">
              <p className={`signInButton ${displayUi === 'login' ? 'activeButtonLogin' : null}`} onClick={() => setDisplayUi('login')}>Sign in</p>
              <p style={{ color: "#a1a1a1"}}>or</p>
              <p className={`registerButton ${displayUi === 'register' ? 'activeButtonLogin' : null}`} onClick={() => setDisplayUi('register')}>Create an account</p>
            </div>
            {
              displayUi === 'register' ?
                <Signin setDisplayUi={setDisplayUi} />
                :
                <Signup />
            }
          </div>
        </div>
      <Footer />
    </div>
  )
};

export default LoginSignup;
