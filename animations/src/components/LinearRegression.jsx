import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const LinearRegression = () => {
  const svgRef = useRef();

  const [points] = useState([
    { age: 18, bmi: 20, charges: 2000 },
    { age: 22, bmi: 25, charges: 3000 },
    { age: 30, bmi: 27, charges: 4500 },
    { age: 35, bmi: 30, charges: 6000 },
    { age: 40, bmi: 32, charges: 7200 },
    { age: 50, bmi: 35, charges: 9000 },
  ]);

  useEffect(() => {
    const svg = d3.select(svgRef.current).attr("width", 600).attr("height", 400);
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const xScale = d3.scaleLinear().domain([15, 55]).range([0, width]);
    const yScale = d3.scaleLinear().domain([1000, 10000]).range([height, 0]);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    g.selectAll("circle")
      .data(points)
      .join("circle")
      .attr("cx", (d) => xScale(d.age))
      .attr("cy", (d) => yScale(d.charges))
      .attr("r", 6)
      .attr("fill", "blue");

    let m = 100, b = 2000;
    let line = g.append("line").attr("stroke", "red").attr("stroke-width", 2);

    let errorLines = g.selectAll(".error-line").data(points).enter().append("line").attr("class", "error-line").attr("stroke", "orange").attr("stroke-dasharray", "3");

    const learningRate = 0.00001;
    const updateLine = () => {
      points.forEach((point) => {
        const yPred = m * point.age + b;
        const error = point.charges - yPred;
        m += learningRate * error * point.age;
        b += learningRate * error;
      });

      line
        .transition()
        .duration(200)
        .attr("x1", xScale(15))
        .attr("y1", yScale(m * 15 + b))
        .attr("x2", xScale(55))
        .attr("y2", yScale(m * 55 + b));

      errorLines
        .transition()
        .duration(200)
        .attr("x1", (d) => xScale(d.age))
        .attr("y1", (d) => yScale(d.charges))
        .attr("x2", (d) => xScale(d.age))
        .attr("y2", (d) => yScale(m * d.age + b));
    };

    const interval = setInterval(updateLine, 300);
    return () => clearInterval(interval);
  }, [points]);

  return (
    <div className="graph-container">
      <h3 className="graph-title">Linear Regression: Predicting Insurance Charges Based on Age & BMI</h3>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default LinearRegression;
