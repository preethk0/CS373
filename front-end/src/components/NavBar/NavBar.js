import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import NavBarItem from "./NavBarItem";

const NavBar = ({}) => {
  return (
    <div className="overallBar">
      <NavBarItem to="/" title="Home" />
      <NavBarItem to="/cats" title="Test" />
      <NavBarItem to="/sheeps" title="Test1" />
      <NavBarItem to="/goats" title="Test3" />
    </div>
  );
};

export default NavBar;
