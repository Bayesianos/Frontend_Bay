import React, { useState, useEffect, useMemo, useRef } from 'react';
import './ChatBot.css';
import LoadingScreen from './LoadingScreen';
import ResultScreen from './ResultScreen';

function ChatBot({ onComplete }) {
  const questions = useMemo(() => [
    'Qual é a sua idade? (0-17 = 0, 18-29 = 1, 30-39 = 2, 40-49 = 3, 50-59 = 4, 60+ = 5)',
    'Qual é o seu sexo? (0 para feminino, 1 para masculino)',
    'Qual é o seu tipo de trabalho? (0, 1, 2, ou 3)',
    'Qual é a sua situação de moradia? (0 para gratuito, 1 para próprio, 2 para alugado)',
    'Qual é o seu nível de poupança? (0 para pouco, 1 para moderado, 2 para bastante rico, 3 para rico, 4 para NA)',
    'Qual é o seu nível de conta corrente? (0 para pouco, 1 para moderado, 2 para rico, 3 para NA)',
    'Qual é o valor do crédito desejado? (0-999 = 0, 1000-4999 = 1, 5000-9999 = 2, 10000-15000 = 3)',
    'Qual é a duração desejada para o empréstimo em meses? (exemplo: 6, 12, 24, 48)',
    'Qual é o objetivo do crédito? (0 para negócios, 1 para carro, 2 para eletrodomésticos, 3 para educação, 4 para móveis/equipamentos, 5 para rádio/TV, 6 para reparos, 7 para férias/outros)',
  ], []);

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

  useEffect(() => {
    if (step > 0 && step < questions.length) {
      setChatHistory(prevHistory => [...prevHistory, { type: 'bot', text: questions[step] }]);
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
    console.log(`Valor digitado pelo usuário para o campo ${currentField}:`, value); 
    setFormData(prevFormData => ({ ...prevFormData, [currentField]: value }));
  };
  
  const handleNext = () => {
    let currentAnswer = formData[currentField];
  
    if (currentAnswer === '') {
      setErrorMessage(`Por favor, preencha o campo ${currentField} com um valor válido.`);
      return;
    }
  
    let convertedAnswer = parseInt(currentAnswer, 10);
    if (isNaN(convertedAnswer)) {
      setErrorMessage('Por favor, insira um valor numérico válido.');
      return;
    }

  
  
    setFormData(prevFormData => ({ ...prevFormData, [currentField]: convertedAnswer }));
  
    setChatHistory(prevHistory => [
      ...prevHistory,
      { type: 'user', text: convertedAnswer }
    ]);

    console.log(`Valor capturado para ${currentField}:`, formData[currentField]);
    setStep(prevStep => (prevStep < questions.length - 1 ? prevStep + 1 : prevStep));
  
    if (step === questions.length - 1) handleSubmit();
  };

  const handleSubmit = async () => {
    console.log("formData antes do envio:", formData); 
    setIsLoading(true);

    try {
      const dataToSend = {
        age: Number(formData.age),
        sex: Number(formData.sex),
        job: Number(formData.job),
        housing: Number(formData.housing),
        saving_accounts: Number(formData.saving_accounts),
        checking_account: Number(formData.checking_account),
        credit_amount: Number(formData.credit_amount),
        duration: Number(formData.duration),
        purpose: Number(formData.purpose),
      };

      console.log("Dados que serão enviados para a API:", dataToSend);

      for (let key in dataToSend) {
        if (isNaN(dataToSend[key])) {
          setErrorMessage(`Por favor, insira um valor válido para o campo: ${key}`);
          throw new Error(`Campo inválido detectado: ${key}`);
        }
      }

      const response = await fetch('https://backend-bay.onrender.com/api/receive-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Detalhes do erro:", errorData);
        throw new Error("Erro ao processar a análise.");
      }

      const data = await response.json();
      setResult(data.emprestimo_valido ? 'approved' : 'denied');
    } catch (error) {
      console.error("Erro ao enviar para a API:", error);
      setErrorMessage("Erro ao processar a análise. Verifique os dados e tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleNext();
  };

  if (isLoading) return <LoadingScreen />;
  if (result) return <ResultScreen result={result} />;

  return (
    <div className="chatbot-container">
      <div className="chatbot-box">
        <div className="chat-history" ref={chatHistoryRef}>
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.type === 'bot' ? 'bot' : 'user'}`}
            >
              {msg.text}
            </div>
          ))}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
        <div className="chatbot-input-container">
          <input
            type="text"
            name={currentField}
            value={formData[currentField]}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="chatbot-input"
            placeholder="Digite sua resposta aqui"
          />
          <button onClick={handleNext} className="chatbot-button">Enviar</button>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
