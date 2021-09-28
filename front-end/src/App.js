import React from "react";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.js";
import "./App.css";

function App() {
  return (
    <Router>
      <NavBar />
    </Router>
  );
}

export default App;
