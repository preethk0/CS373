import React, { useEffect, useState } from "react";
import "./DemographicsAll.css";
import CountryCard from "../../components/Cards/CountryCard";
import useAxios from "axios-hooks";
import { Pagination } from "@mui/material";
import { Spinner } from "react-bootstrap";

const DemographicsAll = ({}) => {
  const [demographicsData, setDemographicsData] = useState([]);
  const [page, setPage] = useState(1);

  const [{ data, loading, error }] = useAxios(
    "http://api.around-the-world.me/demographics"
  );

  useEffect(() => {
    const demographicsResult = data;
    if (demographicsResult) {
      setDemographicsData(demographicsResult);
    }
  }, [data]);

  return (
    <div className="mainPage">
      <h2 className="header">Demographics</h2>
      <p className="descriptionText">
        Looking to learn more about a certain country? This page can quickly
        locate the country you're looking for and give you some basic
        information about it.
      </p>
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
                page={page}
                onChange={(event, value) => setPage(value)}
                count={Math.ceil(demographicsData.length / 9)}
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
            {Math.min(page * 9, demographicsData.length)} of{" "}
            {demographicsData.length}
          </div>
          <div className="cardGrid">
            {demographicsData.slice((page - 1) * 9, page * 9).map((country) => (
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
