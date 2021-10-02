import React from "react";
import GeographyData from "./GeographyData";

const GeographyAll = ({}) => {
  return (
    <div>
      {Object.keys(GeographyData).map((country) => {
        return (
          <div>
            <a href={"/geography/" + country}>{country}</a>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default GeographyAll;
