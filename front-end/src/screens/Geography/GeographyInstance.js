import React from "react";
import GeographyData from "./GeographyData";
import { useParams } from "react-router";

const GeographyInstance = ({}) => {
  const { country } = useParams();
  console.log(country);
  return <text>{country} geo instance</text>;
};

export default GeographyInstance;
