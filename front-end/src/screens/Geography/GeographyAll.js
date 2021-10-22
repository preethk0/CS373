import React from "react";
import GeographyData from "./GeographyData";
import MaterialTable from "material-table";

const GeographyAll = ({}) => {
  return (
    <div className="mainPage">
      <h2 className="header">Geography</h2>
      <p className="descriptionText">
        Want to know where the country is? This page will help you locate the
        country you're interested in and show you some basic geographical
        information.
      </p>
      <MaterialTable
        style={{ width: "100%" }}
        onRowClick={(_, data) =>
          (window.location.href = "/geography/" + data.country_id)
        }
        columns={[
          { title: "Country", field: "country_name" },
          { title: "Longitude", field: "country_longitude" },
          {
            title: "Latitude",
            field: "country_latitude",
          },
          {
            title: "Continent",
            field: "country_continent",
          },
          {
            title: "Region",
            field: "country_region",
          },
        ]}
        data={Object.values(GeographyData)}
        title="Geography"
      />
    </div>
  );
};

export default GeographyAll;
