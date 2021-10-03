import React from "react";
import FoodAndTourismData from "./FoodAndTourismData";

const FoodAndTourismAll = ({}) => {
  return (
    <div>
      {Object.keys(FoodAndTourismData).map((country) => {
        return (
          <div>
            <a href={"/foodandtourism/" + country}>{country}</a>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default FoodAndTourismAll;
