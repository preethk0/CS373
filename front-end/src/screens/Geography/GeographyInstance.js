import React from "react";
import GoogleMapReact from 'google-map-react';
import "./GeographyInstance.css";
import GeographyData from "./GeographyData";
import { useParams } from "react-router";

const GeographyInstance = ({}) => {
  const { country } = useParams();
  console.log(country);
  const data = GeographyData[country]

  const defaultProps = {
    center: {
      lat: data.country_latitude,
      lng: data.country_longitude
    },
    zoom: 4
  };

  return (
    <div className="FullPage">
      <div className="SubNavBar">
      <h1>Geographies of the World</h1>
      <text><a href={"/geography/"}>{"View All"}</a></text>
    </div>
    <div className="InstancePage">
        <h1 className="CountryName">{data.country_name}</h1>
        <div className="AllInfo">
          <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: "AIzaSyBTg1SVCHYOg71DzgOow9G1iYuEw3jtJQ4" }}
              defaultCenter={defaultProps.center}
              defaultZoom={defaultProps.zoom}>
            </GoogleMapReact>
        </div>
          <div class="ActualData">
            <h3 className="SubTitle">Location</h3>
            <div className="Location">
              <text><b>Latitude:</b> {data.country_latitude}</text>
              <text><b>Longitude:</b> {data.country_longitude}</text>
              <text><b>Continent:</b> {data.country_continent}</text>
              <text><b>Region:</b> {data.country_region}</text>
            </div>
            <h3 className="SubTitle">Adjacent Countries and Oceans</h3>
            <div className="Adjacent">
              <text><b>Countries:</b> {data.country_adjacent_countries.join(", ")}</text> <br />
              <text><b>Oceans:</b> {data.country_adjacent_oceans.join(", ")}</text>
            </div>
            <h3 className="SubTitle">Area</h3>
            <div className="Area">
              <text><b>Area:</b> {data.country_land_area}</text> <br />
              <text><b>Water:</b> {data.country_water_area}</text>
            </div>
          </div>
        </div>
        <div className="LinksToModules">
          <h4> Interested to learn more about {data.country_name}?</h4>
          <text>Check out the <a href={"/demographics/" + country}>{"Basic Info and Demographics"}</a> of this country</text><br />
          <text>Check out the <a href={"/foodandtourism/" + country}>{"Food and Tourism"}</a> of this country</text>
        </div>
      </div>
    </div>
    );
};

export default GeographyInstance;

