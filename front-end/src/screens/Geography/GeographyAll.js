import React, { useEffect, useState } from "react";
import * as Bootstrap from "react-bootstrap";
import useAxios from "axios-hooks";

const GeographyAll = ({}) => {
  const [geographyData, setGeographyData] = useState([]);

  const [{ data, loading, error }] = useAxios(
    "http://api.around-the-world.me/geography"
  );

  useEffect(() => {
    const geographyResult = data;
    if (geographyResult) {
      setGeographyData(geographyResult);
    }
  }, [data]);

  const getGeography = (country) => {
    const country_id = country.country_id;
    return (
      <tr key={country_id}>
        <td>
          <a href={"/geography/" + country_id}>{country.country_name}</a>
        </td>
        <td>{country.country_longitude}</td>
        <td>{country.country_latitude}</td>
        <td>{country.country_continent}</td>
        <td>{country.country_region}</td>
      </tr>
    );
  };

  return (
    <div className="mainPage">
      <h2 className="header">Geography</h2>
      <p className="descriptionText">
        Want to know where the country is? This page will help you locate the
        country you're interested in and show you some basic geographical
        information.
      </p>
      <Bootstrap.Table table-bordered>
        <thead>
          <tr>
            <th scope="col">Country</th>
            <th scope="col">Longitude</th>
            <th scope="col">Latitude</th>
            <th scope="col">Continent</th>
            <th scope="col">Region</th>
          </tr>
        </thead>
        <tbody>{geographyData.map(getGeography)}</tbody>
      </Bootstrap.Table>
    </div>
  );
};

export default GeographyAll;
