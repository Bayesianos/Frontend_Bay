// src/components/ChatBot.js
import React, { useState } from 'react';
import './ChatBot.css';
import LoadingScreen from './LoadingScreen';
import ResultScreen from './ResultScreen';

function ChatBot() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    idade: '',
    sexo: '',
    trabalho: '',
    moradia: '',
    classe: '',
    cc: '',
    credito: '',
    duracao: '',
    objetivo: '',
    risco: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const questions = [
    'Qual é a sua idade? (exemplo: 25, 35, 45)',
    'Qual é o seu sexo? (male/female)',
    'Qual é o seu tipo de trabalho? (1, 2, ou 3)',
    'Qual é a sua situação de moradia? (own, rent, ou free)',
    'Qual é a sua classe econômica? (exemplo: NA, little, moderate, quite rich, rich)',
    'Qual é o seu C.C.? (exemplo: little, moderate, NA)',
    'Qual é o valor do crédito desejado? (exemplo: 1169, 5951)',
    'Qual é a duração desejada para o empréstimo em meses? (exemplo: 6, 12, 24, 48)',
    'Qual é o objetivo do crédito? (exemplo: radio/TV, education, car, furniture/equipment, business)',
    'Qual é o seu perfil de risco? (good/bad)',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    if (formData[Object.keys(formData)[step]] === '') {
      alert('Por favor, preencha este campo.');
      return;
    }

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setIsLoading(true);
    // Simulando uma chamada ao backend com atraso de 3 segundos
    setTimeout(() => {
      const mockResult = Math.random() > 0.5 ? 'approved' : 'denied';
      setResult(mockResult);
      setIsLoading(false);
    }, 3000);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (result) {
    return <ResultScreen result={result} />;
  }

  return (
    <div className="chatbot-container">
      <div className="chatbot-box">
        <p className="chatbot-question">{questions[step]}</p>
        <input
          type="text"
          name={Object.keys(formData)[step]}
          value={formData[Object.keys(formData)[step]]}
          onChange={handleInputChange}
          className="chatbot-input"
          placeholder="Digite sua resposta aqui"
        />
        <button onClick={handleNext} className="chatbot-button">Próximo</button>
      </div>
    </div>
  );
}

export default ChatBot;
