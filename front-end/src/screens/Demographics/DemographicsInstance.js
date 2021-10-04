import React from "react";
import DemographicsData from "./DemographicsData";
import { useParams } from "react-router";
import "./DemographicsInstance.css";

const DemographicsInstance = ({}) => {
  const { country } = useParams();
  const data = DemographicsData[country];

  return (
    <><div className="subNavBar">
      <h1>Demographics of the World</h1>
      <text>
        <a href={"/demographics/"}>{"View All"}</a>
      </text>
    </div>
    <div className="mainPage">
        <div class="row justify-content-center align-items-center">
          <div class="card-container">
            <div class="card-body">
              <h1 class="countryName"> {data.country_name} </h1>
              <img src={data.country_flag} className="flag" />
            </div>
            <div class="card-text">
              <p class="card-text">
                <b>Capital: </b>
                {data.country_capital}
              </p>
              <p class="card-text">
                <b>Population: </b>
                {data.country_population.toLocaleString()}
              </p>
              <p class="card-text">
                <b>World Share: </b>
                {data.country_world_share}
              </p>
              <p class="card-text">
                <b>Languages: </b>
                {data.country_language.join(", ")}
              </p>
              <p class="card-text">
                <b>Time Zones: </b>
                {data.country_timeZones}
              </p>
              <p class="card-text">
                <b>Religions: </b>
                {data.country_religions.join(", ")}
              </p>
              <p class="card-text">
                <b>GDP:</b> {data.country_GDP}
              </p>
              <p class="card-text">
                <b>GDP Per Capita: </b>
                {data.country_GDP_perCapita}
              </p>
              <p class="card-text">
                <b>Currency: </b>
                {data.country_currency}
              </p>
              <p class="card-text">
                <b>Driving Side: </b>
                {data.country_driving_side}
              </p>
              <p class="card-text">
                <b>Calling Code: </b>
                {data.country_calling_code}
              </p>
              <p class="card-text">
                <b>Government Type: </b>
                {data.country_gov_type}
              </p>
            </div>
            <div className="linksToModules">
              <h4> Interested to learn more about {data.country_name}?</h4>
              <text>
                Check out the <a href={"/geography/" + country}>{"Geography"}</a> of
                this country
              </text>
              <br />
              <text>
                Check out the{" "}
                <a href={"/foodandtourism/" + country}>{"Food and Tourism"}</a> of
                this country
              </text>
            </div>
          </div>
        </div>
      </div></>
  );
};

export default DemographicsInstance;
