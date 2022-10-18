<template>
  <div class="con">
    <svg id="myPlot" style="width:500px;height:200px"></svg>
    <h3>D3.js with Vue.js</h3>
  </div>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "D3Charts",
  methods: {
    createSvg() {
      /* // Example 1. W3Schools >> https://www.w3schools.com/js/js_graphics_d3js.asp
      // Set Dimensions
      const xSize = 500;
      const ySize = 500;
      const margin = 40;
      const xMax = xSize - margin * 2;
      const yMax = ySize - margin * 2;

      // Create Random Points
      const numPoints = 100;
      const data = [];
      for (let i = 0; i < numPoints; i++) {
        data.push([Math.random() * xMax, Math.random() * yMax]);
      }

      // Append SVG Object to the Page
      const svg = d3
        .select("#myPlot")
        .append("svg")
        .append("g")
        .attr("transform", "translate(" + margin + "," + margin + ")");

      // X Axis
      const x = d3
        .scaleLinear()
        .domain([0, 500])
        .range([0, xMax]);

      svg
        .append("g")
        .attr("transform", "translate(0," + yMax + ")")
        .call(d3.axisBottom(x));

      // Y Axis
      const y = d3
        .scaleLinear()
        .domain([0, 500])
        .range([yMax, 0]);

      svg.append("g").call(d3.axisLeft(y));

      // Dots
      svg
        .append("g")
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d) {
          return d[0];
        })
        .attr("cy", function(d) {
          return d[1];
        })
        .attr("r", 3)
        .style("fill", "Red"); */

      // Example 2. Google Search (box plot with d3js sandbox) >> https://codesandbox.io/s/hjcxm && https://github.com/d3/d3/wiki/Gallery
      const data = {
        max: 21.5,
        min: 2,
        q1: 11.75,
        q3: 18.25,
        median: 13,
      };
      var margin = { top: 10, right: 30, bottom: 30, left: 40 },
        width = 400 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;
      const minI = data.min < 0 ? data.min - 5 : -5;
      const maxI = data.max + 5;
      var y = d3
        .scaleLinear()
        .domain([minI, maxI])
        .range([height, 0]);
      const svg = d3
        .select("#myPlot")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      svg
        .append("g")
        .attr("transform", "translate(0," + 150 + ")")
        .call(d3.axisBottom(y));
      var center = 100;
      width = 50;
      svg
        .append("line")
        .attr("y1", center)
        .attr("y2", center)
        .attr("x1", y(data.min))
        .attr("x2", y(data.max))
        .attr("stroke", "#1C3978");

      // Show the box
      svg
        .append("rect")
        .attr("y", center - width / 2)
        .attr("x", y(data.q3))
        .attr("width", y(data.q1) - y(data.q3))
        .attr("height", width)
        .attr("stroke", "#1C3978")
        .style("fill", "#fff");
      svg
        .selectAll("toto")
        .data([data.min, data.median, data.max])
        .enter()
        .append("line")
        .attr("y1", center - width / 2)
        .attr("y2", center + width / 2)
        .attr("x1", function(d) {
          return y(d);
        })
        .attr("x2", function(d) {
          return y(d);
        })
        .attr("stroke", "#1C3978");
    },
  },
  mounted() {
    this.createSvg();
  },
};
</script>

<style></style>
