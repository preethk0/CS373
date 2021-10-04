import React from "react";
import { Card } from "antd";
import "./Card.css";

const StatsCard = ({ title, value }) => {
  return (
    <Card className="statsCardStyle">
      <text className="statsValueStyle">{value}</text>
      <br />
      <text className="statsTitleStyle">{title}</text>
    </Card>
  );
};

export default StatsCard;
