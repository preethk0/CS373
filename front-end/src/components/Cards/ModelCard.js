import React from "react";
import { Card } from "antd";
import "./Card.css";

const ModelCard = ({ name, photo, description, link }) => {
  return (
    <a href={link}>
      <Card
        className="modelCardStyle"
        hoverable
        cover={photo && <img src={photo} />}
      >
        <Card.Meta title={name} description={description} />
      </Card>
    </a>
  );
};

export default ModelCard;
