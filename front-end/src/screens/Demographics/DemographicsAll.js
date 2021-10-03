import React from "react";
import DemographicsData from "./DemographicsData";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./DemographicsAll.css";
import CountryCard from "../../components/Cards/CountryCard";

const DemographicsAll = ({}) => {

  const formatNumbers = (number) => {
    return number.toLocaleString();
  }

  const getDemographics = (country) => {
    const demographics = DemographicsData[country];
    return (
      <div class="col-sm">
        <div class="card">
            <img class="card-img-top" src={demographics.country_flag} alt="country flag"/>
            <div class="card-body">
              <h3 class="card-title"> {demographics.country_name} </h3>
              <h6 class="card-subtitle mb-2 text-muted">{demographics.country_capital}</h6>
              <p class="card-text text-muted">Population: {formatNumbers(demographics.country_population)}</p>
              <a href={"/demographics/" + country} class="btn btn-primary">Learn More</a>
              </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mainPage">
      <h2 className="header">Demographics</h2>
      <p className="descriptionText">
        Looking to learn more about a certain country? This page can quickly locate 
        the country you're looking for and give you some basic information about it.
      </p>
      <div className="cardGrid">
          {Object.values(DemographicsData).map((country) => (
            <CountryCard {...country} />
          ))}
      </div>
    </div>
  );
};

{/* <a href={"/demographics/" + country}>{country}</a> */}

export default DemographicsAll;
