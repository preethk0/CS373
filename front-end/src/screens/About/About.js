import React from "react";
import "./About.css";

// Description of site (purpose, intended users)
// Explanation of the interesting result of integrating disparate data (idk what this means tbh)
// Name, photo, bio, major responsibilities (ex: frontend vs backend team), # of commits, issues, and unit tests contributed of each team member
// Total # of commits, issues, and unit tests
// Links to APIs and additional data sources, and how each was scraped
// Tools used and a description of how they were used

const About = ({}) => {
  return (
    <div className="mainPage">
      <h1 className="header">About Us</h1>
      <p className="descriptionText">
        Around the World is a website that provides information about different
        countries around the world, such as basic facts and demographics,
        geography, major landmarks, tourism and traditional food dishes of each
        country. We hope to be able to provide the knowledge needed for people
        to be more mindful and accepting of different cultures, as well as
        understand different perspectives and ways of life.
      </p>
    </div>
  );
};

export default About;
