import React, { useEffect, useState, useMemo, useRef } from "react";
import * as d3 from "d3";
import ReactBubbleChart from "./ReactBubbleChart";
import "./OurVisualizations.css";

const axios = require("axios");
const gdpFactor = 4 * Math.pow(10, 11);

const ProviderVisualizations = ({}) => {
  const [geoData, setGeoData] = useState([]);

  useEffect(() => {
    const buildParams = (num) => {
      let urlParams = new URLSearchParams();

      urlParams.append("page", 1);
      urlParams.append("per_page", num);

      return urlParams;
    };
  }, []);

  return <div></div>;
};

export default ProviderVisualizations;
