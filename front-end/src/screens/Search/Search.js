import React, { useEffect, useState, useMemo } from "react";
import CountryCard from "../../components/Cards/CountryCard";
import MaterialTable from "material-table";
import { Pagination } from "@mui/material";
import { TablePagination } from "@mui/material";
import { Spinner } from "react-bootstrap";
import * as Bootstrap from "react-bootstrap";
import { demographicCountryNames } from "../../countryData/demographicsCountries";
import { geographyCountryNames } from "../../countryData/geographyCountries";
import { MDBInput } from "mdbreact";
import {
  useQueryParams,
  StringParam,
  NumberParam,
  ArrayParam,
  withDefault,
} from "use-query-params";
import "./Search.css";

const axios = require("axios");

const Search = ({}) => {
  const [geographyData, setGeographyData] = useState([]);
  const [demographicsData, setDemographicsData] = useState([]);
  const [foodAndTourismData, setFoodAndTourismData] = useState([]);
  const [tempSearch, setTempSearch] = useState("");
  const [demItemCount, setDemItemCount] = useState(0);
  const [geoItemCount, setGeoItemCount] = useState(0);
  const [ftItemCount, setFtItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useQueryParams({
    demographic_page: withDefault(NumberParam, 1),
    geography_page: withDefault(NumberParam, 1),
    foodtourism_page: withDefault(NumberParam, 1),
    per_page: withDefault(NumberParam, 9),
    search: withDefault(StringParam, ""),
  });

  const updateParam = (key, value) => {
    const currentParams = params;
    setParams({
      ...currentParams,
      [key]: value,
    });
  };

  const getGeography = (country) => {
    const data = geographyData[country];
    return (
      <tr key={data.country_id}>
        <td>
          <a href={"/geography/" + data.country_id}>
            {highlightText(data.country_name)}
          </a>
        </td>
        <td> {highlightText(data.country_longitude.toString())}</td>
        <td> {highlightText(data.country_latitude.toString())}</td>
        <td> {highlightText(data.country_continent)}</td>
        <td> {highlightText(data.country_region)}</td>
      </tr>
    );
  };

  const getFoodAndTourism = (country) => {
    const data = foodAndTourismData[country];
    return (
      <tr key={data.country_id}>
        <td>
          <a href={"/foodandtourism/" + data.country_id}>
            {highlightText(data.country_name)}
          </a>
        </td>
        <td> {highlightText(data.country_main_attraction)}</td>
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

  var l = useEffect(() => {
    // Adapted from TexasVotes
    const buildParams = (params, type) => {
      let urlParams = new URLSearchParams();
      const searching = params.search.length > 0;

      if (type == 0) {
        urlParams.append("page", searching ? 1 : params.demographic_page);
      } else if (type == 1) {
        urlParams.append("page", searching ? 1 : params.geography_page);
      } else {
        urlParams.append("page", searching ? 1 : params.foodtourism_page);
      }

      urlParams.append("per_page", params.per_page);

      if (searching) {
        urlParams.append("search", params.search);
      }

      return urlParams;
    };

    const getDemographicsData = async () => {
      const urlParams = buildParams(params, 0);
      console.log(params);
      axios
        .get(
          "https://api.around-the-world.me/demographics?" + urlParams.toString()
        )
        .then((response) => {
          setDemographicsData(response.data.result);
          setDemItemCount(response.data.count);
          setLoading(false);
        });
    };

    const getGeographyData = async () => {
      const urlParams = buildParams(params, 1);
      axios
        .get(
          "https://api.around-the-world.me/geography?" + urlParams.toString()
        )
        .then((response) => {
          setGeographyData(response.data.result);
          setGeoItemCount(response.data.count);
          setLoading(false);
        });
    };

    const getFoodAndTourismData = async () => {
      const urlParams = buildParams(params, 2);
      axios
        .get(
          "https://api.around-the-world.me/foodandtourism?" +
            urlParams.toString()
        )
        .then((response) => {
          setFoodAndTourismData(response.data.result);
          setFtItemCount(response.data.count);
          setLoading(false);
        });
    };

    getDemographicsData();
    getGeographyData();
    getFoodAndTourismData();
  }, [params]);

  return (
    <div className="mainPage">
      <h2 className="header">
        Search
      </h2>
      <p className="descriptionText">
        {highlightText("Search for a country's information.")}
      </p>
      <MDBInput
        label="Search"
        value={params.search}
        onChange={(e) => updateParam("search", e.target.value)}
      />
      {!loading ? (
        <div>
          <h2 className="header">{highlightText("Demographics")}</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingRight: "5%",
            }}
          >
            Displaying{" "}
            {demItemCount > 0 ? (params.demographic_page - 1) * 9 + 1 : 0}-
            {Math.min(params.demographic_page * 9, demItemCount)} of{" "}
            {demItemCount}
          </div>
          <div className="cardGrid">
            {demographicsData.map((country) => (
              <CountryCard country={country} highlightText={highlightText} />
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
                page={params.demographic_page}
                onChange={(_, value) => updateParam("demographic_page", value)}
                count={Math.ceil(demItemCount / 9)}
                variant="outlined"
                color="primary"
                style={{ alignSelf: "center" }}
              />
            </div>
          </div>
          <h2 className="header">{highlightText("Geography")}</h2>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "5%",
              }}
            >
              {highlightText(
                `Displaying ${
                  geoItemCount > 0 ? (params.geography_page - 1) * 10 + 1 : 0
                }-${Math.min(
                  params.geography_page * 10,
                  geoItemCount
                )} of ${geoItemCount}`
              )}
            </div>

            <Bootstrap.Table
              table-bordered
              style={{ width: "90%", marginLeft: "5%" }}
            >
              <thead>
                <tr>
                  <th scope="col">Country</th>
                  <th scope="col">Longitude</th>
                  <th scope="col">Latitude</th>
                  <th scope="col">Continent</th>
                  <th scope="col">Region</th>
                </tr>
              </thead>
              <tbody>{Object.keys(geographyData).map(getGeography)}</tbody>
            </Bootstrap.Table>
            <Pagination
              defaultPage={1}
              page={params.geography_page}
              onChange={(_, value) => updateParam("geography_page", value)}
              count={Math.ceil(geoItemCount / 10)}
              variant="outlined"
              color="primary"
              showFirstButton
              showLastButton
              style={{
                paddingTop: "10pt",
                paddingRight: "5%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            />
          </div>
          <h2 className="header">{highlightText("Food and Tourism")}</h2>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "5%",
              }}
            >
              {highlightText(
                `Displaying ${
                  ftItemCount > 0 ? (params.foodtourism_page - 1) * 10 + 1 : 0
                }-${Math.min(
                  params.foodtourism_page * 10,
                  ftItemCount
                )} of ${ftItemCount}`
              )}
            </div>
            <Bootstrap.Table
              table-bordered
              style={{ width: "90%", marginLeft: "5%" }}
            >
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
                {Object.keys(foodAndTourismData).map(getFoodAndTourism)}
              </tbody>
            </Bootstrap.Table>
            <Pagination
              defaultPage={1}
              page={params.foodtourism_page}
              onChange={(_, value) => updateParam("foodtourism_page", value)}
              count={Math.ceil(ftItemCount / 10)}
              variant="outlined"
              color="primary"
              showFirstButton
              showLastButton
              style={{
                paddingTop: "10pt",
                paddingRight: "5%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            />
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
