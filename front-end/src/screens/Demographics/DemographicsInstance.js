import React from "react";
import DemographicsData from "./DemographicsData";
import { useParams } from "react-router";
import "./DemographicsInstance.css";
import { convertStringArrayToArray } from "../../utils";
import countryToCode from "../../countryToCode";

const DemographicsInstance = ({}) => {
  const { country: country_id } = useParams();

  const data =
    country_id in DemographicsData ? DemographicsData[country_id] : null;
  const languages = data
    ? convertStringArrayToArray(data.country_languages)
    : null;
  const countriesWithSimilarPopulation = data
    ? convertStringArrayToArray(data.countries_with_similar_pop)
    : null;

  return (
    <>
      <div className="subNavBar">
        <h1>Demographics of the World</h1>
        <text>
          <a href={"/demographics/"}>{"View All"}</a>
        </text>
      </div>
      {!data ? (
        <div style={{ marginTop: 40, marginLeft: 70 }}>
          Data for this model instance is not present in Phase 1, will be
          present in the next phase.
        </div>
      ) : (
        <div
          class="row justify-content-center"
          style={{ marginLeft: 70, paddingBottom: 30 }}
        >
          <h1 class="countryName">
            {data.country_name} {data.country_flag_emoji}
          </h1>
          <div
            class="col"
            style={{ paddingLeft: 10, marginTop: 20, marginBottom: 20 }}
          >
            <img
              src={data.country_flag}
              width="650"
              height="400"
              style={{ marginLeft: -25 }}
            />
            <div className="linksToModules">
              <h4> Interested to learn more about {data.country_name}?</h4>
              <text>
                Check out the{" "}
                <a href={"/geography/" + country_id}>{"Geography"}</a> of this
                country!
              </text>
              <br />
              <text>
                Check out the{" "}
                <a href={"/foodandtourism/" + country_id}>
                  {"Food and Tourism"}
                </a>{" "}
                of this country!
              </text>
            </div>
          </div>
          <div class="col">
            <p class="card-text">
              <b>Capital: </b>
              {data.country_capital}
            </p>
            <p class="card-text">
              <b>Population: </b>
              {data.country_population.toLocaleString()}
            </p>
            <p class="card-text">
              <b>Languages: </b>
              {languages.join(", ")}
            </p>
            <p class="card-text">
              <b>Calling Code: </b>
              {data.country_calling_code}
            </p>
            <p class="card-text">
              <b>Top-level Domain: </b>
              {data.country_domain}
            </p>
            <p class="card-text">
              <b>Number of states:</b> {data.country_states}
            </p>
            <p class="card-text">
              <b>Currency: </b>
              {data.country_currency}
            </p>
            <p class="card-text">
              <b>Income Level: </b>
              {data.country_income_level}
            </p>
            <p class="card-text">
              <b>Countries with similar population: </b>
              {countriesWithSimilarPopulation.map((country, idx) => {
                if (country in countryToCode)
                  return (
                    <a href={"/geography/" + countryToCode[country]}>
                      {country}
                      {idx < countriesWithSimilarPopulation.length - 1 && ", "}
                    </a>
                  );
                return (
                  <text>
                    {country}
                    {idx < countriesWithSimilarPopulation.length - 1 && ", "}
                  </text>
                );
              })}
            </p>
            <p
              style={{
                fontSize: 12,
                color: "gray",
                marginTop: -12,
                marginBottom: 40,
              }}
            >
              Find out more about the land area and overall geography of
              countries with similar populations!
            </p>
            <iframe
              src={data.country_demographics_video_src}
              style={{ width: 450, height: 300 }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DemographicsInstance;
