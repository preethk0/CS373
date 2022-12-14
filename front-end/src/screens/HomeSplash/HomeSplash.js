import React, { useState } from "react";
import ModelCard from "../../components/Cards/ModelCard";
import { FaChevronDown } from "react-icons/fa";

import "./HomeSplash.css";
import { useHistory } from "react-router-dom";

const HomeSplash = ({}) => {
  const history = useHistory();

  const [search, setSearch] = useState(0);

  const onSubmit = () => {
    history.push(`/search?search=${search}`);
  };

  return (
    <div className="overallPage">
      <div className="coverImageStyle">
        <h1 className="homeTitle">Around The World</h1>
        <h3 className="homeSubtitle">
          Explore the world from the comfort of your home!
        </h3>
        <div class="input-group input-group-sm mb-3 w-50">
          <input
            type="search"
            class="form-control"
            placeholder="Search our website!"
            style={{ height: 46, marginTop: 6.5 }}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => {
              if (e.key == "Enter") {
                onSubmit();
              }
            }}
          />
          <div class="input-group-append">
            <button class="btn btn-primary" type="button" onClick={onSubmit}>
              Search
            </button>
          </div>
        </div>
        <a class="ct-btn-scroll ct-js-btn-scroll" href="#home">
          <FaChevronDown size={60} color="white" />
        </a>
      </div>
      <section id="home">
        <div className="cardsGrid">
          <ModelCard
            name="Demographics"
            description="Learn about the basic facts, demographics and statistics of countries around the world!"
            link="/demographics"
            photo="/images/DemographicsCoverImage.png"
          />
          <ModelCard
            name="Geography"
            description="Gain a better understanding of the geography of various countries and how they connect to each other!"
            link="/geography"
            photo="/images/GeographyCoverImage.png"
          />
          <ModelCard
            name="Food and Tourism"
            description="Explore the traditional dishes and culture of different countries and get a glimpse into their popular tourist attractions!"
            link="/foodandtourism"
            photo="/images/FoodAndTourismCoverImage.png"
          />
        </div>
      </section>
    </div>
  );
};

export default HomeSplash;
