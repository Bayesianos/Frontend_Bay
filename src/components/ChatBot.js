import React, { useState, useEffect, useMemo, useRef } from 'react';
import './ChatBot.css';
import LoadingScreen from './LoadingScreen';
import ResultScreen from './ResultScreen';

function ChatBot({ onComplete }) {
  const questions = useMemo(() => [
    'Qual é a sua idade?',
    'Qual é o seu sexo? (Escreva Feminino ou Masculino)',
    'Qual é o seu tipo de trabalho? (0, 1, 2 ou 3)',
    'Qual é a sua situação de moradia? (Gratuito (ex:mora com os pais), Próprio ou Alugado)',
    'Qual é o seu nível de poupança? (Pouco, Moderado, Bastante Rico, Rico ou NA)',
    'Qual é o seu nível de conta corrente? (Pouco, Moderado, Rico ou NA)',
    'Qual é o valor do crédito desejado? (Escreva um número: ex. 1000, 5000)',
    'Qual é a duração desejada para o empréstimo em meses? (exemplo: 6, 12, 24)',
    'Qual é o objetivo do crédito? (Negócios, Carro, Educação, Outros...)',
  ], []);

  const mappings = {
    sex: { masculino: 1, feminino: 0 },
    housing: { gratuito: 0, próprio: 1, alugado: 2 },
    saving_accounts: { pouco: 0, moderado: 1, 'bastante rico': 2, rico: 3, na: 4 },
    checking_account: { pouco: 0, moderado: 1, rico: 2, na: 3 },
    purpose: {
      negócios: 0,
      carro: 1,
      eletrodomésticos: 2,
      educação: 3,
      móveis: 4,
      rádio: 5,
      reparos: 6,
      outros: 7,
    },
  };

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    job: '',
    housing: '',
    saving_accounts: '',
    checking_account: '',
    credit_amount: '',
    duration: '',
    purpose: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [chatHistory, setChatHistory] = useState([{ type: 'bot', text: questions[0] }]);
  const [errorMessage, setErrorMessage] = useState('');
  const chatHistoryRef = useRef(null);

  const interpretAnswer = (field, answer) => {
    if (field === 'age') {
      const age = parseInt(answer, 10);
      if (isNaN(age)) return -1;
      if (age <= 17) return 0;
      if (age <= 29) return 1;
      if (age <= 39) return 2;
      if (age <= 49) return 3;
      if (age <= 59) return 4;
      return 5;
    }
    if (field === 'credit_amount') {
      const amount = parseInt(answer, 10);
      if (isNaN(amount)) return -1;
      if (amount <= 999) return 0;
      if (amount <= 4999) return 1;
      if (amount <= 9999) return 2;
      if (amount <= 15000) return 3;
      return -1;
    }
    if (field === 'duration' || field === 'job') {
      const num = parseInt(answer, 10);
      return isNaN(num) ? -1 : num;
    }
    const mappedValue = mappings[field]?.[answer.toLowerCase()];
    return mappedValue !== undefined ? mappedValue : -1;
  };

  useEffect(() => {
    if (step > 0 && step < questions.length) {
      setChatHistory((prev) => [...prev, { type: 'bot', text: questions[step] }]);
    }
  }, [step, questions]);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const currentField = Object.keys(formData)[step];

  const handleInputChange = (e) => {
    const { value } = e.target;
    setErrorMessage('');
    setFormData((prev) => ({ ...prev, [currentField]: value }));
  };

  const handleNext = () => {
    const currentAnswer = formData[currentField];

    if (!currentAnswer) {
      setErrorMessage('Por favor, forneça uma resposta válida.');
      return;
    }

    const convertedAnswer = interpretAnswer(currentField, currentAnswer);
    if (isNaN(convertedAnswer) || convertedAnswer === -1) {
      setErrorMessage('Resposta inválida. Tente novamente.');
      return;
    }

    setFormData((prev) => ({ ...prev, [currentField]: convertedAnswer }));

    setChatHistory((prev) => [
      ...prev,
      { type: 'user', text: currentAnswer },
    ]);

    setStep((prev) => (prev < questions.length - 1 ? prev + 1 : prev));

    if (step === questions.length - 1) handleSubmit();
  };

  const handleSubmit = async () => {
    const convertedFormData = { ...formData };
    // Converte novamente o propósito para garantir que está no formato numérico
    convertedFormData.purpose = interpretAnswer('purpose', formData.purpose);

    console.log('Dados coletados:', convertedFormData);
    setIsLoading(true);
    try {
      const response = await fetch('https://backend-bay.onrender.com/api/receive-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(convertedFormData),
      });

      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Resposta da API:', data);

      setResult(data.emprestimo_valido ? 'approved' : 'denied');
    } catch (error) {
      console.error('Erro ao enviar os dados para a API:', error);
      setErrorMessage('Erro ao processar a análise. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleNext();
  };

  if (isLoading) return <LoadingScreen />;
  if (result) return <ResultScreen result={result} onRestart={() => window.location.reload()} />;

  return (
    <div className="chatbot-container">
      <div className="chatbot-box">
        <div className="chat-history" ref={chatHistoryRef}>
          {chatHistory.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
        <div className="chatbot-input-container">
          <input
            type="text"
            value={formData[currentField]}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="chatbot-input"
            placeholder="Digite sua resposta"
          />
          <button onClick={handleNext} className="chatbot-button">Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
