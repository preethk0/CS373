import React from "react";
import FoodAndTourismData from "./FoodAndTourismData";
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
          { title: "Main Attraction", field: "country_main_attraction" },
          {
            title: "Number of Tourists",
            field: "country_number_of_tourists",
          },
          {
            title: "Tourism Revenue",
            field: "country_tourism_revenue",
          },
          {
            title: "Income Level",
            field: "country_income_level",
          },
        ]}
        data={Object.values(FoodAndTourismData)}
        title="Food and Tourism"
      />
    </div>
  );
};

export default FoodAndTourismAll;
