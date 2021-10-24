import React from "react";
import { Card } from "antd";
import "./Card.css";
import { convertStringArrayToArray } from "../../utils";

const CountryCard = ({ country }) => {
  const formatNumbers = (number) => {
    return number.toLocaleString();
  };

  const country_id = country.country_id;
  const languages = country
    ? convertStringArrayToArray(country.country_languages)
    : null;

  return (
    <a href={"/demographics/" + country_id}>
      <Card
        className="countryCardStyle"
        hoverable
        cover={
          <img
            src={country.country_flag}
            style={{
              height: 200,
              width: 250,
              marginLeft: 50,
              marginTop: 10,
            }}
          />
        }
      >
        <Card.Meta
          title={country.country_name}
          description={country.country_capital}
        />
        <div className="cardStatsSection">
          <div>Population: {formatNumbers(country.country_population)}</div>
          <div>Primary Language: {languages[0]}</div>
          <div>Number of states: {country.country_states}</div>
          <div>Number of cities: {country.country_cities}</div>
        </div>
      </Card>
    </a>
  );
};

export default CountryCard;
