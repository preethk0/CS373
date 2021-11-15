import React, { useEffect, useState, useMemo } from "react";
import "./DemographicsAll.css";
import CountryCard from "../../components/Cards/CountryCard";
import { Pagination } from "@mui/material";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import { demographicCountryNames } from "../../countryData/demographicsCountries";
import {
  countryFilterOptions,
  demographicGDPFilterValues,
  demographicLanguageFilterValues,
  demographicPopulationFilterValues,
  demographicSortValues,
  demographicStatesFilterValues,
} from "../../countryData/filterData";
import {
  useQueryParams,
  StringParam,
  NumberParam,
  ArrayParam,
  withDefault,
} from "use-query-params";
import { MDBInput } from "mdbreact";

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

const DemographicsAll = ({}) => {
  const [demographicsData, setDemographicsData] = useState([]);
  const [itemCount, setItemCount] = useState(demographicCountryNames.length);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useQueryParams({
    page: withDefault(NumberParam, 1),
    per_page: withDefault(NumberParam, 9),
    country_name: withDefault(ArrayParam, []),
    country_population: withDefault(ArrayParam, []),
    country_gdp: withDefault(ArrayParam, []),
    country_language: withDefault(ArrayParam, []),
    country_states: withDefault(ArrayParam, []),
    sort: StringParam,
    search: StringParam,
  });

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

  var l = useEffect(() => {
    // Adapted from TexasVotes
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

      if (params.country_population.length > 0) {
        params.country_population.forEach((pop) => {
          urlParams.append("country_population", pop);
        });
      }

      if (params.country_gdp.length > 0) {
        params.country_gdp.forEach((gdp) => {
          urlParams.append("country_gdp", gdp);
        });
      }

      if (params.country_language.length > 0) {
        params.country_language.forEach((lang) => {
          urlParams.append("country_language", lang);
        });
      }

      if (params.country_states.length > 0) {
        params.country_states.forEach((num) => {
          urlParams.append("country_states", num);
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

    const getDemographicsData = async () => {
      const urlParams = buildParams(params);
      axios
        .get(
          "https://api.around-the-world.me/demographics?" + urlParams.toString()
        )
        .then((response) => {
          setDemographicsData(response.data.result);
          setItemCount(response.data.count);
          setLoading(false);
        });
    };

    getDemographicsData();
  }, [params]);

  return (
    <div className="mainPage">
      <h2 className="header">{highlightText("Demographics")}</h2>
      <p className="descriptionText">
        {highlightText(
          "Looking to learn more about a certain country? This page can quickly locate the country you're looking for and give you some basic information about it."
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
          "Nominal GDP",
          "Population",
          "Language",
          "Number of States",
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
        }}
      >
        <Select
          options={countryFilterOptions}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_name", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          value={countryFilterOptions.filter((item) =>
            params.country_name.includes(item.value)
          )}
        />
        <Select
          options={demographicGDPFilterValues}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_gdp", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          value={demographicGDPFilterValues.filter((item) =>
            params.country_gdp.includes(item.value)
          )}
        />
        <Select
          options={demographicPopulationFilterValues}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_population", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          value={demographicPopulationFilterValues.filter((item) =>
            params.country_population.includes(item.value)
          )}
        />
        <Select
          options={demographicLanguageFilterValues}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_language", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          value={demographicLanguageFilterValues.filter((item) =>
            params.country_language.includes(item.value)
          )}
        />
        <Select
          options={demographicStatesFilterValues}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_states", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
          value={demographicStatesFilterValues.filter((item) =>
            params.country_states.includes(item.value)
          )}
        />
        <Select
          options={demographicSortValues}
          styles={customStyles}
          onChange={(val) => updateParam("sort", val.value)}
          classNamePrefix="select"
          value={
            demographicSortValues.filter(
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
              marginTop: 30,
              flex: 1,
              justifyContent: "center",
            }}
          >
            <div>
              <Pagination
                defaultPage={1}
                page={params.page}
                onChange={(_, value) => updateParam("page", value)}
                count={Math.ceil(itemCount / 9)}
                variant="outlined"
                color="primary"
                style={{ alignSelf: "center" }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              flex: 1,
              justifyContent: "center",
            }}
          >
            {highlightText(
              `Displaying ${
                itemCount > 0 ? (params.page - 1) * 9 + 1 : 0
              }-${Math.min(params.page * 9, itemCount)} of ${itemCount}`
            )}
          </div>
          <div className="cardGrid">
            {demographicsData.map((country) => (
              <CountryCard country={country} highlightText={highlightText} />
            ))}
          </div>
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

export default DemographicsAll;
