// Originally from https://github.com/weknowinc/react-bubble-chart-d3
// Adapted from WhereArtThou project which fixes issues with unmounting node

import React, { Component } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";

export default class ReactBubbleChart extends Component {
  constructor(props) {
    super(props);
    this.svg = React.createRef();
    this.renderChart = this.renderChart.bind(this);
    this.renderBubbles = this.renderBubbles.bind(this);
    this.renderLegend = this.renderLegend.bind(this);
  }

  componentDidMount() {
    this.renderChart();
  }

  componentDidUpdate() {
    const { width, height } = this.props;
    if (width !== 0 && height !== 0) {
      this.renderChart();
    }
  }

  render() {
    const { className } = this.props;
    return (
      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMinYMax"
        ref={this.svg}
        className={className}
      />
    );
  }

  renderChart() {
    const {
      graph,
      data,
      height,
      width,
      padding,
      showLegend,
      legendPercentage,
    } = this.props;

    const colors = [
      "#d9534f",
      "#ffcc5c",
      "#5bc0de",
      "#5cb85c",
      "#428bca",
      "#e8702a",
    ];

    // Reset the svg element to a empty state.
    this.svg.current.innerHTML = "";

    const bubblesWidth = showLegend
      ? width * (1 - legendPercentage / 100)
      : width;
    const legendWidth = width - bubblesWidth;
    // const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pack = d3
      .pack()
      .size([bubblesWidth * graph.zoom, bubblesWidth * graph.zoom])
      .padding(padding);

    // Process the data to have a hierarchy structure;
    const root = d3
      .hierarchy({ children: data })
      .sum(function (d) {
        return d.value;
      })
      .sort(function (a, b) {
        return b.value - a.value;
      })
      .each((d) => {
        if (d.data.label) {
          d.label = d.data.label;
          d.id = d.data.label.toLowerCase().replace(/ |\//g, "-");
        }
      });

    // Pass the data to the pack layout to calculate the distribution.
    const nodes = pack(root).leaves();

    // Call to the function that draw the bubbles.
    this.renderBubbles(bubblesWidth, nodes, colors);
    // Call to the function that draw the legend.
    if (showLegend) {
      this.renderLegend(legendWidth, height, bubblesWidth, nodes, colors);
    }
  }

  renderBubbles(width, nodes, colors) {
    const { graph, valueFont, labelFont, bubbleClickFunc, textSizeFunc } =
      this.props;
    const bubbleChart = d3
      .select(this.svg.current)
      .append("g")
      .attr("class", "bubble-chart")
      .attr("transform", function (d) {
        return (
          "translate(" +
          width * graph.offsetX +
          "," +
          width * graph.offsetY +
          ")"
        );
      });

    const tooltip = d3
      .select(this.svg.current)
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white");

    const node = bubbleChart
      .selectAll(".node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
      });

    node
      .append("circle")
      .attr("id", function (d) {
        return d.id;
      })
      .attr("r", function (d) {
        return d.r / 1.04;
      })
      .style("fill", function (d) {
        return d.data.color
          ? d.data.color
          : colors[nodes.indexOf(d) % colors.length];
      })
      .style("z-index", 1)
      .on("mouseover", function (event, d) {
        tooltip.style("visibility", "visible");

        d3.select(this).style("opacity", 0.5).style("cursor", "pointer");

        d3.select(this)
          .transition()
          .duration(500)
          .attr("r", d.r * 1.04);
      })
      .on("mouseout", function (event, d) {
        const r = d.r / 1.04;
        tooltip.style("visibility", "hidden");
        d3.select(this).style("opacity", 1).style("cursor", "default");

        d3.select(this).transition().duration(500).attr("r", r);
      })
      .on("click", (e, d) => bubbleClickFunc(d.data.id));

    node
      .append("clipPath")
      .attr("id", function (d) {
        return "clip-" + d.id;
      })
      .append("use")
      .attr("xlink:href", function (d) {
        return "#" + d.id;
      });

    node
      .append("text")
      .attr("class", "value-text")
      .style("font-size", (d) => {
        return `${textSizeFunc(d.data.value) - 1}px`;
      })
      .attr("clip-path", function (d) {
        return "url(#clip-" + d.id + ")";
      })
      .style("font-weight", (d) => {
        return valueFont.weight ? valueFont.weight : 600;
      })
      .style("font-family", valueFont.family)
      .style("fill", () => {
        return valueFont.color ? valueFont.color : "#000";
      })
      .style("stroke", () => {
        return valueFont.lineColor ? valueFont.lineColor : "#000";
      })
      .style("stroke-width", () => {
        return valueFont.lineWeight ? valueFont.lineWeight : 0;
      })
      .text(function (d) {
        return d.value.toLocaleString();
      });

    node
      .append("text")
      .attr("class", "label-text")
      .style("font-size", (d) => {
        return `${textSizeFunc(d.data.value)}px`;
      })
      .attr("clip-path", function (d) {
        return "url(#clip-" + d.id + ")";
      })
      .style("font-weight", (d) => {
        return labelFont.weight ? labelFont.weight : 600;
      })
      .style("font-family", labelFont.family)
      .style("fill", () => {
        return labelFont.color ? labelFont.color : "#000";
      })
      .style("stroke", () => {
        return labelFont.lineColor ? labelFont.lineColor : "#000";
      })
      .style("stroke-width", () => {
        return labelFont.lineWeight ? labelFont.lineWeight : 0;
      })
      .text(function (d) {
        return d.label;
      });

    // Center the texts inside the circles.
    d3.selectAll(".label-text")
      .attr("x", function (d) {
        const self = d3.select(this);
        const width = self.node().getBBox().width;
        return -(width / 2);
      })
      .style("opacity", function (d) {
        const self = d3.select(this);
        const width = self.node().getBBox().width;
        d.hideLabel = width * 1.05 > d.r * 2;
        return d.hideLabel ? 0 : 1;
      })
      .attr("y", function (d) {
        return textSizeFunc(d.data.value) / 2;
      });

    // Center the texts inside the circles.
    d3.selectAll(".value-text")
      .attr("x", function (d) {
        const self = d3.select(this);
        const width = self.node().getBBox().width;
        return -(width / 2);
      })
      .attr("y", function (d) {
        if (d.hideLabel) {
          return textSizeFunc(d.data.value) / 3;
        } else {
          return -textSizeFunc(d.data.value) * 0.5;
        }
      });

    node.append("title").text(function (d) {
      return d.label;
    });
  }

