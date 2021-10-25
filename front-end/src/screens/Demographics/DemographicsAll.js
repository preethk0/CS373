import React, { useEffect, useState } from "react";
import "./DemographicsAll.css";
import CountryCard from "../../components/Cards/CountryCard";
import useAxios from "axios-hooks";

const DemographicsAll = ({}) => {
  const [demographicsData, setDemographicsData] = useState([]);

  const [{ data, loading, error }] = useAxios(
    "http://api.around-the-world.me/demographics"
  );

  useEffect(() => {
    const demographicsResult = data;
    if (demographicsResult) {
      setDemographicsData(demographicsResult);
    }
  }, [data]);

  return (
    <div className="mainPage">
      <h2 className="header">Demographics</h2>
      <p className="descriptionText">
        Looking to learn more about a certain country? This page can quickly
        locate the country you're looking for and give you some basic
        information about it.
      </p>
      <div className="cardGrid">
        {demographicsData.map((country) => (
          <CountryCard country={country} />
        ))}
      </div>
    </div>
  );
};

export default DemographicsAll;
