// src/components/ResultsDisplay.js
import React from 'react';

function ResultsDisplay({ results }) {
  return (
    <div>
      <h2>Resultados da Análise</h2>
      {results ? (
        <pre>{JSON.stringify(results, null, 2)}</pre>
      ) : (
        <p>Envie os dados para ver os resultados</p>
      )}
    </div>
  );
}

export default ResultsDisplay;
