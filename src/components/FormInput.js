// src/components/FormInput.js
import React, { useState } from 'react';

function FormInput({ onSubmit }) {
  const [variables, setVariables] = useState({ var1: '', var2: '' });

  const handleChange = (e) => {
    setVariables({ ...variables, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(variables);  // Passar os dados para o componente principal
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="var1" onChange={handleChange} placeholder="Variável 1" />
      <input type="text" name="var2" onChange={handleChange} placeholder="Variável 2" />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default FormInput;
