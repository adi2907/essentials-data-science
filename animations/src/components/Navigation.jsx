import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/linear-regression">Linear Regression</Link>
    <Link to="/logistic-regression">Logistic Regression</Link>
    <Link to="/neural-networks">Neural Networks</Link>
  </nav>
);

export default Navigation;
