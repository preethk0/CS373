import React from "react";
import { useParams } from "react-router";
import "./FoodAndTourismInstance.css";

const FoodAndTourismInstance = ({}) => {
  const { country } = useParams();
  var attractions_link = {};
  const data = {};

  return (
    <>
      <div className="subNavBar">
        <h1>Food and Tourism of the World</h1>
        <text>
          <a href={"/foodandtourism/"}>View All</a>
        </text>
      </div>
      <div
        class="row justify-content-center"
        style={{ marginLeft: 70, paddingBottom: 30 }}
      >
        <h1 class="countryName">{data.country_name}</h1>
        <div class="col" style={{ paddingLeft: 0 }}>
          <div class="card-body">
            <h3 class="card-title">Food</h3>
            <p class="card-text">
              <b>Main Dishes: </b>
              {data.main_dishes.join(", ")}
            </p>
            <img src={data.main_dish_photo} className="flag" />
            <p class="card-text">
              <b>Main Fruit: </b> {data.main_fruit}
            </p>
            <p class="card-text">
              <b>Main Vegetable: </b>
              {data.main_vegetable}
            </p>
            <p class="card-text">
              <b>Food Exported (per year): </b>
              {data.food_exported.toLocaleString()}
            </p>
          </div>
        </div>
        <div class="col">
          <div class="card-body">
            <h3 class="card-title">Tourism</h3>
            <p class="card-text">
              <b>Main Attractions: </b>
              {data.main_attractions.join(", ")}
            </p>
            <p class="card-text">
              <iframe width="500" height="300" src={attractions_link}></iframe>
            </p>
            <p class="card-text">
              <b>Number of Tourists (per year): </b>
              {data.number_of_tourists.toLocaleString()}
            </p>
            <p class="card-text">
              <b>Revenue from Tourism (per year): </b> $
              {data.revenue_from_tourism.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="linksToModules">
          <h4>Interested to learn more about {data.country_name}?</h4>
          <text>
            Check out the{" "}
            <a href={"/demographics/" + country}>{"Demographics"}</a> of this
            country
          </text>
          <br />
          <text>
            Check out the <a href={"/geography/" + country}>{"Geography"}</a> of
            this country
          </text>
        </div>
      </div>
    </>
  );
};

export default FoodAndTourismInstance;
