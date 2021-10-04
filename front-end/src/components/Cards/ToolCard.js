import React from "react";
import { Card } from "antd";
import "./Card.css";

const ToolCard = ({ name, photo, description, link }) => {
  return (
    <a href={link}>
      <Card
        className="toolCardStyle"
        hoverable
        cover={
          photo && (
            <img
              src={photo}
              style={{
                width: "99%",
                height: "99%",
                marginTop: "0.5%",
                marginLeft: "0.5%",
              }}
            />
          )
        }
      >
        <Card.Meta title={name} description={description} />
      </Card>
    </a>
  );
};

export default ToolCard;
