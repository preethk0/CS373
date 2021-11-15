import React, { useEffect, useState, useMemo } from "react";
import CountryCard from "../../components/Cards/CountryCard";
import { Pagination } from "@mui/material";
import { Spinner } from "react-bootstrap";
import { demographicCountryNames } from "../../countryData/demographicsCountries";
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

const Search = ({}) => {
  const [demographicsData, setDemographicsData] = useState([]);
  const [itemCount, setItemCount] = useState(demographicCountryNames.length);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
    page: 1,
    per_page: 9,
    country_name: [],
    country_population: [],
    country_gdp: [],
    country_language: [],
    sort: "",
    search: "",
  });

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

      urlParams.append("page", params.page);
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

      if (params.sort.length > 0) {
        urlParams.append("sort", params.sort);
      }

      if (params.search.length > 0) {
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
      <h2 className="header">Search</h2>
      <p className="descriptionText">
        Search for a country's information.
      </p>
      <MDBInput
        label="Search"
        value={params.search}
        onChange={(e) => updateParam("search", e.target.value)}
      />
      {!loading ? (
        <div>
          <h2 className="header">Demographics</h2>
          <div
            style={{
              display: "flex",
              marginTop: 10,
              flex: 1,
              justifyContent: "center",
            }}
          >
            Displaying {itemCount > 0 ? (params.page - 1) * 9 + 1 : 0}-
            {Math.min(params.page * 9, itemCount)} of {itemCount}
          </div>
          <div className="cardGrid">
            {demographicsData.map((country) => (
              <CountryCard
                country={country}
                searchQuery={params.search.toLowerCase()}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 5,
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

export default Search;
