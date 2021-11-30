import React, { useEffect, useState, useMemo, useRef } from "react";
import * as d3 from "d3";
import ReactBubbleChart from "./ReactBubbleChart";
import "./OurVisualizations.css";

const axios = require("axios");
const gdpFactor = 4 * Math.pow(10, 11);

const OurVisualizations = ({}) => {
  const [geoData, setGeoData] = useState([]);

  useEffect(() => {
    const buildParams = (num) => {
      let urlParams = new URLSearchParams();

      urlParams.append("page", 1);
      urlParams.append("per_page", num);

      return urlParams;
    };

    const getGDPGraph = async () => {
      const urlParams = buildParams(168);
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
            .attr("width", 7.5 * data.length)
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
            .attr("fill", "green")
            .on("mouseover", function (d) {
              d3.select(this).style("cursor", "pointer");
              d3.select(this).style("opacity", 0.7);
            })
            .on("mouseout", function (d) {
              d3.select(this).style("cursor", "default");
              d3.select(this).style("opacity", 1);
            })
            .on("click", function (event, d) {
              const i = data.indexOf(d);
              window.location = "demographics/" + demData[i].country_id;
            });

          svg
            .selectAll("country_name")
            .data(data)
            .enter()
            .append("text")
            .text((d, i) => (d > gdpFactor * 7 ? demData[i].country_name : ""))
            .style("font-size", "12")
            .style("font-weight", "bold")
            .attr("x", (d, i) => i * 7 - 3)
            .attr("y", (d, i) => h - 10 * (d / gdpFactor) - 6);

          svg
            .selectAll("country_gdp")
            .data(data)
            .enter()
            .append("text")
            .text((d, i) => (d > gdpFactor * 7 ? `$${d.toLocaleString()}` : ""))
            .style("font-size", "12")
            .style("font-weight", "bold")
            .attr("x", (d, i) => i * 7 - 3)
            .attr("y", (d, i) => h - 10 * (d / gdpFactor) - 18);
        });
    };

    const getGeoData = async () => {
      const urlParams = buildParams(154);
      axios
        .get(
          "https://api.around-the-world.me/geography?" + urlParams.toString()
        )
        .then((response) => {
          const data = response.data.result;
          setGeoData(data);
        });
    };

    getGDPGraph();
    getGeoData();
  }, []);

  return (
    <div>
      <h2 className="header">Country GDPs</h2>
      <div id="barGraph" />
      <h2 className="header">Country Land Areas</h2>
      <ReactBubbleChart
        graph={{
          zoom: 1,
          offsetX: 0.35,
          offsetY: 0,
        }}
        width={window.innerWidth * 0.4}
        padding={0} // optional value, number that set the padding between bubbles
        showLegend={false} // optional value, pass false to disable the legend.
        legendFont={{
          family: "Arial",
          size: 12,
          color: "#000",
          weight: "bold",
        }}
        valueFont={{
          family: "Verdana",
          size: 7,
          color: "#fff",
        }}
        labelFont={{
          family: "Verdana",
          size: 10,
          color: "#fff",
        }}
        bubbleClickFunc={(id) => {
          window.location = "/geography/" + id;
        }}
        data={geoData.map((country) => {
          let land_area = country.country_land_area.replace(/,/g, "");
          land_area = Number(
            land_area.substring(0, land_area.indexOf("(")).trim()
          );
          return {
            label: country.country_name,
            value: land_area,
            id: country.country_id,
          };
        })}
      />
    </div>
  );
};

export default OurVisualizations;
