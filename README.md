# Frontend_Bay - Aplicação de Análise de Crédito

Este projeto é o frontend de uma aplicação de análise de crédito desenvolvida para auxiliar na avaliação de risco e aprovação de empréstimos. Ele coleta informações fornecidas pelos usuários, processa as respostas e as envia para um backend que retorna o resultado da análise de crédito.

## Descrição do Projeto

A aplicação possui uma interface de chatbot que guia o usuário através de uma série de perguntas para coletar informações como idade, sexo, tipo de trabalho, situação de moradia, entre outras. Após o preenchimento das informações, os dados são enviados para a API do backend para análise de crédito.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção da interface de usuário.
- **CSS**: Estilização da interface.
- **Fetch API**: Comunicação com o backend para envio de dados e recebimento de respostas.
- **GitHub Pages** (ou outro serviço de hospedagem de frontend): Hospedagem da aplicação (se aplicável).

## Funcionalidades

- **Chatbot interativo**: Orienta o usuário através das perguntas.
- **Validações de entrada**: Garante que os dados fornecidos pelo usuário são válidos antes do envio para a API.
- **Feedback em tempo real**: Mensagens de erro e notificações são exibidas quando os dados não são válidos ou quando ocorrem falhas na comunicação.
- **Envio de Dados**: Coleta e envia os dados para a API para processamento.

## Instalação e Execução

Para rodar o projeto localmente:

1. **Clone este repositório**:

git clone https://github.com/SeuUsuario/Frontend_Bay.git

2. **Navegue até o diretório do projeto**:

cd Frontend_Bay

3. **Instale as dependências**:

npm install

4. **Execute a aplicação**:

npm start

## Estrutura de Diretórios

- **`src/`**: Contém o código-fonte principal da aplicação.
- **`components/`**: Componentes reutilizáveis como o `ChatBot` e `ResultScreen`.
- **`ChatBot.js`**: Componente principal que gerencia o fluxo de perguntas e respostas.
- **`ResultScreen.js`**: Componente responsável por exibir o resultado da análise.
- **`LoadingScreen.js`**: Componente que exibe uma tela de carregamento enquanto a análise é processada.
- **`public/`**: Arquivos públicos e estáticos.
- **`package.json`**: Arquivo de configuração do projeto, contendo dependências e scripts.

## Problemas Conhecidos

- **CORS**: Pode ocorrer erro de CORS ao tentar acessar a API devido a restrições de origem cruzada. Verifique a configuração do backend para garantir que a aplicação frontend tenha permissão de acesso.
- **Dependências**: Certifique-se de que todas as dependências estão instaladas corretamente para evitar problemas de compilação ou execução.

## Contribuindo

Se você deseja contribuir para este projeto:

1. Faça um fork do repositório.
2. Crie um branch para sua feature (`git checkout -b feature/nova-feature`).
3. Faça commit das suas alterações (`git commit -m 'Adicionando nova feature'`).
4. Envie para o branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).




