import React from "react";
import GoogleMapReact from "google-map-react";
import "./GeographyInstance.css";
import GeographyData from "./GeographyData";
import { useParams } from "react-router";
import { convertStringArrayToArray } from "../../utils";
import codeToCountry from "../../codeToCountry";

const GeographyInstance = ({}) => {
  const { country } = useParams();
  
  const data = GeographyData[country];

  const country_neighbors = data
  ? convertStringArrayToArray(data.country_adjacent_countries)
  : null;

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
      {!data ? (
        <div style={{ marginTop: 40, marginLeft: 70 }}>
          Data for this model instance is not present in Phase 1, will be
          present in the next phase.
        </div>
      ) : (
      <div className="instancePage">
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
            <div className="adjacent">
              <text>
                {country_neighbors.join(", ")}
              </text>{" "}
              <br />
            </div>
            <h3 className="subTitle">Area</h3>
            <div className="area">
              <text>
                <b>Land Area in km<sup>2</sup> (mi<sup>2</sup>):</b> {data.country_land_area}
              </text>{" "}
              <br />
              <text>
                <b>Water Area in km<sup>2</sup> (mi<sup>2</sup>):</b> {data.country_water_area}
              </text>
              <br />
              <text>
                <b>Water Percent:</b> {data.country_water_percent}
              </text>
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
        <div style={{ height: "40vh", width: "81%", marginTop:-65 }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyBTg1SVCHYOg71DzgOow9G1iYuEw3jtJQ4",
              }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}
            ></GoogleMapReact>
             <img
              src={data.country_topography_image}
              width="550"
              height="300"
              style={{ marginTop:15, marginRight: 25, marginBottom:20 }}
              />
        </div>
    
          
        </div>
      </div>
      )}
    </div>
  );
};

export default GeographyInstance;
