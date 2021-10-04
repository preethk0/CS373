import React from "react";
import DemographicsData from "./DemographicsData";
import { useParams } from "react-router";

const DemographicsInstance = ({}) => {
  const { country } = useParams();
  console.log(country);

  return(
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="card text-center w-50">
          <div class="card-body">
              <h1 class="card-title"> {country} </h1>
              <img src = {DemographicsData[country].country_flag}/>
              <p class="card-text"> <b> Country Capital:</b> {DemographicsData[country].country_capital} </p>
              <p class="card-text"> <b> Country Population:</b> {DemographicsData[country].country_population} </p>
              <p class="card-text"> <b> Country World Share:</b> {DemographicsData[country].country_world_share} </p>
              <p class="card-text"> <b> Country Language:</b> {DemographicsData[country].country_language} </p>
              <p class="card-text"> <b> Country TimeZones:</b> {DemographicsData[country].country_timeZones} </p>
              <p class="card-text"> <b> Country Religions:</b> {DemographicsData[country].country_religions} </p>
              <p class="card-text"> <b> Country GDP:</b> {DemographicsData[country].country_GDP} </p>
              <p class="card-text"> <b> Country GDP Per Capita:</b> {DemographicsData[country].country_GDP_perCapita}</p>
              <p class="card-text"> <b> Country Currency:</b> {DemographicsData[country].country_currency} </p>
              <p class="card-text"> <b> Country Driving Side:</b> {DemographicsData[country].country_driving_side} </p>
              <p class="card-text"> <b> Country Calling Code:</b> {DemographicsData[country].country_calling_code} </p>
              <p class="card-text"> <b> Country Gov Type:</b> {DemographicsData[country].country_gov_type} </p>
          </div>
        </div>
      </div>
    </div>);
  
};

export default DemographicsInstance;
