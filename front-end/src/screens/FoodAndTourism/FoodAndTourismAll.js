import React from "react";
import FoodAndTourismData from "./FoodAndTourismData";
import * as Bootstrap from "react-bootstrap";

const FoodAndTourismAll = ({}) => {
  const getFoodAndTourism = (country) => {
    const FoodAndTourism = FoodAndTourismData[country];
    return (
      <tr key={FoodAndTourism.id}>
        <td>
          <a href={"/foodandtourism/" + country}>
            {FoodAndTourism.country_name}
          </a>
        </td>
        <td>{FoodAndTourism.country_main_attraction}</td>
        <td>{FoodAndTourism.country_number_of_tourists.toLocaleString()}</td>
        <td>${FoodAndTourism.country_tourism_revenue.toLocaleString()}</td>
        <td>{FoodAndTourism.country_tourism_percent_GDP}%</td>
      </tr>
    );
  };

  return (
    <div className="mainPage">
      <h2 className="header">Food and Tourism</h2>
      <p className="descriptionText">
        Looking for more tourism information before you visit a country? This
        page will help you quickly locate a country and show you the food and
        landmarks you'll come across.
      </p>
      <Bootstrap.Table table-bordered>
        <thead>
          <tr>
            <th scope="col">Country</th>
            <th scope="col">Main Attraction</th>
            <th scope="col">Number of Tourists</th>
            <th scope="col">Tourism Revenue</th>
            <th scope="col">Tourism as Percent of GDP</th>
          </tr>
        </thead>
        <tbody>{Object.keys(FoodAndTourismData).map(getFoodAndTourism)}</tbody>
      </Bootstrap.Table>
      <footer>
        <div>Countries displayed: {Object.keys(FoodAndTourismData).length}</div>
      </footer>
    </div>
  );
};

export default FoodAndTourismAll;
