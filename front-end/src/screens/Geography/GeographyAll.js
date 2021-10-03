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
    <div>
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

{/* <a href={"/demographics/" + country}>{country}</a> */}

export default GeographyAll;
