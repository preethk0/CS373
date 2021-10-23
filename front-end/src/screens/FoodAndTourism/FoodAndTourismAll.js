import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import useAxios from "axios-hooks";
import { Spinner } from "react-bootstrap";

const FoodAndTourismAll = ({}) => {
  const [foodAndTourismData, setFoodAndTourismData] = useState([]);

  const [{ data, loading, error }] = useAxios(
    "http://api.around-the-world.me/foodandtourism"
  );

  useEffect(() => {
    const foodAndTourismResult = data;
    if (foodAndTourismResult) {
      setFoodAndTourismData(foodAndTourismResult);
    }
  }, [data]);

  return (
    <div className="mainPage">
      <h2 className="header">Food and Tourism</h2>
      <p className="descriptionText">
        Looking for more tourism information before you visit a country? This
        page will help you quickly locate a country and show you the food and
        landmarks you'll come across.
      </p>
      {foodAndTourismData.length > 0 ? (
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
          data={foodAndTourismData}
          title="Food and Tourism"
        />
      ) : (
        <Spinner
          animation="border"
          role="status"
          style={{ marginTop: "15%", width: 60, height: 60 }}
        />
      )}
    </div>
  );
};

export default FoodAndTourismAll;
