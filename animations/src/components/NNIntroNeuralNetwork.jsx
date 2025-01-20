import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const NeuralNetworkAnimation = () => {
  const svgRef = useRef();
  const [animationState, setAnimationState] = useState('idle');

  useEffect(() => {
    const width = 600;
    const height = 400;
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    const layers = [
      { name: "Input Layer", neurons: 4, x: 50 },
      { name: "Hidden Layer 1", neurons: 5, x: 200 },
      { name: "Hidden Layer 2", neurons: 4, x: 350 },
      { name: "Output Layer", neurons: 1, x: 500 },
    ];

    const inputLabels = ["Time of Day", "Temperature", "Cloud Cover", "Wind Speed"];

    // Clear previous elements
    svg.selectAll("*").remove();

    // Draw chart title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .attr("class", "title")
      .style("font-size", "16px")
      .text("Energy Production Prediction");

    // Draw neurons (nodes)
    layers.forEach((layer, layerIndex) => {
      // Draw nodes
      svg.selectAll(`.neuron-layer-${layerIndex}`)
        .data(d3.range(layer.neurons))
        .enter()
        .append("circle")
        .attr("cx", layer.x)
        .attr("cy", (_, i) => height / (layer.neurons + 1) * (i + 1))
        .attr("r", 15)
        .attr("class", `node layer-${layerIndex}`)
        .attr("fill", "#69b3a2");

      // Layer labels
      svg.append("text")
        .attr("x", layer.x)
        .attr("y", 35)
        .attr("text-anchor", "middle")
        .attr("class", "label")
        .text(layer.name);

      // Input labels
      if (layerIndex === 0) {
        svg.selectAll(`.label-input-layer-${layerIndex}`)
          .data(inputLabels)
          .enter()
          .append("text")
          .attr("x", layer.x - 50)
          .attr("y", (_, i) => height / (layer.neurons + 1) * (i + 1) + 5)
          .attr("class", "label")
          .text(d => d);
      }
    });

    // Draw connections (links)
    for (let i = 0; i < layers.length - 1; i++) {
      const sourceLayer = layers[i];
      const targetLayer = layers[i + 1];

      svg.selectAll(`.link-layer-${i}`)
        .data(d3.cross(d3.range(sourceLayer.neurons), d3.range(targetLayer.neurons)))
        .enter()
        .append("line")
        .attr("class", `link layer-${i}`)
        .attr("x1", sourceLayer.x)
        .attr("y1", d => height / (sourceLayer.neurons + 1) * (d[0] + 1))
        .attr("x2", targetLayer.x)
        .attr("y2", d => height / (targetLayer.neurons + 1) * (d[1] + 1))
        .attr("stroke", "#999")
        .attr("stroke-width", 2)
        .attr("opacity", 0.6);
    }

    // Forward propagation animation
    const activateNeurons = (layerIndex, activeIndices) => {
      // Highlight active neurons
      svg.selectAll(`.layer-${layerIndex}`)
        .filter((_, i) => activeIndices.includes(i))
        .transition()
        .duration(500)
        .attr("fill", "orange")
        .attr("r", 20);

      // Highlight connections to next layer
      if (layerIndex < layers.length - 1) {
        svg.selectAll(`.link.layer-${layerIndex}`)
          .filter(d => activeIndices.includes(d[0]))
          .transition()
          .duration(500)
          .attr("stroke", "orange")
          .attr("stroke-width", 3)
          .attr("opacity", 1);
      }
    };

    // Reset all neurons and connections
    const resetNetwork = () => {
      svg.selectAll(".node")
        .transition()
        .duration(500)
        .attr("fill", "#69b3a2")
        .attr("r", 15);

      svg.selectAll(".link")
        .transition()
        .duration(500)
        .attr("stroke", "#999")
        .attr("stroke-width", 2)
        .attr("opacity", 0.6);

      // Remove any weight adjustment indicators
      svg.selectAll(".weight-adjustment").remove();
    };

    // Backpropagation animation
    const backpropagate = () => {
      const animateBackprop = (layerIndex) => {
        // Nodes don't change during backpropagation
        // Only animate weight adjustments
        svg.selectAll(`.link.layer-${layerIndex}`)
          .each(function(d) {
            const line = d3.select(this);
            const x1 = +line.attr("x1");
            const y1 = +line.attr("y1");
            const x2 = +line.attr("x2");
            const y2 = +line.attr("y2");
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;

            // Add weight adjustment indicator
            svg.append("circle")
              .attr("class", "weight-adjustment")
              .attr("cx", midX)
              .attr("cy", midY)
              .attr("r", 5)
              .attr("fill", "#ff4444")
              .attr("opacity", 0)
              .transition()
              .duration(500)
              .attr("opacity", 1)
              .transition()
              .duration(500)
              .attr("opacity", 0);
          });

        // Highlight connections
        svg.selectAll(`.link.layer-${layerIndex}`)
          .transition()
          .duration(500)
          .attr("stroke", "#ff4444")
          .attr("stroke-width", 3)
          .attr("opacity", 1)
          .transition()
          .duration(500)
          .attr("stroke-width", 2);
      };

      // Animate backwards through layers
      for (let i = layers.length - 1; i >= 0; i--) {
        setTimeout(() => animateBackprop(i), (layers.length - 1 - i) * 1000);
      }

      // Reset after animation
      setTimeout(resetNetwork, layers.length * 1000);
    };

    if (animationState === 'forward') {
      resetNetwork();
      setTimeout(() => activateNeurons(0, [0, 2]), 500);
      setTimeout(() => activateNeurons(1, [1, 3]), 1500);
      setTimeout(() => activateNeurons(2, [0, 2]), 2500);
      setTimeout(() => activateNeurons(3, [0]), 3500);
      setTimeout(resetNetwork, 4500);
      setTimeout(() => setAnimationState('idle'), 4500);
    } else if (animationState === 'backward') {
      resetNetwork();
      backpropagate();
      setTimeout(() => setAnimationState('idle'), layers.length * 1000);
    }
  }, [animationState]);

  return (
    <div className="flex flex-col items-center p-4">
      <h3 className="text-xl font-bold mb-4">Neural Network Animation</h3>
      <div className="flex gap-4 mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          onClick={() => setAnimationState('forward')}
          disabled={animationState !== 'idle'}
        >
          Forward Pass
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          onClick={() => setAnimationState('backward')}
          disabled={animationState !== 'idle'}
        >
          Backpropagation
        </button>
      </div>
      <svg ref={svgRef} className="border border-gray-200 rounded"></svg>
    </div>
  );
};

export default NeuralNetworkAnimation;