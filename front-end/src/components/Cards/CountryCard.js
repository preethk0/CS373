import React from "react";
import { Card } from "antd";
import "./Card.css";
import DemographicsData from "../../screens/Demographics/DemographicsData";
import { convertStringArrayToArray } from "../../utils";

const CountryCard = ({ country: country_id }) => {
  const formatNumbers = (number) => {
    return number.toLocaleString();
  };

  const data = DemographicsData[country_id];

  const languages = convertStringArrayToArray(data.country_languages);

  return (
    <a href={"/demographics/" + country_id}>
      <Card
        className="countryCardStyle"
        hoverable
        cover={
          <img
            src={data.country_flag}
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
          title={data.country_name}
          description={data.country_capital}
        />
        <div className="cardStatsSection">
          <div>Population: {formatNumbers(data.country_population)}</div>
          <div>Primary Language: {languages[0]}</div>
          <div>Number of states: {data.country_states}</div>
        </div>
      </Card>
    </a>
  );
};

export default CountryCard;
