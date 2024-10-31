// src/components/ResultScreen.js
import React from 'react';
import './ResultScreen.css';

function ResultScreen({ result }) {
  return (
    <div className="result-container">
      <div className="result-box">
        <h2 className="result-title">Resultado da Análise de Crédito</h2>
        <p className="result-text">
          {result === 'approved' ? 'Empréstimo Aprovado!' : 'Empréstimo Negado.'}
        </p>
      </div>
    </div>
  );
}

export default ResultScreen;
