import React, { useState, useEffect, useMemo } from "react";
import GoogleMapReact from "google-map-react";
import "./GeographyInstance.css";
import { useParams } from "react-router";
import { convertStringArrayToArray } from "../../utils";
import codeToCountry from "../../countryData/codeToCountry";
import useAxios from "axios-hooks";
import { Spinner } from "react-bootstrap";
import { foodAndTourismCountryCodes } from "../../countryData/foodAndTourismCountries";
import { demographicCountryCodes } from "../../countryData/demographicsCountries";

const GeographyInstance = ({}) => {
  const { country } = useParams();

  const [data, setData] = useState({});

  const [{ data: countryData, loading, error }] = useAxios(
    `http://api.around-the-world.me/geography/${country}`
  );

  useEffect(() => {
    if (countryData) {
      setData(countryData);
    }
  }, [countryData]);

  const country_neighbors = data
    ? convertStringArrayToArray(data.country_adjacent_countries).filter(
        (item) => item.length > 0
      )
    : null;

  const hasDemographics = demographicCountryCodes.includes(country);
  const hasFoodAndTourism = foodAndTourismCountryCodes.includes(country);

  return (
    <div className="fullPage">
      <div className="subNavBar">
        <h1>Geographies of the World</h1>
        <text>
          <a href={"/geography/"}>{"View All"}</a>
        </text>
      </div>
      <div className="instancePage">
        {!data ? (
          <div style={{ marginTop: 40 }}>
            Data for this model instance is not present in Phase 1, will be
            present in the next phase.
          </div>
        ) : Object.keys(data).length > 0 ? (
          <div>
            <h1 className="countryName">{data.country_name}</h1>
            <div className="allInfo">
              <div className="actualData">
                <h3 className="subTitle">Location</h3>
                <div className="location">
                  <text>
                    <b>Latitude:</b> {data.country_latitude}
                  </text>
                  <text>
                    <b>Longitude:</b> {data.country_longitude}
                  </text>
                  <text>
                    <b>Continent:</b> {data.country_continent}
                  </text>
                  <text>
                    <b>Region:</b> {data.country_region}
                  </text>
                </div>
                <h3 className="subTitle">Adjacent Countries</h3>
                {country_neighbors.length > 0 ? (
                  <div className="adjacent">
                    <text>
                      {country_neighbors.map((country, idx) => {
                        const countryCodeAndCountry = Object.entries(
                          codeToCountry
                        ).filter(([_, val]) => val == country);
                        if (
                          countryCodeAndCountry.length > 0 &&
                          foodAndTourismCountryCodes.includes(
                            countryCodeAndCountry[0][0]
                          )
                        )
                          return (
                            <a
                              href={
                                "/foodandtourism/" + countryCodeAndCountry[0][0]
                              }
                            >
                              {country}
                              {idx < country_neighbors.length - 1 && ", "}
                            </a>
                          );
                        return (
                          <text>
                            {country}
                            {idx < country_neighbors.length - 1 && ", "}
                          </text>
                        );
                      })}
                    </text>
                    <p
                      style={{
                        fontSize: 12,
                        color: "gray",
                      }}
                    >
                      Find out more about the culture, food and tourism of
                      countries in the same region!
                    </p>
                    <br />
                  </div>
                ) : (
                  <div>
                    <p
                      style={{
                        fontSize: 12,
                        color: "gray",
                      }}
                    >
                      This country has no neighbors. It's an island nation!
                    </p>
                    <br />
                  </div>
                )}
                <h3 className="subTitle" style={{ marginTop: -30 }}>
                  Area
                </h3>
                <div className="area">
                  <text>
                    <b>
                      Land Area in km<sup>2</sup> (mi<sup>2</sup>):
                    </b>{" "}
                    {data.country_land_area}
                  </text>{" "}
                  <br />
                  <text>
                    <b>
                      Water Area in km<sup>2</sup> (mi<sup>2</sup>):
                    </b>{" "}
                    {data.country_water_area}
                  </text>
                  <br />
                  <text>
                    <b>Water Percent:</b> {data.country_water_percent}%
                  </text>
                </div>
              </div>
              {(hasDemographics || hasFoodAndTourism) && (
                <div className="linksToModules">
                  <h4> Interested to learn more about {data.country_name}?</h4>
                  {hasDemographics && (
                    <div>
                      <text>
                        Check out the{" "}
                        <a href={"/demographics/" + country}>
                          {"Basic Info and Demographics"}
                        </a>{" "}
                        of this country!
                      </text>
                      <br />
                    </div>
                  )}
                  {hasFoodAndTourism && (
                    <div>
                      <text>
                        Check out the{" "}
                        <a href={"/foodandtourism/" + country}>
                          {"Food and Tourism"}
                        </a>{" "}
                        of this country!
                      </text>
                    </div>
                  )}
                </div>
              )}
              <div style={{ height: "40vh", width: "81%", marginTop: -65 }}>
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: "AIzaSyBTg1SVCHYOg71DzgOow9G1iYuEw3jtJQ4",
                  }}
                  defaultCenter={{
                    lat: data.country_latitude,
                    lng: data.country_longitude,
                  }}
                  defaultZoom={4}
                ></GoogleMapReact>
                <img
                  src={data.country_topography_image}
                  width="575"
                  height="325"
                  style={{ marginTop: 15, marginRight: 25, marginBottom: 20 }}
                />
              </div>
            </div>
          </div>
        ) : (
          <Spinner
            animation="border"
            role="status"
            style={{
              marginTop: "15%",
              marginLeft: "48%",
              width: 60,
              height: 60,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default GeographyInstance;
