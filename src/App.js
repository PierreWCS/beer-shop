import React, {useEffect, useState} from "react";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./components/About/About";
import Admin from "./components/Admin/Admin";
import useWindowDimensions from "./components/services/useWindowDimensions";
import NavBarMobile from "./components/NavBar/NavBarMobile";
import Cart from "./components/Cart/Cart";
import AdminMessages from "./components/Admin/AdminMessages/AdminMessages";
import AdminProducts from "./components/Admin/AdminProducts/AdminProducts";
import ProductsList from "./components/Products/ProductsList";
import useGlobalState from "./hooks/useGlobalState";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import LoginSignup from "./components/LoginSignup/LoginSignup";

function App() {
  const { width } = useWindowDimensions();
  const { userStateConnect, user } = useGlobalState();
  const [userStorage] = useState(localStorage.getItem("userStorage"));

  useEffect(() => {
    const setGlobal = () => {
      userStateConnect(JSON.parse(userStorage));
    };
    setGlobal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <div className="App">
        {width > 1060 ? <NavBar /> : <NavBarMobile />}
        <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/about" component={About} />

            <Route path="/cart" component={Cart} />
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
            <Route path="/login" component={LoginSignup} />
            <Route component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
