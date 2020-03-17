import React from "react";
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
import ProductPage from "./components/Products/ProductPage";

function App() {
  const { width } = useWindowDimensions();
  return (
    <Router>
      <div className="App">
        {width > 1060 ? <NavBar /> : <NavBarMobile />}
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/about" component={About} />
          <Route path="/admin" component={Admin} />
          <Route path="/cart" component={Cart} />
          <Route path="/sign-in" component={Signup} />
          <Route path="/sign-up" component={Signin} />
          <Route path="/admin-products" component={AdminProducts} />
          <Route path="/admin-messages" component={AdminMessages} />
          <Route path="/product-page" component={ProductPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
