// Originally from https://github.com/weknowinc/react-bubble-chart-d3
// Adapted from WhereArtThou project which fixes issues with unmounting node

import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import ReactBubbleChart from "./ReactBubbleChart";
import "./OurVisualizations.css";

const axios = require("axios");

const ProviderVisualizations = ({}) => {
  const [brandsData, setBrandsData] = useState([]);

  useEffect(() => {
    const getBrandsData = async () => {
      axios.get("https://api.mytechreview.me/brands").then((response) => {
        const data = response.data;
        setBrandsData(data);
      });
    };
    
    const getRatingsGraph = async () => {
      const data = brandsData.map((brand) => brand.avgRating);
      const h = 150;

      const svg = d3
        .select("#barGraph")
        .append("svg")
        .attr("width", 7.5 * data.length)
        .attr("height", h)
        .style("margin-left", 185);

      svg
        .selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (d, i) => i * 7)
        .attr("y", (d, i) => h - 4 * d)
        .attr("width", 5)
        .attr("height", (d, i) => d * 4)
        .attr("fill", "orange")
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
          window.location = "https://www.mytechreview.me/#/brand/" + brandsData[i].id;
        });

      svg
        .selectAll("name")
        .data(data)
        .enter()
        .append("text")
        .text((d, i) => (d > 4 ? brandsData[i].name : ""))
        .style("font-size", "10")
        .style("font-weight", "bold")
        .attr("x", (d, i) => i * 7)
        .attr("y", (d, i) => h - 10 * d);
        

      svg
        .selectAll("avgRating")
        .data(data)
        .enter()
        .append("text")
        .text((d, i) => (d))
        .style("font-size", "10")
        .style("font-weight", "bold")
        .attr("x", (d, i) => i * 7)
        .attr("y", (d, i) => h - 4 * d);
      };

    getBrandsData();
    getRatingsGraph();
  }, []);

  return (
    <div>
      <h2 className="header">Reviews per brand</h2>
      <div id="barGraph" />
      <h2 className="header">Number of Products</h2>
      <ReactBubbleChart
        graph={{
          zoom: 0.7,
          offsetX: 0.47,
          offsetY: 0,
        }}
        textSizeFunc={(val) => (val > 1 ? Math.log2(val) * 1.7 : 2)}
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
          size: 12,
          color: "#fff",
        }}
        labelFont={{
          family: "Verdana",
          size: 12,
          color: "#fff",
        }}
        bubbleClickFunc={(id) => {
          window.location = "https://www.mytechreview.me/#/brand/" + id;
        }}
        data={brandsData.map((brand) => {
          let num_products = brand.numProducts;
          return {
            label: brand.name,
            value: num_products,
            id: brand.id,
          };
        })}
      />

    </div>
  );
};

export default ProviderVisualizations;
