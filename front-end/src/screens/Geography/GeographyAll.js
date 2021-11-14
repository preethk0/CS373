import React, { useEffect, useState } from "react";
import "./GeographyAll.css";
import MaterialTable from "material-table";
import { Pagination } from "@mui/material";
import { Spinner } from "react-bootstrap";
import { MDBInput } from "mdbreact";
import Select from "react-select";
import { geographyCountryNames } from "../../countryData/geographyCountries";
import {
  geographyCountryNameFilterOptions,
  geographyContinentFilterValues,
  geographyRegionFilterValues,
  geographyLongitudeFilterValues,
  geographyLatitudeFilterValues,
  geographySortValues,
} from "../../countryData/filterData";

const axios = require("axios");

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: 200,
    color: state.selectProps.menuColor,
  }),
  container: (provided) => ({
    ...provided,
    width: 200,
    marginLeft: 10,
    marginRight: 10,
  }),
};

const GeographyAll = ({}) => {
  const [geographyData, setGeographyData] = useState([]);
  const [itemCount, setItemCount] = useState(geographyCountryNames.length);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
    page: 1,
    per_page: 10,
    country_name: [],
    country_continent: [],
    country_region: [],
    country_longitude: [],
    country_latitude: [],
    sort: "",
    search: "",
  });

  const updateFilter = (key, values) => {
    const currentParams = params;
    setParams({
      ...currentParams,
      [key]: values.map((country) => country.value),
      page: 1,
    });
  };

  const updateParam = (key, value) => {
    const currentParams = params;
    setParams({
      ...currentParams,
      [key]: value,
    });
  };

  useEffect(() => {
    // Adapted from TexasVotes
    const buildParams = (params) => {
      let urlParams = new URLSearchParams();

      urlParams.append("page", params.page);
      urlParams.append("per_page", params.per_page);

      if (params.country_name.length > 0) {
        params.country_name.forEach((name) => {
          urlParams.append("country_name", name);
        });
      }

      if (params.country_continent.length > 0) {
        params.country_continent.forEach((continent) => {
          urlParams.append("country_continent", continent);
        });
      }

      if (params.country_region.length > 0) {
        params.country_region.forEach((region) => {
          urlParams.append("country_region", region);
        });
      }

      if (params.country_longitude.length > 0) {
        params.country_longitude.forEach((long) => {
          urlParams.append("country_longitude", long);
        });
      }

      if (params.country_latitude.length > 0) {
        params.country_latitude.forEach((lat) => {
          urlParams.append("country_latitude", lat);
        });
      }

      if (params.sort.length > 0) {
        urlParams.append("sort", params.sort);
      }

      if (params.search.length > 0) {
        urlParams.append("search", params.search);
      }

      return urlParams;
    };

    const getGeographyData = async () => {
      const urlParams = buildParams(params);
      axios
        .get(
          "https://api.around-the-world.me/geography?" + urlParams.toString()
        )
        .then((response) => {
          setGeographyData(response.data.result);
          setItemCount(response.data.count);
          setLoading(false);
        });
    };

    getGeographyData();
  }, [params]);

  return (
    <div className="mainPage">
      <h2 className="header">Geography</h2>
      <p className="descriptionText">
        Want to know where the country is? This page will help you locate the
        country you're interested in and show you some basic geographical
        information.
      </p>
      <MDBInput
        label="Search"
        value={params.search}
        onChange={(e) => updateParam("search", e.target.value)}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {[
          "Country Name",
          "Continent",
          "Region",
          "Longitude",
          "Latitude",
          "Sort by...",
        ].map((item) => (
          <text
            style={{
              marginLeft: 10,
              marginRight: 10,
              width: 200,
              marginBottom: 5,
              fontWeight: "bold",
            }}
          >
            {item}
          </text>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Select
          options={geographyCountryNameFilterOptions}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_name", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
        />
        <Select
          options={geographyContinentFilterValues}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_continent", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
        />
        <Select
          options={geographyRegionFilterValues}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_region", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
        />
        <Select
          options={geographyLongitudeFilterValues}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_longitude", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
        />
        <Select
          options={geographyLatitudeFilterValues}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_latitude", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
        />
        <Select
          options={geographySortValues}
          styles={customStyles}
          onChange={(val) => updateParam("sort", val.value)}
          classNamePrefix="select"
        />
      </div>
      {!loading ? (
        <div>
          <Pagination
            defaultPage={1}
            page={params.page}
            onChange={(_, value) => updateParam("page", value)}
            count={Math.ceil(itemCount / 10)}
            variant="outlined"
            color="primary"
            style={{ alignSelf: "center" }}
          />
          <MaterialTable
            style={{ width: "980pt"}}
            options={{
              paging: true,
              pageSize: 10,
              pageSizeOptions: [],
              search: false,
              sorting: false,
              toolbar: false,
            }}
            onRowClick={(_, geographyData) =>
              (window.location.href = "/geography/" + geographyData.country_id)
            }
            columns={[
              { title: "Country", field: "country_name" },
              { title: "Longitude", field: "country_longitude" },
              { title: "Latitude", field: "country_latitude" },
              { title: "Continent", field: "country_continent" },
              { title: "Region", field: "country_region" },
            ]}
            geographyData={geographyData}
            title="Geography"
          />
        </div>
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
