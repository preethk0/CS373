import React from "react";
import { Card } from "antd";
import "./Card.css";
import DemographicsData from "../../screens/Demographics/DemographicsData";

const CountryCard = ({ country }) => {
  const formatNumbers = (number) => {
    return number.toLocaleString();
  };

  const data = DemographicsData[country];

  return (
    <a href={"/demographics/" + country}>
      <Card
        className="countryCardStyle"
        hoverable
        cover={data.country_flag && <img src={data.country_flag} />}
      >
        <Card.Meta
          title={data.country_name}
          description={data.country_capital}
        />
        <div className="cardStatsSection">
          <div>Population: {formatNumbers(data.country_population)}</div>
          <div>Primary Language: {data.country_language[0]}</div>
          <div>GDP: {data.country_GDP}</div>
        </div>
      </Card>
    </a>
  );
};

export default CountryCard;
