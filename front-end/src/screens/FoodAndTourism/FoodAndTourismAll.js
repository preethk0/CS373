import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import "./FoodAndTourismAll.css";
import { Pagination } from "@mui/material";
import * as Bootstrap from "react-bootstrap";
import useAxios from "axios-hooks";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import { foodAndTourismCountryNames } from "../../countryData/foodAndTourismCountries";
import {
  FoodAndTourismCountryNameFilterOptions,
  FoodAndTourismMainAttractionFilterValues,
  FoodAndTourismRevenueFilterValues,
  FoodAndTourismNumberTouristsFilterValues,
  FoodAndTourismIncomeLevelFilterValues,
  FoodAndTourismSortValues,
} from "../../countryData/filterData";
import { MDBInput } from "mdbreact";
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
  }),
  container: (provided) => ({
    ...provided,
    width: 200,
    marginLeft: 10,
    marginRight: 10,
  }),
};

const FoodAndTourismAll = ({}) => {
  const [FoodAndTourismData, setFoodAndTourismData] = useState([]);
  const [itemCount, setItemCount] = useState(foodAndTourismCountryNames.length);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    per_page: withDefault(NumberParam, 10),
    country_name: withDefault(ArrayParam, []),
    country_main_attraction: withDefault(ArrayParam, []),
    country_number_of_tourists: withDefault(ArrayParam, []),
    country_tourism_revenue: withDefault(ArrayParam, []),
    country_income_level: withDefault(ArrayParam, []),
    sort: StringParam,
    search: StringParam,
  });

  const getFoodAndTourism = (country) => {
    const data = FoodAndTourismData[country];
    return (
      <tr key={data.country_id}>
        <td>
          <a href={"/foodandtourism/" + data.country_id}>
            {highlightText(data.country_name)}
          </a>
        </td>
        <td> {highlightText(data.country_main_attraction.toString())}</td>
        <td> {highlightText(data.country_number_of_tourists.toString())}</td>
        <td> {highlightText(data.country_tourism_revenue.toString())}</td>
        <td> {highlightText(data.country_income_level)}</td>
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
    const buildParams = (params) => {
      let urlParams = new URLSearchParams();

      urlParams.append("page", params.page);
      urlParams.append("per_page", params.per_page);

      if (params.country_name.length > 0) {
        params.country_name.forEach((name) => {
          urlParams.append("country_name", name);
        });
      }

      if (params.country_main_attraction.length > 0) {
        params.country_main_attraction.forEach((mainAttraction) => {
          urlParams.append("country_main_attraction", mainAttraction);
        });
      }

      if (params.country_number_of_tourists.length > 0) {
        params.country_number_of_tourists.forEach((tourists) => {
          urlParams.append("country_number_of_tourists", tourists);
        });
      }

      if (params.country_tourism_revenue.length > 0) {
        params.country_tourism_revenue.forEach((revenue) => {
          urlParams.append("country_tourism_revenue", revenue);
        });
      }

      if (params.country_income_level.length > 0) {
        params.country_income_level.forEach((income) => {
          urlParams.append("country_income_level", income);
        });
      }

      if (params.sort?.length ?? 0 > 0) {
        urlParams.append("sort", params.sort);
      }

      if (params.search?.length ?? 0 > 0) {
        urlParams.append("search", params.search);
      }

      return urlParams;
    };

    const getFoodAndTourismData = async () => {
      const urlParams = buildParams(params);
      axios
        .get(
          "http://api.around-the-world.me/foodandtourism?" +
            urlParams.toString()
        )
        .then((response) => {
          setFoodAndTourismData(response.data.result);
          setItemCount(response.data.count);
          setLoading(false);
        });
    };

    getFoodAndTourismData();
  }, [params]);

  return (
    <div className="mainPage">
      <h2 className="header">{highlightText("Food and Tourism")}</h2>
      <p className="descriptionText">
        {highlightText(
          "Looking for more tourism information before you visit a country? This page will help you quickly locate a country and show you the food and landmarks you'll come across."
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
          "Main Attraction",
          "Number of Tourists",
          "Tourism Revenue",
          "Income Level",
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
          options={FoodAndTourismCountryNameFilterOptions}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_name", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          value={FoodAndTourismCountryNameFilterOptions.filter((item) =>
            params.country_name.includes(item.value)
          )}
        />

        <Select
          options={FoodAndTourismMainAttractionFilterValues}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_main_attraction", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          value={FoodAndTourismMainAttractionFilterValues.filter((item) => params.country_main_attraction.includes(item.value))}
        />

        <Select
          options={FoodAndTourismNumberTouristsFilterValues}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_number_of_tourists", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          value={FoodAndTourismNumberTouristsFilterValues.filter((item) =>
            params.country_number_of_tourists.includes(item.value)
          )}
        />

        <Select
          options={FoodAndTourismRevenueFilterValues}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_tourism_revenue", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          value={FoodAndTourismRevenueFilterValues.filter((item) =>
            params.country_tourism_revenue.includes(item.value)
          )}
        />

        <Select
          options={FoodAndTourismIncomeLevelFilterValues}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_income_level", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          value={FoodAndTourismIncomeLevelFilterValues.filter((item) =>
            params.country_income_level.includes(item.value)
          )}
        />

        <Select
          options={FoodAndTourismSortValues}
          styles={customStyles}
          onChange={(val) => updateParam("sort", val.value)}
          classNamePrefix="select"
          value={
            FoodAndTourismSortValues.filter(
              (item) => item.value == params.sort
            )?.[0] ?? ""
          }
        />
      </div>
      {!loading ? (
        <div>
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
          <Bootstrap.Table table-bordered>
            <thead>
              <tr>
                <th scope="col">{highlightText("Country")}</th>
                <th scope="col">{highlightText("Main Attraction")}</th>
                <th scope="col">{highlightText("Number of Tourists")}</th>
                <th scope="col">{highlightText("Tourism Revenue")}</th>
                <th scope="col">{highlightText("Income Level")}</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(FoodAndTourismData).map(getFoodAndTourism)}
            </tbody>
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
              paddingTop: "10pt",
              paddingLeft: "640pt",
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

export default FoodAndTourismAll;
