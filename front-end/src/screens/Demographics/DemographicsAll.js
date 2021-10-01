import React from "react";
import DemographicsData from "./DemographicsData";

const DemographicsAll = ({}) => {
  return (
    <div>
      {Object.keys(DemographicsData).map((country) => {
        return (
          <div>
            <a href={"/demographics/" + country}>{country}</a>
            <br />
          </div>
        );
      })}
    </div>
  );
};

export default DemographicsAll;
