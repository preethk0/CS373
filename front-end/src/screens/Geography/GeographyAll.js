import React from "react";
import GeographyData from "./GeographyData";
import * as Bootstrap from "react-bootstrap";

const GeographyAll = ({}) => {

  const getGeography = (country) => {
    const geography = GeographyData[country];
    return (
      <tr key={geography.id}>
        <td>{geography.country_name}</td>
        <td>{geography.country_longitude}</td>
        <td>{geography.country_latitude}</td>
        <td>{geography.country_continent}</td>
        <td>{geography.country_region}</td>
      </tr>
    )
  }

  return (
    <div className="mainPage">
      <h2 className="header">Geography</h2>
      <p className="descriptionText">
        Want to know where the country is? This page will help you locate the country you're interested in and show you
        some basic geographical information.
      </p>
      <Bootstrap.Table table-bordered>
        <thead>
          <tr>
            <th scope="col">Country</th>
            <th scope="col">Longitutde</th>
            <th scope="col">Latitude</th>
            <th scope="col">Continent</th>
            <th scope="col">Region</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(GeographyData).map(getGeography)}
        </tbody>
      </Bootstrap.Table>
    </div>
  );
};

export default GeographyAll;
