import React from "react";
import { Link } from "react-router-dom";
import "./NavBarItem.css";

const NavBarItem = ({ to, title }) => {
  return (
    <div className="item">
      <Link className="linkStyle" to={to}>
        {title}
      </Link>
    </div>
  );
};

export default NavBarItem;
