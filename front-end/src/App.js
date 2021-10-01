import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.js";
import "./App.css";
import DemographicsAll from "./screens/Demographics/DemographicsAll";
import HomeSplash from "./screens/HomeSplash/HomeSplash.js";
import GeographyAll from "./screens/Geography/GeographyAll.js";
import FoodAndTourismAll from "./screens/FoodAndTourism/FoodAndTourismAll.js";
import About from "./screens/About/About.js";
import DemographicsInstance from "./screens/Demographics/DemographicsInstance";

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomeSplash} />
        <Route exact path="/about" component={About} />
        <Route exact path="/demographics" component={DemographicsAll} />
        <Route exact path="/geography" component={GeographyAll} />
        <Route exact path="/foodandtourism" component={FoodAndTourismAll} />
        <Route path="/demographics/:country" component={DemographicsInstance} />
      </Switch>
    </Router>
  );
}

export default App;
