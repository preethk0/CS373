import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBarItem = ({ to, title }) => {
  return (
    <span>
      <Link to={to}>{title}</Link>
    </span>
  );
};

export default NavBarItem;
