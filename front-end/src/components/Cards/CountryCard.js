import React from "react";
import { Card } from "antd";
import "./Card.css";

const CountryCard = ({
  country_id,
  country_flag,
  country_name,
  country_capital,
  country_population
}) => {
    
    const formatNumbers = (number) => {
        return number.toLocaleString();
    }

    return (
        <a href={"/demographics/" + country_id}>
            <Card
            className="countryCardStyle"
            hoverable
            cover={country_flag && <img src={country_flag} />}
            >
                <Card.Meta title={country_name} description={country_capital} />
                <div className="cardStatsSection">
                    <div>Population: {formatNumbers(country_population)}</div>
                </div>
            </Card>
        </a>
    );
};

export default CountryCard;
