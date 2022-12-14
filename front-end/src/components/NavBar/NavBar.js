import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./NavBar.css";

const NavBar = ({}) => {
  return (
    <Navbar bg="dark" variant="dark" className="overallBar">
      <Navbar.Brand href="/">
        <b>Around the World</b>
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/about">About Us</Nav.Link>
        <Nav.Link href="/demographics">Demographics</Nav.Link>
        <Nav.Link href="/geography">Geography</Nav.Link>
        <Nav.Link href="/foodandtourism">Food & Tourism</Nav.Link>
        <Nav.Link href="/our_visualizations">Our Visualizations</Nav.Link>
        <Nav.Link href="/provider_visualizations">
          Provider Visualizations
        </Nav.Link>
        <Nav.Link href="/search">Search</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
