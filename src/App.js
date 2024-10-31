// App.js
import React, { useState } from 'react';
import ChatBot from './components/ChatBot';
import './components/WelcomePage.css';

function App() {
  const [startChat, setStartChat] = useState(false);

  const handleStartChat = () => {
    setStartChat(true);
  };

  return (
    <div className="App">
      {startChat ? (
        <ChatBot />
      ) : (
        <div className="welcome-container">
          <div className="welcome-box">
            <h1 className="welcome-title">Bem-vindo à Avaliação de Crédito</h1>
            <p className="welcome-text">
              Pressione o botão abaixo para iniciar sua avaliação de crédito e obter uma resposta rápida.
            </p>
            <button className="start-button" onClick={handleStartChat}>Iniciar Chatbot</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


