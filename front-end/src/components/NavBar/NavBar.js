import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import NavBarItem from "./NavBarItem";

const NavBar = ({}) => {
  return (
    <div className="overallBar">
      <NavBarItem to="/" title="Home" />
      <NavBarItem to="/cats" title="Demographics" />
      <NavBarItem to="/sheeps" title="Geography" />
      <NavBarItem to="/goats" title="Food & Tourism" />
    </div>
  );
};

export default NavBar;
