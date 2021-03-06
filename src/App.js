import React, { useEffect, useState } from "react";
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
import Newsletter from "./components/Admin/AdminNewsletter/Newsletter";
import Medias from "./components/Admin/Medias/Medias";
import Orders from "./components/Admin/Orders/Orders";
import MyOrders from "./components/NavBar/MyOrders/MyOrders";

function App() {
  const { width } = useWindowDimensions();
  const { userStateConnect, user, userCart } = useGlobalState();
  const [cartReceived, setCartReceived] = useState(false);
  const [userStorage] = useState(localStorage.getItem("userStorage"));
  const [userCartStorage] = useState(localStorage.getItem("clientCart"));

  useEffect(() => {
    setGlobal().then(() => setCartReceived(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setGlobal = async () => {
    await userCart(JSON.parse(userCartStorage));
    userStateConnect(JSON.parse(userStorage));
  };

  return (
    <Router>
      <div className="App">
        {cartReceived ? width > 1060 ? <NavBar /> : <NavBarMobile /> : null}
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/about" component={About} />
          <Route path="/cart" component={Cart} />
          <Route path="/products" component={ProductsList} />
          <Route path="/login" component={LoginSignup} />

          {/*     If the user is connected as an admin, these URL exists     */}
          {user && user.role === "admin" ? (
            <>
              <Route path="/admin" component={Admin} />
              <Route path="/admin-products" component={AdminProducts} />
              <Route path="/admin-sales" component={Orders} />
              <Route path="/admin-messages" component={AdminMessages} />
              <Route path="/admin-medias" component={Medias} />
              <Route path="/admin-subscribers" component={Newsletter} />
            </>
          ) : null}
          {user && user.role === "visitor" ? (
            <Route path="/my-orders" component={MyOrders} />
          ) : null}

          <Route component={ErrorPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
