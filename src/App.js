import React, { useState } from "react";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About/About";
import Admin from "./components/Admin/Admin";
import useWindowDimensions from "./components/services/useWindowDimensions";
import NavBarMobile from "./components/NavBar/NavBarMobile";
import Cart from "./components/Cart/Cart";
import Signup from "./components/signForms/signup/Signup";
import Signin from "./components/signForms/signin/Signin";
import AdminMessages from "./components/Admin/AdminMessages/AdminMessages";
import AdminProducts from "./components/Admin/AdminProducts/AdminProducts";
import ProductsList from "./components/Products/ProductsList";
import useGlobalState from "./hooks/useGlobalState";

function App() {
  const { width } = useWindowDimensions();
  const { userStateConnect, user } = useGlobalState();
  const [userStorage] = useState(localStorage.getItem("userStorage"));

  const setGlobal = () => {
    userStateConnect(JSON.parse(userStorage));
  };
  console.log(user);
  return (
    <Router>
      <div className="App">
        {width > 1060 ? <NavBar /> : <NavBarMobile />}
        <Switch>
          <Route onChange={setTimeout(() => setGlobal(), 500)} path="/">
            <Route path="/" exact component={LandingPage} />
            <Route path="/about" component={About} />

            <Route path="/cart" component={Cart} />
            <Route path="/sign-in" component={Signup} />
            <Route path="/sign-up" component={Signin} />
            {user && user.role === "admin" ? (
              <Route path="/admin" component={Admin} />
            ) : null}
            {user && user.role === "admin" ? (
              <Route path="/admin-products" component={AdminProducts} />
            ) : null}
            {user && user.role === "admin" ? (
              <Route path="/admin-messages" component={AdminMessages} />
            ) : null}
            <Route path="/products" component={ProductsList} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
