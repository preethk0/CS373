import React from "react";
import FoodAndTourismData from "./FoodAndTourismData";
import { useParams } from "react-router";

const FoodAndTourismInstance = ({}) => {
  const { country } = useParams();
  return(
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <div class="card text-center w-50">
        <div class="card-body">
            <h1 class="card-title"> {FoodAndTourismData[country].country_name} </h1>
            <p class="card-text"> <b> Main Dishes:</b> {FoodAndTourismData[country].main_dishes.join(", ")} </p>
            <p class="card-text"> <b> Main Fruit:</b> {FoodAndTourismData[country].main_fruit} </p>
            <p class="card-text"> <b> Main Vegetable:</b> {FoodAndTourismData[country].main_vegetable} </p>
            <p class="card-text"> <b> Main Attractions:</b> {FoodAndTourismData[country].main_attractions.join(", ")} </p>
            <p class="card-text"> <b> Number of Tourists (per year):</b> {FoodAndTourismData[country].number_of_tourists.toLocaleString()} </p>
            <p class="card-text"> <b> Food Exported (per year):</b> {FoodAndTourismData[country].food_exported.toLocaleString()} </p>
            <p class="card-text"> <b> Revenue from Tourism (per year):</b> ${FoodAndTourismData[country].revenue_from_tourism.toLocaleString()} </p>
        </div>
        <div className="LinksToModules">
          <h4> Interested to learn more about {FoodAndTourismData[country].country_name}?</h4>
          <text>Check out the <a href={"/demographics/" + country}>{"Demographics"}</a> of this country</text><br/>
          <text>Check out the <a href={"/geography/" + country}>{"Geography"}</a> of this country</text>
        </div>
      </div>
    </div>
  </div>);
};

export default FoodAndTourismInstance;
