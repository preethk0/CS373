import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.js";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        {/* <Route exact path="/" component={Splash} />
        <Route exact path="/demographics" component={DemographicsAll} />
        <Route exact path="/geography" component={GeographyAll} />
        <Route exact path="/foodandtourism" component={FoodAndTourismAll} /> */}
      </Switch>
    </Router>
  );
}

export default App;
