import React from "react";
import FoodAndTourism from "./FoodAndTourismData";
import { useParams } from "react-router";

const FoodAndTourismInstance = ({}) => {
  const { country } = useParams();
  console.log(country);
  return <text>{country} foodandtourism instance</text>;
};

export default FoodAndTourismInstance;
