🚀 Backend de Gestão de Usuários (Node.js + Express)

Um sistema completo de backend e frontend interativo para gestão de usuários, desenvolvido com foco em performance, segurança e arquitetura profissional.

📖 Sobre o Projeto

Este projeto foi construído para consolidar conhecimentos fundamentais no ecossistema Node.js, evoluindo desde a criação manual de rotas com o módulo nativo http até a implementação de um servidor robusto utilizando Express.js. O sistema possui um painel administrativo protegido, onde as operações de deleção física de dados no banco são restritas apenas a usuários autenticados via Token (JWT).

✨ Funcionalidades

Roteamento Dinâmico: Rotas gerenciadas pelo Express.js.

Banco de Dados Relacional: Integração com SQLite para persistência de dados.

Segurança (Autenticação): Proteção de rotas críticas (DELETE) utilizando JSON Web Tokens (JWT).

Interface Profissional: Frontend servido estaticamente pelo próprio backend, utilizando design Glassmorphism e comunicação via API fetch().

Separação de Privilégios: Visão comum para adição/leitura e visão de Administrador (DBA) para exclusão de registros.

🛠️ Tecnologias Utilizadas

Node.js (Ambiente de execução)

Express.js (Framework web)

SQLite3 (Banco de dados relacional leve)

JSON Web Token (JWT) (Segurança e autenticação)

Dotenv (Gerenciamento seguro de variáveis de ambiente)

HTML/CSS/JS (Vanilla) (Frontend)

Desenvolvido e testado em ambiente WSL (Ubuntu).

⚙️ Como executar localmente

Siga as instruções abaixo para rodar o projeto na sua máquina:

Pré-requisitos

Node.js instalado (recomendado via NVM)

Git

Instalação

Clone este repositório:

git clone https://github.com/SEU_USUARIO/nome-do-repositorio.git


Acesse a pasta do projeto:

cd nome-do-repositorio


Instale as dependências:

npm install


Crie um arquivo .env na raiz do projeto contendo as seguintes variáveis:

DBA_USER=admin
DBA_SENHA=senha123
JWT_SECRET=sua_chave_super_secreta_aqui


Inicie o servidor:

npm start


Acesse o painel de controle pelo seu navegador:
http://localhost:3000

Desenvolvido por HelioDev.