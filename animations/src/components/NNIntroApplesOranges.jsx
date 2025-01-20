import React from 'react';

const NNIntroApplesOranges = () => {
  return (
    <div className="comparison-container">
      <h3>Machine Learning vs Deep Learning</h3>
      <div className="flowchart-container">
        {/* Machine Learning Section */}
        <div className="section">
          <h4>Machine Learning</h4>
          <div className="flowchart">
            <div className="box">
              <span>🚗</span>
              <p>Input</p>
            </div>
            <span className="arrow">→</span>
            <div className="box">
              <span>👨‍💻</span>
              <p>Feature Extraction</p>
            </div>
            <span className="arrow">→</span>
            <div className="box">
              <span>🔵🔵🔵</span>
              <p>Classification</p>
            </div>
            <span className="arrow">→</span>
            <div className="box">
              <span>🚗✅</span>
              <p>Output: Car</p>
            </div>
          </div>
        </div>

        {/* Deep Learning Section */}
        <div className="section">
          <h4>Deep Learning</h4>
          <div className="flowchart">
            <div className="box">
              <span>🚗</span>
              <p>Input</p>
            </div>
            <span className="arrow">→</span>
            <div className="box">
              <span>🔵🔵🔵</span>
              <p>Feature Extraction + Classification</p>
            </div>
            <span className="arrow">→</span>
            <div className="box">
              <span>🚗✅</span>
              <p>Output: Car</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NNIntroApplesOranges;
