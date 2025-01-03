// src/components/ResultScreen.js
import React from 'react';
import './ResultScreen.css';

function ResultScreen({ result, onRestart }) {
  const handleRestart = () => {
    console.log('Botão Reiniciar clicado'); // Verificação de clique
    if (typeof onRestart === 'function') {
      onRestart();
    } else {
      console.error('onRestart não é uma função');
    }
  };

  return (
    <div className="result-container">
      <div className="result-box">
        <h2 className="result-title">Resultado da Análise de Crédito</h2>
        <p className="result-text">
          {result === 'approved' ? 'Empréstimo Aprovado!' : 'Empréstimo Negado.'}
        </p>
        {result === 'approved' ? (
          <p className="result-details">Parabéns! Você atende aos critérios de aprovação.</p>
        ) : (
          <p className="result-details">Infelizmente, você não atende aos critérios de aprovação.</p>
        )}
        <button className="restart-button" onClick={handleRestart}>
          Reiniciar Análise
        </button>
      </div>
    </div>
  );
}

export default ResultScreen;
