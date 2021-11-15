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
  

const axios = require("axios");


const Search = ({}) => {
  const [geographyData, setGeographyData] = useState([]);
  const [demographicsData, setDemographicsData] = useState([]);
  const [tempSearch, setTempSearch] = useState("");
  const [itemCount, setItemCount] = useState(demographicCountryNames.length);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState({
    page: 1,
    per_page: 9,
    country_name: [],
    country_population: [],
    country_gdp: [],
    country_language: [],
    country_longitude: withDefault(ArrayParam, []),
    country_latitude: withDefault(ArrayParam, []),
    country_continent: withDefault(ArrayParam, []),
    country_region: withDefault(ArrayParam, []),
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

  const getGeography = (country) => {
    const data = geographyData[country];
    return (
      <tr key={data.country_id}>
        <td>
          <a href={"/geography/" + data.country_id}>{highlightText(data.country_name)}</a>
        </td>
        <td> {highlightText(data.country_longitude.toString())}</td>
        <td> {highlightText(data.country_latitude.toString())}</td>
        <td> {highlightText(data.country_continent)}</td>
        <td> {highlightText(data.country_region)}</td>
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

    const getGeographyData = async () => {
        const urlParams = buildParams(params);
        axios
          .get(
            "http://10.165.130.235:5000/geography?" + urlParams.toString()
          )
          .then((response) => {
            setGeographyData(response.data.result);
            setItemCount(response.data.count);
            setLoading(false);
          });
      };  

    getDemographicsData();
    getGeographyData();
  }, [params]);

  return (
    <div className="mainPage">
      <h2 className="header">
        {params.q ? `Results for "${params.q}"` : "Search"}
      </h2>
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
          <h2 className="header">Geography</h2>
          <div>
            <div style={{ paddingLeft: "865pt", paddingBottom: "2pt"}}>
                {highlightText(
                    `Displaying ${
                    itemCount > 0 ? (params.page - 1) * 10 + 1 : 0
                    }-${Math.min(params.page * 10, itemCount)} of ${itemCount}`
                )}
            </div>
            
            <Bootstrap.Table table-bordered>
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
                page={params.page}
                onChange={(_, value) => updateParam("page", value)}
                count={Math.ceil(itemCount / 10)}
                variant="outlined"
                color="primary"
                showFirstButton 
                showLastButton
                style={{ paddingTop: "10pt", paddingLeft:"675pt"}}
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
