import React, { useEffect, useState, useMemo, useRef } from "react";
import {
  useQueryParams,
  StringParam,
  NumberParam,
  ArrayParam,
  withDefault,
} from "use-query-params";
import * as d3 from "d3";
import "./Visualizations.css";

const axios = require("axios");
const gdpFactor = 4 * Math.pow(10, 11);

const Visualizations = ({}) => {
  useEffect(() => {
    const buildParams = () => {
      let urlParams = new URLSearchParams();

      urlParams.append("page", 1);
      urlParams.append("per_page", 168);

      return urlParams;
    };

    const getGDPGraph = async () => {
      const urlParams = buildParams();
      axios
        .get(
          "https://api.around-the-world.me/demographics?" + urlParams.toString()
        )
        .then((response) => {
          const demData = response.data.result;
          const data = demData.map((country) => country.country_GDP);
          const h = 600;

          const svg = d3
            .select("#barGraph")
            .append("svg")
            .attr("width", 7 * data.length)
            .attr("height", h)
            .style("margin-left", 100);

          svg
            .selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 7)
            .attr("y", (d, i) => h - 10 * (d / gdpFactor))
            .attr("width", 5)
            .attr("height", (d, i) => (d / gdpFactor) * 10)
            .attr("fill", "green");

          svg
            .selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .text((d, i) => (d > gdpFactor * 7 ? demData[i].country_name : ""))
            .style("font-size", "12")
            .style("font-weight", "bold")
            .attr("x", (d, i) => i * 7)
            .attr("y", (d, i) => h - 10 * (d / gdpFactor) - 3);
        });
    };

    getGDPGraph();
  });

  return (
    <div>
      <h2 className="header">Country GDPs</h2>
      <div id="barGraph" />
    </div>
  );
};

export default Visualizations;
