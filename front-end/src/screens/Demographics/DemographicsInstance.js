import React from "react";
import DemographicsData from "./DemographicsData";
import { useParams } from "react-router";

const DemographicsInstance = ({}) => {
  const { country } = useParams();
  console.log(country);
  const data = DemographicsData[country]

  return(
    
    <div class="container">
      <div class="row justify-content-center align-items-center">
        <div class="card text-center w-50">
          <div class="card-body">
              <h1 class="card-title"> {DemographicsData[country].country_name} </h1>
              <img src = {DemographicsData[country].country_flag} width="300" height="200"/>
              <p class="card-text"> <b> Country Capital:</b> {DemographicsData[country].country_capital} </p>
              <p class="card-text"> <b> Country Population:</b> {DemographicsData[country].country_population.toLocaleString()} </p>
              <p class="card-text"> <b> Country World Share:</b> {DemographicsData[country].country_world_share} </p>
              <p class="card-text"> <b> Country Language:</b> {DemographicsData[country].country_language.join(", ")} </p>
              <p class="card-text"> <b> Country TimeZones:</b> {DemographicsData[country].country_timeZones} </p>
              <p class="card-text"> <b> Country Religions:</b> {DemographicsData[country].country_religions.join(", ")} </p>
              <p class="card-text"> <b> Country GDP:</b> {DemographicsData[country].country_GDP} </p>
              <p class="card-text"> <b> Country GDP Per Capita:</b> {DemographicsData[country].country_GDP_perCapita} </p>
              <p class="card-text"> <b> Country Currency:</b> {DemographicsData[country].country_currency} </p>
              <p class="card-text"> <b> Country Driving Side:</b> {DemographicsData[country].country_driving_side} </p>
              <p class="card-text"> <b> Country Calling Code:</b> {DemographicsData[country].country_calling_code} </p>
              <p class="card-text"> <b> Country Gov Type:</b> {DemographicsData[country].country_gov_type} </p>
          </div>
          <div className="LinksToModules">
              <h4> Interested to learn more about {DemographicsData[country].country_name}?</h4>
              <text>Check out the <a href={"/geography/" + country}>{"Geography"}</a> of this country</text><br/>
              <text>Check out the <a href={"/foodandtourism/" + country}>{"Food and Tourism"}</a> of this country</text>
        </div>
        </div>
      </div>
    </div> 
    
);
  
};

export default DemographicsInstance;
