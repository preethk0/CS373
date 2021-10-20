import React, { useEffect } from "react";
import DemographicsData from "./DemographicsData";
import "./DemographicsAll.css";
import CountryCard from "../../components/Cards/CountryCard";
import useAxios from "axios-hooks";
import axios from "axios";

const DemographicsAll = ({}) => {
  const [{ data, loading, error }] = useAxios(
    "http://127.0.0.1:5000/demographics"
  );

  useEffect(() => {
    const demographicsResult = data;
    console.log(data);
    console.log("he");
    if (demographicsResult) {
      console.log(demographicsResult);
    }
  }, [loading]);

  return (
    <div className="mainPage">
      <h2 className="header">Demographics</h2>
      <p className="descriptionText">
        Looking to learn more about a certain country? This page can quickly
        locate the country you're looking for and give you some basic
        information about it.
      </p>
      <div className="cardGrid">
        {Object.keys(DemographicsData).map((country) => (
          <CountryCard country={country} />
        ))}
      </div>
      <footer>
        <div>Countries displayed: {Object.keys(DemographicsData).length}</div>
      </footer>
    </div>
  );
};

export default DemographicsAll;
