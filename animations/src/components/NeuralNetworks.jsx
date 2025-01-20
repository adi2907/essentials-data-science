import React from 'react';
import { Link } from 'react-router-dom';

const NeuralNetworks = () => (
  <div className="graph-container">
    <h3>Neural Networks</h3>
    <p>Explore how neural networks work:</p>
    <ul>
      <li>
        <Link to="/neural-networks/neurons">Neural Networks - How it works</Link>
      </li>
      <li>
        <Link to="/neural-networks/apples-oranges">Apples vs Oranges - Pattern Recognition</Link>
      </li>
      <li>
        <Link to="/neural-networks/transformers">Transformers</Link>
      </li>
    </ul>
  </div>
);

export default NeuralNetworks;
