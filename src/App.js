import React, { useState } from 'react';
import FormInput from './components/FormInput';
import ResultsDisplay from './components/ResultsDisplay';
import BayesianNetwork from './components/BayesianNetwork';

function App() {
  const [results, setResults] = useState(null);
  const [networkData, setNetworkData] = useState(null);

  const handleFormSubmit = async (variables) => {
    try {
      const response = await fetch('http://localhost:5000/api/bayesian', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variables),
      });
      const data = await response.json();
      setResults(data.results);
      setNetworkData(data.network); // Supondo que a rede vem como parte da resposta
    } catch (error) {
      console.error("Erro ao chamar a API:", error);
    }
  };

  return (
    <div className="App">
      <h1>Interface para Rede Bayesiana</h1>
      <FormInput onSubmit={handleFormSubmit} />
      <ResultsDisplay results={results} />
      {networkData && <BayesianNetwork data={networkData} />}
    </div>
  );
}

export default App;
