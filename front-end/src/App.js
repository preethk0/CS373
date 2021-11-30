import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.js";
import "./App.css";
import DemographicsAll from "./screens/Demographics/DemographicsAll";
import HomeSplash from "./screens/HomeSplash/HomeSplash.js";
import GeographyAll from "./screens/Geography/GeographyAll.js";
import FoodAndTourismAll from "./screens/FoodAndTourism/FoodAndTourismAll.js";
import About from "./screens/About/About.js";
import Search from "./screens/Search/Search.js";
import DemographicsInstance from "./screens/Demographics/DemographicsInstance";
import GeographyInstance from "./screens/Geography/GeographyInstance";
import FoodAndTourismInstance from "./screens/FoodAndTourism/FoodAndTourismInstance";
import OurVisualizations from "./screens/Visualizations/OurVisualizations.js";
import ProviderVisualizations from "./screens/Visualizations/ProviderVisualizations.js";

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomeSplash} />
        <Route exact path="/about" component={About} />
        <Route exact path="/demographics" component={DemographicsAll} />
        <Route exact path="/geography" component={GeographyAll} />
        <Route exact path="/foodandtourism" component={FoodAndTourismAll} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/our_visualizations" component={OurVisualizations} />
        <Route
          exact
          path="/provider_visualizations"
          component={ProviderVisualizations}
        />
        <Route path="/demographics/:country" component={DemographicsInstance} />
        <Route path="/geography/:country" component={GeographyInstance} />
        <Route
          path="/foodandtourism/:country"
          component={FoodAndTourismInstance}
        />
      </Switch>
    </>
  );
}

export default App;
