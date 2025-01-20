import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const LogisticRegression = () => {
  const svgRef = useRef();
  const [points] = useState([
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 1 },
    { x: 4, y: 1 },
    { x: 5, y: 1 },
  ]);

  useEffect(() => {
    const svg = d3.select(svgRef.current).attr("width", 500).attr("height", 300);
    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const xScale = d3.scaleLinear().domain([0, 6]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 1]).range([height, 0]);

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    g.selectAll("circle")
      .data(points)
      .join("circle")
      .attr("cx", (d) => xScale(d.x))
      .attr("cy", (d) => yScale(d.y))
      .attr("r", 5)
      .attr("fill", "blue");

    let w = 0, b = 0;
    let line = g.append("line").attr("stroke", "red").attr("stroke-width", 2);

    const sigmoid = (z) => 1 / (1 + Math.exp(-z));

    const updateCurve = () => {
      points.forEach((point) => {
        const yPred = sigmoid(w * point.x + b);
        const error = point.y - yPred;
        w += 0.1 * error * point.x;
        b += 0.1 * error;
      });

      line
        .transition()
        .duration(200)
        .attr("x1", xScale(0))
        .attr("y1", yScale(sigmoid(b)))
        .attr("x2", xScale(6))
        .attr("y2", yScale(sigmoid(w * 6 + b)));
    };

    const interval = setInterval(updateCurve, 300);

    return () => clearInterval(interval);
  }, [points]);

  return (
    <div className="container">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default LogisticRegression;
