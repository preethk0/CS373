import React, { useEffect, useState, useMemo } from "react";
import {
  ArrayParam,
  NumberParam,
  StringParam,
  useQueryParams,
  withDefault,
} from "use-query-params";
import "./DemographicsAll.css";
import CountryCard from "../../components/Cards/CountryCard";
import { Pagination } from "@mui/material";
import { Spinner } from "react-bootstrap";
import Select from "react-select";
import { demographicCountryNames } from "../../countryData/demographicsCountries";
import {
  countryFilterOptions,
  demographicGDPFilterValues,
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
  }),
};

const DemographicsAll = ({}) => {
  const [demographicsData, setDemographicsData] = useState([]);
  const [page, setPage] = useState(1);
  const [params, setParams] = useState({
    page: 1,
    per_page: 9,
    country_name: [],
    country_population: [],
    country_gdp: [],
    country_language: [],
  });
  const totalDemographics = demographicCountryNames.length;

  const updateFilter = (key, values) => {
    const currentParams = params;
    setParams({
      ...currentParams,
      [key]: values.map((country) => country.value),
      page: 1,
    });
  };

  const updatePage = (page) => {
    const currentParams = params;
    setParams({
      ...currentParams,
      page: page,
    });
  };

  var l = useEffect(() => {
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

      if (params.country_population.length > 0) {
        urlParams.append("country_population", params.country_population);
      }

      if (params.country_gdp.length > 0) {
        params.country_gdp.forEach((gdp) => {
          urlParams.append("country_gdp", gdp);
        });
      }

      if (params.country_language.length > 0) {
        urlParams.append("country_language", params.country_language);
      }

      return urlParams;
    };

    const getDemographicsData = async () => {
      const urlParams = buildParams(params);
      axios
        .get("http://10.0.0.157:5000/demographics?" + urlParams.toString())
        .then((response) => {
          setDemographicsData(response.data);
        });
    };

    getDemographicsData();
  }, [params]);

  return (
    <div className="mainPage">
      <h2 className="header">Demographics</h2>
      <p className="descriptionText">
        Looking to learn more about a certain country? This page can quickly
        locate the country you're looking for and give you some basic
        information about it.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
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
        />
        <Select
          options={demographicGDPFilterValues}
          styles={customStyles}
          onChange={(vals) => updateFilter("country_gdp", vals)}
          isMulti
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
      {demographicsData.length > 0 ? (
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
                onChange={(_, value) => updatePage(value)}
                count={Math.ceil(totalDemographics / 9)}
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
            Displaying {(page - 1) * 9 + 1}-
            {Math.min(page * 9, totalDemographics)} of {totalDemographics}
          </div>
          <div className="cardGrid">
            {demographicsData.map((country) => (
              <CountryCard country={country} />
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
