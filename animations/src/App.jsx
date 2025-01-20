import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LinearRegression from './components/LinearRegression';
import LogisticRegression from './components/LogisticRegression';
import NeuralNetworks from './components/NeuralNetworks';
import NNIntroApplesOranges from './components/NNIntroApplesOranges';
import NNIntroNeuralNetwork from './components/NNIntroNeuralNetwork';
import TransformerVisualizer from './components/Transformers';



const App = () => {
  return (
    <div>
      <Navigation />
      <div className="container">
        <Routes>
          <Route path="/" element={<h2>Select a Model</h2>} />
          <Route path="/linear-regression" element={<LinearRegression />} />
          <Route path="/logistic-regression" element={<LogisticRegression />} />
          <Route path="/neural-networks" element={<NeuralNetworks />} />
          <Route path="/neural-networks/apples-oranges" element={<NNIntroApplesOranges />} />
          <Route path="/neural-networks/neurons" element={<NNIntroNeuralNetwork />} />
          <Route path="/neural-networks/transformers" element={<TransformerVisualizer />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
