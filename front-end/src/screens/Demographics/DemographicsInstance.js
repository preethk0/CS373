import React from "react";
import DemographicsData from "./DemographicsData";
import { useParams } from "react-router";

const DemographicsInstance = ({}) => {
  const { country } = useParams();
  console.log(country);
  return <text>{country} dem instance</text>;
};

export default DemographicsInstance;