  renderLegend(width, height, offset, nodes, color) {
    const { legendFont } = this.props;
    const bubble = d3.select(".bubble-chart");
    const bubbleHeight = bubble.node().getBBox().height;

    const legend = d3
      .select(this.svg.current)
      .append("g")
      .attr("transform", function () {
        return `translate(${offset},${bubbleHeight * 0.05})`;
      })
      .attr("class", "legend");

    let textOffset = 0;
    const texts = legend
      .selectAll(".legend-text")
      .data(nodes)
      .enter()
      .append("g")
      .attr("transform", (d, i) => {
        const offset = textOffset;
        textOffset += legendFont.size + 10;
        return `translate(0,${offset})`;
      })
      .on("mouseover", function (d) {
        d3.select("#" + d.id).attr("r", d.r * 1.04);
      })
      .on("mouseout", function (d) {
        const r = d.r - d.r * 0.04;
        d3.select("#" + d.id).attr("r", r);
      });

    texts
      .append("rect")
      .attr("width", 30)
      .attr("height", legendFont.size)
      .attr("x", 0)
      .attr("y", -legendFont.size)
      .style("fill", "transparent");

    texts
      .append("rect")
      .attr("width", legendFont.size)
      .attr("height", legendFont.size)
      .attr("x", 0)
      .attr("y", -legendFont.size)
      .style("fill", function (d) {
        return d.data.color
          ? d.data.color
          : color[nodes.indexOf(d) % color.length];
      });

    texts
      .append("text")
      .style("font-size", `${legendFont.size}px`)
      .style("font-weight", (d) => {
        return legendFont.weight ? legendFont.weight : 600;
      })
      .style("font-family", legendFont.family)
      .style("fill", () => {
        return legendFont.color ? legendFont.color : "#000";
      })
      .style("stroke", () => {
        return legendFont.lineColor ? legendFont.lineColor : "#000";
      })
      .style("stroke-width", () => {
        return legendFont.lineWeight ? legendFont.lineWeight : 0;
      })
      .attr("x", (d) => {
        return legendFont.size + 10;
      })
      .attr("y", 0)
      .text((d) => {
        return d.label;
      });
  }
}

ReactBubbleChart.propTypes = {
  graph: PropTypes.shape({
    zoom: PropTypes.number,
    offsetX: PropTypes.number,
    offsetY: PropTypes.number,
  }),
  width: PropTypes.number,
  height: PropTypes.number,
  padding: PropTypes.number,
  showLegend: PropTypes.bool,
  legendPercentage: PropTypes.number,
  legendFont: PropTypes.shape({
    family: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    weight: PropTypes.string,
  }),
  valueFont: PropTypes.shape({
    family: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    weight: PropTypes.string,
  }),
  labelFont: PropTypes.shape({
    family: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    weight: PropTypes.string,
  }),
  className: PropTypes.string,
};

ReactBubbleChart.defaultProps = {
  graph: {
    zoom: 1,
    offsetX: 0,
    offsetY: 0,
  },
  width: 1000,
  height: 1000,
  padding: 0,
  showLegend: true,
  legendPercentage: 20,
  legendFont: {
    family: "Helvetica Neue",
    size: 12,
    color: "#000",
    weight: "bold",
  },
  valueFont: {
    family: "Helvetica Neue",
    size: 12,
    color: "#000",
    weight: "bold",
  },
  labelFont: {
    family: "Helvetica Neue",
    size: 15,
    color: "#000",
    weight: "normal",
  },
  className: "",
};
