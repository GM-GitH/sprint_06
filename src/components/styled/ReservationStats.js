import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import styled from "styled-components";

const Styled = styled.div`
  font: 10px sans-serif;
  .y.axisRight text {
    fill: orange;
  }

  .y.axisLeft text {
    fill: #6e6e6e;
    font-family: sans-serif;
    font-size: 12px;
  }
  g text {
    font-family: sans-serif;
    font-size: 12px;
  }
  .axisLeft .domain,
  .axisLeft line {
    display: none;
  }

  .axis path,
  .axis line {
    fill: none;
    stroke: #6e6e6e;
  }

  .bar2:hover {
    fill: blue;
  }

  .bar2 {
    fill: #e23428;
  }

  .x.axis path {
    /* display: none; */
    color: #6e6e6e;
  }
`;

function BarChart() {
  const [data0] = useState([20, 25, 6, 15, 90, 75, 50]);
  const [data1] = useState([80, 65, 16, 25, 100, 55, 60]);
  const svgRef = useRef();

  useEffect(() => {
    //******************* svg container
    const w = 400;
    const h = 300;
    const svg = d3
      .select(svgRef.current)
      .attr("width", w)
      .attr("height", h)
      .attr("color", "#6e6e6e")
      .attr("overflow", "visible")
      .style("display", "block")
      .style("margin", "75px auto");

    //******************* scaling
    const xScale0 = d3
      .scaleBand()
      .domain(data0.map((val, i) => i))
      .range([0, w])
      .padding([0.3]);
      const xScale1 = d3
        .scaleBand()
        .domain(data1.map((val, i) => i))
        .range([0, w])
        .padding([0.3]);
    const yScale0 = d3.scaleLinear().domain([0, 100]).range([h, 0]);
    const yScale1 = d3.scaleLinear().domain([0, h]).range([h, 0]);

    //******************* axis
    const xAxis0 = d3.axisBottom(xScale0);
    const xAxis1 = d3.axisBottom(xScale1);
    // .ticks(data0.length)
    const yAxis0 = d3.axisLeft(yScale0).ticks(5);
    const yAxis1 = d3.axisRight(yScale1).ticks(5);
    svg.append("g").call(xAxis0).attr("transform", `translate(0, ${h})`);
    svg.append("g").call(xAxis1).attr("transform", `translate(0, ${h})`);
    svg.append("g").call(yAxis0);
    svg.append("g").call(yAxis1).attr("transform", `translate(${w})`);

    //******************* svg data0
    svg
      .selectAll(".bar")
      .data(data0)
      .join("rect")
      .attr("fill", "red")
      .attr("x", (v, i) => xScale0(i) + 21)
      .attr("y", yScale0)
      .attr("width", xScale0.bandwidth() / 2)
      .attr("height", (val) => h - yScale0(val));
    svg
      .selectAll(".bar2")
      .data(data1)
      .join("rect")
      .attr("class-name", "bar2")
      .attr("fill", "#135846")
      .attr("x", (v, i) => xScale1(i))
      .attr("y", yScale1)
      .attr("width", xScale1.bandwidth() / 2.2)
      .attr("height", (val) => h - yScale1(val));
  }, [data0, data1]);

  return (
    <Styled>
      <svg ref={svgRef}></svg>
    </Styled>
  );
}
export default BarChart;
