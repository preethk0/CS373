import React, { useEffect, useState } from "react";
import "./GeographyAll.css";
import { Pagination } from "@mui/material";
import { Spinner } from "react-bootstrap";
import { MDBInput } from "mdbreact";
import Select from "react-select";
import * as Bootstrap from "react-bootstrap";
import { geographyCountryNames } from "../../countryData/geographyCountries";
import {
  geographyCountryNameFilterOptions,
  geographyContinentFilterValues,
  geographyRegionFilterValues,
  geographyLongitudeFilterValues,
  geographyLatitudeFilterValues,
  geographySortValues,
} from "../../countryData/filterData";
import {
  useQueryParams,
  StringParam,
  NumberParam,
  ArrayParam,
  withDefault,
} from "use-query-params";

const axios = require("axios");

const customStyles = {
  menu: (provided, state) => ({
    ...provided,
    width: 200,
    color: state.selectProps.menuColor,
    zIndex: 9999,
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
  const [params, setParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    per_page: withDefault(NumberParam, 10),
    country_name: withDefault(ArrayParam, []),
    country_longitude: withDefault(ArrayParam, []),
    country_latitude: withDefault(ArrayParam, []),
    country_continent: withDefault(ArrayParam, []),
    country_region: withDefault(ArrayParam, []),
    sort: StringParam,
    search: StringParam,
  });

  const getGeography = (country) => {
    const data = geographyData[country];
    return (
      <tr key={data.country_id}
          onClick="window.location='https://ide.geeksforgeeks.org/Y4U8qx'">
        <td>
          <a href={"/geography/" + data.country_id}>
            {highlightText(data.country_name)}
          </a>
        </td>
        <td>
          <a href={"/geography/" + data.country_id}>
            {highlightText(data.country_longitude.toString())}
          </a>
        </td>
        <td>
          <a href={"/geography/" + data.country_id}>
            {highlightText(data.country_latitude.toString())}
          </a>
        </td>
        <td>
          <a href={"/geography/" + data.country_id}>{
          highlightText(data.country_continent)}</a></td>
        <td>
          <a href={"/geography/" + data.country_id}>
            {highlightText(data.country_region)}
          </a>
        </td>
      </tr>
    );
  };

  const highlightText = (text) => {
    const searchQuery = params.search?.toLowerCase() ?? "";
    const parts = text.split(new RegExp(`(${searchQuery})`, "gi"));

    return (
      <span>
        {parts.map((part) =>
          part.toLowerCase() === searchQuery ? (
            <text style={{ backgroundColor: "yellow" }}>{part}</text>
          ) : (
            part
          )
        )}
      </span>
    );
  };

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
    // https://gitlab.com/forbesye/fitsbits/-/blob/master/front-end/src/views/Districts/ListView.js
    const buildParams = (params) => {
      let urlParams = new URLSearchParams();
      const searching = params.search?.length ?? 0 > 0;

      urlParams.append("page", searching ? 1 : params.page);
      urlParams.append("per_page", params.per_page);

      if (params.country_name.length > 0) {
        params.country_name.forEach((name) => {
          urlParams.append("country_name", name);
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

      if (params.sort?.length ?? 0 > 0) {
        urlParams.append("sort", params.sort);
      }

      if (searching) {
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
      <h2 className="header">{highlightText("Geography")}</h2>
      <p className="descriptionText">
        {highlightText(
          "Want to know where the country is? This page will help you locate the country you're interested in and show you some basic geographical information."
        )}
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
          "Longitude",
          "Latitude",
          "Continent",
          "Region",
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
            {highlightText(item)}
          </text>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingBottom: "10pt",
        }}
      >
        <Select
          options={geographyCountryNameFilterOptions}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_name", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          value={geographyCountryNameFilterOptions.filter((item) =>
            params.country_name.includes(item.value)
          )}
        />
        <Select
          options={geographyLongitudeFilterValues}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_longitude", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          value={geographyLongitudeFilterValues.filter((item) =>
            params.country_longitude.includes(item.value)
          )}
        />
        <Select
          options={geographyLatitudeFilterValues}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_latitude", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          value={geographyLatitudeFilterValues.filter((item) =>
            params.country_latitude.includes(item.value)
          )}
        />
        <Select
          options={geographyContinentFilterValues}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_continent", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          value={geographyContinentFilterValues.filter((item) =>
            params.country_continent.includes(item.value)
          )}
        />
        <Select
          options={geographyRegionFilterValues}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_region", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          value={geographyRegionFilterValues.filter((item) =>
            params.country_region.includes(item.value)
          )}
        />
        <Select
          options={geographySortValues}
          styles={customStyles}
          onChange={(val) => updateParam("sort", val.value)}
          classNamePrefix="select"
          value={
            geographySortValues.filter(
              (item) => item.value == params.sort
            )?.[0] ?? ""
          }
        />
      </div>
      {!loading ? (
        <div className="fullWidth">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {highlightText(
              `Displaying ${
                itemCount > 0 ? (params.page - 1) * 10 + 1 : 0
              }-${Math.min(params.page * 10, itemCount)} of ${itemCount}`
            )}
          </div>
          <Bootstrap.Table class="table table-hover" style={{ width: "100%" }}>
            <thead>
              <tr class = "tableHeader">
                <th scope="col">{highlightText("Country")}</th>
                <th scope="col">{highlightText("Longitude")}</th>
                <th scope="col">{highlightText("Latitude")}</th>
                <th scope="col">{highlightText("Continent")}</th>
                <th scope="col">{highlightText("Region")}</th>
              </tr>
            </thead>
            <tbody>{Object.keys(geographyData).map(getGeography)}</tbody>
          </Bootstrap.Table>
          <Pagination
            defaultPage={1}
            page={params.page}
            onChange={(_, value) => updateParam("page", value)}
            count={Math.ceil(itemCount / 10)}
            variant="outlined"
            color="primary"
            showFirstButton
            showLastButton
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
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
