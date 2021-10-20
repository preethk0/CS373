import React from "react";
import GoogleMapReact from "google-map-react";
import "./GeographyInstance.css";
import { useParams } from "react-router";

const GeographyInstance = ({}) => {
  const { country } = useParams();
  const data = {};

  const defaultProps = {
    center: {
      lat: data.country_latitude,
      lng: data.country_longitude,
    },
    zoom: 4,
  };

  return (
    <div className="fullPage">
      <div className="subNavBar">
        <h1>Geographies of the World</h1>
        <text>
          <a href={"/geography/"}>{"View All"}</a>
        </text>
      </div>
      <div className="instancePage">
        <h1 className="countryName">{data.country_name}</h1>
        <div className="allInfo">
          <div style={{ height: "50vh", width: "100%" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyBTg1SVCHYOg71DzgOow9G1iYuEw3jtJQ4",
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            ></GoogleMapReact>
          </div>
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
            <h3 className="subTitle">Adjacent Countries and Oceans</h3>
            <div className="adjacent">
              <text>
                <b>Countries:</b> {data.country_adjacent_countries.join(", ")}
              </text>{" "}
              <br />
              <text>
                <b>Oceans:</b> {data.country_adjacent_oceans.join(", ")}
              </text>
            </div>
            <h3 className="subTitle">Area</h3>
            <div className="area">
              <text>
                <b>Area:</b> {data.country_land_area}
              </text>{" "}
              <br />
              <text>
                <b>Water:</b> {data.country_water_area}
              </text>
            </div>
          </div>
        </div>
        <div className="linksToModules">
          <h4> Interested to learn more about {data.country_name}?</h4>
          <text>
            Check out the{" "}
            <a href={"/demographics/" + country}>
              {"Basic Info and Demographics"}
            </a>{" "}
            of this country
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
  );
};

export default GeographyInstance;
