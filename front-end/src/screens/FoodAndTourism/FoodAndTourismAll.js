import React from "react";
import FoodAndTourismData from "./FoodAndTourismData";
import * as Bootstrap from "react-bootstrap";

const FoodAndTourismAll = ({}) => {

  const getFoodAndTourism = (country) => {
    const FoodAndTourism = FoodAndTourismData[country];
    return (
      <tr key={FoodAndTourism.id}>
        <td>{FoodAndTourism.country_name}</td>
        <td>{FoodAndTourism.main_vegetable}</td>
        <td>{FoodAndTourism.number_of_tourists}</td>
        <td>{FoodAndTourism.revenue_from_tourism}</td>
        <td>{FoodAndTourism.average_temperature}</td>
      </tr>
    )
  }

  return (
    <div>
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
        <tbody>
          {Object.keys(FoodAndTourismData).map(getFoodAndTourism)}
        </tbody>
      </Bootstrap.Table>
    </div>
  );
};

export default FoodAndTourismAll;
