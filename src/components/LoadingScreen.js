// src/components/LoadingScreen.js
import React from 'react';
import './LoadingScreen.css';

function LoadingScreen() {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Processando sua análise de crédito...</p>
    </div>
  );
}

export default LoadingScreen;
