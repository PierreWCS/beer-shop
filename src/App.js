import React from 'react';
import './App.css';
import LandingPage from "./components/LandingPage/LandingPage";
import NavBar from "./components/NavBar/NavBar";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import About from "./components/About/About";
import Admin from "./components/Admin/Admin";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/about" component={About} />
          <Route path="/admin" component={Admin} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
