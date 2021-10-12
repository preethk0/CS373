import React from "react";
import FoodAndTourismData from "./FoodAndTourismData";
import * as Bootstrap from "react-bootstrap";
import MaterialTable from "material-table";

const FoodAndTourismAll = ({}) => {
  return (
    <div className="mainPage">
      <h2 className="header">Food and Tourism</h2>
      <p className="descriptionText">
        Looking for more tourism information before you visit a country? This
        page will help you quickly locate a country and show you the food and
        landmarks you'll come across.
      </p>
      <MaterialTable
        style={{ width: "100%" }}
        onRowClick={(_, data) =>
          (window.location.href = "/foodandtourism/" + data.country_id)
        }
        columns={[
          { title: "Country", field: "country_name" },
          { title: "Main Vegetable", field: "main_vegetable" },
          {
            title: "Number of Tourists",
            field: "number_of_tourists",
          },
          {
            title: "Tourism Revenue",
            field: "revenue_from_tourism",
          },
          {
            title: "Average Temperature",
            field: "average_temperature",
          },
        ]}
        data={Object.values(FoodAndTourismData)}
        title="Food and Tourism"
      />
    </div>
  );
};

export default FoodAndTourismAll;
