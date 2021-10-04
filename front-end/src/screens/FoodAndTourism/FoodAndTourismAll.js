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
        <td>{FoodAndTourism.main_vegetable}</td>
        <td>{FoodAndTourism.number_of_tourists.toLocaleString()}</td>
        <td>{FoodAndTourism.revenue_from_tourism.toLocaleString()}</td>
        <td>{FoodAndTourism.average_temperature}</td>
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
            <th scope="col">Main Vegetable</th>
            <th scope="col">Number of Tourists</th>
            <th scope="col">Tourism Revenue</th>
            <th scope="col">Average Temperature</th>
          </tr>
        </thead>
        <tbody>{Object.keys(FoodAndTourismData).map(getFoodAndTourism)}</tbody>
      </Bootstrap.Table>
      <footer>
            <div>Conutries Displayed: {Object.keys(FoodAndTourismData).length}</div>
      </footer>
    </div>
  );
};

export default FoodAndTourismAll;
