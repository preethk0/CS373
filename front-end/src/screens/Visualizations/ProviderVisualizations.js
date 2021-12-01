// Originally from https://github.com/weknowinc/react-bubble-chart-d3
// Adapted from WhereArtThou project which fixes issues with unmounting node


import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import ReactBubbleChart from "./ProviderReactBubbleChart";
import "./OurVisualizations.css";

const axios = require("axios");

const ProviderVisualizations = ({}) => {
  const [brandsData, setBrandsData] = useState([]);

  useEffect(() => {

    const getBrandsData = async () => {
      axios
        .get(
          "https://api.mytechreview.me/brands"
      )
      .then((response) => {
        const data = response.data;
        setBrandsData(data);
      });
    };

    getBrandsData();
  }, []);


  return (
    <div>
      <h2 className="header">Number of Products</h2>
      <ReactBubbleChart
        graph={{
          zoom: 0.7,
          offsetX: 0.47,
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
