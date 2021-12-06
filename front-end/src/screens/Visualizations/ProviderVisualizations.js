// Originally from https://github.com/weknowinc/react-bubble-chart-d3
// Adapted from WhereArtThou project which fixes issues with unmounting node

import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import ReactBubbleChart from "./ReactBubbleChart";
import "./OurVisualizations.css";

const axios = require("axios");

const productToRange = (price) => {
  if (price < 500) {
    return "Below $500";
  } else if (price < 1000) {
    return "$500 - $1,000";
  } else if (price < 4000) {
    return "$1,000 - $4,000";
  } else if (price < 20000) {
    return "Above $4,000";
  } else {
    return "None";
  }
};

const ProviderVisualizations = ({}) => {
  const [brandsData, setBrandsData] = useState([]);

  useEffect(() => {
    const getRatingsGraph = async () => {
      axios.get("https://api.mytechreview.me/brands").then((response) => {
        const dataBrands = response.data;
        setBrandsData(dataBrands);

        const data = dataBrands.map((brand) => brand.avgRating);
        const h = 150;

        const svg = d3
          .select("#barGraph")
          .append("svg")
          .attr("width", 10.5 * data.length)
          .attr("height", h)
          .style("margin-left", "8%");

        svg
          .selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", (d, i) => i * 10)
          .attr("y", (d, i) => h - 20 * d)
          .attr("width", 9)
          .attr("height", (d, i) => d * 20)
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
            window.location =
              "https://www.mytechreview.me/#/brand/" + dataBrands[i].id;
          });

        svg
          .selectAll("name")
          .data(data)
          .enter()
          .append("text")
          .text((d, i) => (d > 4 ? dataBrands[i]?.name : ""))
          .style("font-size", "10")
          .style("font-weight", "bold")
          .attr("x", (d, i) => i * 10)
          .attr("y", (d, i) => h - (Math.floor(Math.random() * 5) + 23) * d);

        svg
          .selectAll("avgRating")
          .data(data)
          .enter()
          .append("text")
          .text((d, i) => d)
          .style("font-size", "10")
          .style("font-weight", "bold")
          .attr("x", (d, i) => i * 10)
          .attr("y", (d, i) => h - 21 * d);
      });
    };

    const drawChart = () => {
      axios.get("https://api.mytechreview.me/products").then((response) => {
        const productsData = response.data;
        let data = {};

        if (productsData) {
          productsData.forEach((product) => {
            data[productToRange(product?.price)] =
              (data?.[productToRange(product?.price)] ?? 0) + 1;
          });

          data = Object.keys(data).map((product) => {
            return { name: product, value: data[product] };
          });

          const colors = [
            "#8ce8ad",
            "#188ce5",
            "#ff9831",
            "#ff4136",
            "#c4c4cd",
            "#a62733",
            "#982519",
            "#7fd720",
          ];

          const svgContainer = d3.select("#pie-container").node();
          const width = svgContainer.getBoundingClientRect().width;

          let radius = width / 2 - 15;
          // legend Position
          let legendPosition = d3
            .arc()
            .innerRadius(radius / 1.75)
            .outerRadius(radius);

          // Create SVG
          const svg = d3
            .select("#pie-container")
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("viewBox", "0 0 " + width + " " + width)
            //.attr('preserveAspectRatio','xMinYMin')
            .append("g")
            .attr(
              "transform",
              "translate(" + width / 2 + "," + width / 2 + ")"
            );

          let pie = d3.pie().value((d) => d.value);
          let data_ready = pie(data);

          // Donut partition
          svg
            .selectAll("whatever")
            .data(data_ready)
            .enter()
            .append("path")
            .attr(
              "d",
              d3
                .arc()
                .innerRadius(radius / 1.75) // This is the size of the donut hole
                .outerRadius(radius)
            )
            .attr("fill", (d) => colors[d.index])
            .attr("stroke", "#fff")
            .style("stroke-width", "2")
            .style("opacity", "0.8");

          // Legend group and legend name
          svg
            .selectAll("mySlices")
            .data(data_ready)
            .enter()
            .append("g")
            .attr(
              "transform",
              (d) => `translate(${legendPosition.centroid(d)})`
            )
            .attr("class", "legend-g")
            .style("user-select", "none")

            .append("text")
            .text((d) => d.data.name)
            .style("text-anchor", "middle")
            .style("font-weight", 700)
            .style("fill", "#222")
            .style("font-size", 14);

          //Label for value
          svg
            .selectAll(".legend-g")
            .append("text")
            .text((d) => {
              return d.data.value;
            })
            .style("fill", "#444")
            .style("font-size", 12)
            .style("text-anchor", "middle")
            .attr("y", 16);
        }
      });
    };

    getRatingsGraph();
    drawChart();
  }, []);

  return (
    <div>
      <h2 className="header">Number of products by price range</h2>
      <div
        style={{
          height: 500,
          width: 500,
          marginLeft: (window.innerWidth - 500) / 2,
        }}
      >
        <div id="pie-container" />
      </div>
      <h2 className="header">Average rating per brand</h2>
      <div id="barGraph" />
      <h2 className="header">Number of products by brand</h2>
      <div
        style={{
          width: "100%",
          height: 500,
        }}
      >
        <ReactBubbleChart
          graph={{
            zoom: 0.6,
            offsetX: 0.55,
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
    </div>
  );
};

export default ProviderVisualizations;
