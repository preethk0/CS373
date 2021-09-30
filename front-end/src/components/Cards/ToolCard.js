import React from "react";
import { Card } from "antd";
import "./Card.css";

const ToolCard = ({ name, photo, description, link }) => {
  return (
    <a href={link}>
      <Card
        className="toolCardStyle"
        hoverable
        cover={photo && <img src={photo} />}
      >
        <Card.Meta title={name} description={description} />
      </Card>
    </a>
  );
};

export default ToolCard;
