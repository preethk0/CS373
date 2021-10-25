import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useAxios from "axios-hooks";
import "./FoodAndTourismInstance.css";
import { convertStringArrayToArray } from "../../utils";
import codeToCountry from "../../countryData/codeToCountry";
import { Spinner } from "react-bootstrap";
import {
  demographicCountryCodes,
  demographicCountryNames,
} from "../../countryData/demographicsCountries";
import { geographyCountryCodes } from "../../countryData/geographyCountries";

const FoodAndTourismInstance = ({}) => {
  const { country } = useParams();

  const [data, setData] = useState({});

  const [{ data: countryData, loading, error }] = useAxios(
    `http://api.around-the-world.me/foodandtourism/${country}`
  );

  useEffect(() => {
    if (countryData) {
      setData(countryData);
    }
  }, [countryData]);

  const main_dishes = convertStringArrayToArray(data.country_main_dishes);
  const main_dishes_images = convertStringArrayToArray(
    data.country_main_dishes_images
  );
  const countriesWithSimilarTourists = data
    ? convertStringArrayToArray(data.country_similar_tourist_countries_data)
    : null;
  const tourism_video = (data.country_tourism_video_src || "").replace(
    "watch?v=",
    "embed/"
  );

  const hasDemographics = demographicCountryCodes.includes(country);
  const hasGeography = geographyCountryCodes.includes(country);

  return (
    <>
      <div className="subNavBar">
        <h1>Food and Tourism of the World</h1>
        <text>
          <a href={"/foodandtourism/"}>View All</a>
        </text>
      </div>
      {!data ? (
        <div style={{ marginTop: 40, marginLeft: 70 }}>
          Data for this model instance is not present in Phase 1, will be
          present in the next phase.
        </div>
      ) : Object.keys(data).length > 0 ? (
        <div
          class="row justify-content-center"
          style={{
            marginLeft: 60,
            paddingBottom: 30,
            paddingTop: 20,
            paddingRight: 60,
          }}
        >
          <h1 class="countryName">{data?.country_name}</h1>
          <div class="col" style={{ paddingLeft: 0 }}>
            <div class="card-body">
              <h3 class="card-title">Food</h3>
              <p class="card-text">
                <b>Main Agricultural Export: </b>{" "}
                {data?.country_agricultural_exports ?? ""}
              </p>
              <p class="card-text">
                <b>Main Dishes: </b>
                {main_dishes.join(", ")}
              </p>
              {main_dishes_images.map((image, idx) => (
                <img key={idx} src={image} className="foodImage" />
              ))}
            </div>
          </div>
          <div class="col-4">
            <div class="card-body">
              <h3 class="card-title">Tourism</h3>
              <p class="card-text">
                <b>Main Attraction: </b>
                {data.country_main_attraction}
              </p>
              <p>
                <img
                  src={data.country_main_attraction_image_src}
                  className="foodImage"
                />
              </p>
              <p class="card-text">
                <b>Number of Tourists (per year): </b>
                {(data?.country_number_of_tourists ?? "0").toLocaleString()}
              </p>
              <p class="card-text">
                <b>Revenue from Tourism (per year): </b> $
                {(data?.country_tourism_revenue ?? "0").toLocaleString()}
              </p>
              <p class="card-text">
                <b>Percent of GDP accounted for by tourism: </b>
                {(data?.country_tourism_percent_GDP ?? "0").toLocaleString()}%
              </p>
              <p class="card-text">
                <b>Temperature of warmest month: </b>
                {data?.country_warmest_month_temp ?? 0} °C
              </p>
              <p class="card-text">
                <b>Temperature of coldest month: </b>
                {data?.country_coldest_month_temp ?? 0} °C
              </p>
            </div>
          </div>
          <div class="col">
            <div class="card-body">
              <p class="card-text">
                <iframe width="500" height="300" src={tourism_video}></iframe>
              </p>
              {(hasDemographics || hasGeography) && (
                <div className="linksToModules" style={{ marginLeft: 10 }}>
                  <h4>Interested to learn more about {data?.country_name}?</h4>
                  {hasDemographics && (
                    <div>
                      <text>
                        Check out the{" "}
                        <a href={"/demographics/" + country}>
                          {"Demographics"}
                        </a>{" "}
                        of this country!
                      </text>
                      <br />
                    </div>
                  )}
                  {hasGeography && (
                    <text>
                      Check out the{" "}
                      <a href={"/geography/" + country}>{"Geography"}</a> of
                      this country!
                    </text>
                  )}
                </div>
              )}
              <div className="linksToModules" style={{ marginLeft: 10 }}>
                <h4>
                  Wanna check out the demographics of countries with similar
                  tourist numbers?
                </h4>
                {countriesWithSimilarTourists.map((country, idx) => {
                  const countryCodeAndCountry = Object.entries(
                    codeToCountry
                  ).filter(([_, val]) => val == country);
                  if (
                    countryCodeAndCountry.length > 0 &&
                    demographicCountryNames.includes(country)
                  )
                    return (
                      <a href={"/demographics/" + countryCodeAndCountry[0][0]}>
                        {country}
                        {idx < countriesWithSimilarTourists.length - 1 && ", "}
                      </a>
                    );
                  return (
                    <text>
                      {country}
                      {idx < countriesWithSimilarTourists.length - 1 && ", "}
                    </text>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner
          animation="border"
          role="status"
          style={{ marginTop: "15%", marginLeft: "48%", width: 60, height: 60 }}
        />
      )}
    </>
  );
};

export default FoodAndTourismInstance;
