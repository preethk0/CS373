import React from "react";
import DemographicsData from "./DemographicsData";
import * as Bootstrap from "react-bootstrap";

const DemographicsAll = ({}) => {

  const getDemographics = (country) => {
    const demographics = DemographicsData[country];
    return (
      <tr key={country}>
        <td>{demographics.country_name}</td>
        <td>{demographics.country_capital}</td>
        <td>{demographics.country_population}</td>
        <td>{demographics.country_currency}</td>
      </tr>
    )
  }

  return (
    <div>
      <Bootstrap.Table table-bordered>
        <thead>
          <tr>
            <th scope="col">Country</th>
            <th scope="col">Capital</th>
            <th scope="col">Population</th>
            <th scope="col">Currency</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(DemographicsData).map(getDemographics)}
        </tbody>
      </Bootstrap.Table>
    </div>
  );
};

{/* <a href={"/demographics/" + country}>{country}</a> */}

export default DemographicsAll;
