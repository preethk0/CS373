import React from "react";
import { Card } from "antd";
import "./Card.css";

const BioCard = ({
  name,
  photo,
  bio,
  responsibilities,
  commits,
  issues,
  tests,
}) => {
  return (
    <Card
      className="bioCardStyle"
      hoverable
      cover={photo && <img src={photo} />}
    >
      <Card.Meta title={name} description={bio} />
      <div className="cardStatsSection">
        <div>Commits: {commits}</div>
        <div>Issues: {issues}</div>
        <div>Tests: {tests}</div>
      </div>
    </Card>
  );
};

export default BioCard;
