import React from "react";
import { Card } from "antd";
import "./Card.css";

const CountryCard = ({ country }) => {
  const formatNumbers = (number) => {
    return number.toLocaleString();
  };

  return (
    <a href={"/demographics/" + country.country_id}>
      <Card
        className="countryCardStyle"
        hoverable
        cover={country.country_flag && <img src={country.country_flag} />}
      >
        <Card.Meta
          title={country.country_name}
          description={country.country_capital}
        />
        {/* <div className="cardStatsSection">
          <div>Population: {formatNumbers(country.country_population)}</div>
          <div>Primary Language: {country.country_language[0]}</div>
          <div>GDP: {country.country_GDP}</div>
        </div> */}
      </Card>
    </a>
  );
};

export default CountryCard;
