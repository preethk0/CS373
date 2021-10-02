import React from "react";
import ModelCard from "../../components/Cards/ModelCard";
import DemographicsCoverImage from "../../images/DemographicsCoverImage.jpeg";
import GeographyCoverImage from "../../images/GeographyCoverImage.jpeg";
import FoodAndTourismCoverImage from "../../images/FoodAndTourismCoverImage.jpeg";

import "./HomeSplash.css";

const HomeSplash = ({}) => {
  return (
    <div className="overallPage">
      <div className="coverImageStyle">
        <h1 className="homeTitle">Around The World</h1>
      </div>
      <div className="cardsGrid">
        <ModelCard
          name="Demographics"
          description="Learn about the basic facts, demographics and statistics of countries around the world!"
          link="/demographics"
          photo={DemographicsCoverImage}
        />
        <ModelCard
          name="Geography"
          description="Gain a better understanding of the geography of various countries and how they connect to each other!"
          link="/geography"
          photo={GeographyCoverImage}
        />
        <ModelCard
          name="Food and Tourism"
          description="Explore the traditional dishes and culture of different countries and get a glimpse into their popular tourist attractions!"
          link="/foodandtourism"
          photo={FoodAndTourismCoverImage}
        />
      </div>
    </div>
  );
};

export default HomeSplash;
