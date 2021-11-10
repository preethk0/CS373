import React from "react";
import { Card } from "antd";
import "./Card.css";
import { convertStringArrayToArray } from "../../utils";
import Highlighter from "react-highlight-words";

const CountryCard = ({ country, searchQuery }) => {
  const formatNumbers = (number) => {
    return number.toLocaleString();
  };

  const highlightText = (text) => {
    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));

    return (
      <span>
        {parts.map((part) =>
          part.toLowerCase() === searchQuery ? (
            <text style={{ backgroundColor: "yellow" }}>{part}</text>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const country_id = country.country_id;

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
        <div>
          <div style={{ fontWeight: "bold", fontSize: 17, marginBottom: 4 }}>
            {highlightText(country.country_name)}
          </div>
          <div style={{ fontSize: 14, color: "gray", marginBottom: 8 }}>
            {highlightText(country.country_capital)}
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              height: 1,
              backgroundColor: "#9e9e9e",
              marginBottom: 10,
            }}
          />
          <div>
            {highlightText(`Population: ${country.country_population}`)}
          </div>
          <div>{highlightText(`Languages: ${country.country_languages}`)}</div>
          <div>
            {highlightText(`Number of states: ${country.country_states}`)}
          </div>
          <div>{highlightText(`Nominal GDP: $${country.country_GDP}`)}</div>
        </div>
      </Card>
    </a>
  );
};

export default CountryCard;
