import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import useAxios from "axios-hooks";
import { Spinner } from "react-bootstrap";

const GeographyAll = ({}) => {
  const [data, setData] = useState([]);

  const [{ data: geographyData, loading, error }] = useAxios(
    "http://api.around-the-world.me/geography"
  );

  useEffect(() => {
    if (geographyData) {
      setData(geographyData);
    }
  }, [geographyData]);

  return (
    <div className="mainPage">
      <h2 className="header">Geography</h2>
      <p className="descriptionText">
        Want to know where the country is? This page will help you locate the
        country you're interested in and show you some basic geographical
        information.
      </p>
      {data.length > 0 ? (
        <MaterialTable
          style={{ width: "100%" }}
          options={{
            paging: true,
            pageSize: 10,
            pageSizeOptions: [],
          }}
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
          data={data}
          title="Geography"
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

export default GeographyAll;
