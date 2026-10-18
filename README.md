# ☁️ Painel de Controle & API de Gestão de Usuários (Cloud Edition)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

> Aplicação Full-Stack e API RESTful para gerenciamento de usuários e controle de acesso administrativo (DBA), com interface **Glassmorphism** integrada e arquitetura **Serverless** hospedada na **Vercel** com persistência em banco de dados **PostgreSQL (Neon)**.

---

## 🌐 Demonstração ao Vivo (Live Preview)

👉 **[CLIQUE AQUI PARA ACESSAR O SISTEMA NA NUVEM](https://painel-de-controle-nuvem.vercel.app)**

![Painel de Controle na Nuvem](./painel-de-controle.png)

---

## 🎯 Sobre o Projeto e Evolução Arquitetural

Este projeto nasceu com o objetivo de consolidar os fundamentos do desenvolvimento backend em **Node.js**, evoluindo desde a criação de servidores HTTP nativos e manipulação de rotas via `req` (Request) e `res` (Response) até uma arquitetura de produção moderna em nuvem.

Diferente de protótipos que utilizam arrays temporários em memória (onde os dados são voláteis e se perdem a cada reinicialização do servidor) ou bancos locais, esta **Cloud Edition** implementa:
* **Persistência Real em Nuvem:** Conexão em *Pool* com o **PostgreSQL (Neon Serverless)**, garantindo que os registros de usuários (ID, nome e e-mail) fiquem armazenados de forma permanente.
* **Modularização CommonJS:** Separação limpa de responsabilidades utilizando `require()` e `module.exports` para isolar a camada de banco de dados (`database.js`) da lógica de roteamento e segurança (`index.js`).
* **Comunicação Padronizada e Segura:** Respostas HTTP estruturadas com cabeçalhos e tipos de mídia adequados (`text/html` para a interface visual e `application/json` com serialização e desserialização de dados para a API), além de consultas parametrizadas (`$1`, `$2`) contra *SQL Injection*.

---

## ✨ Funcionalidades

- [x] **Interface Glassmorphism Reativa:** Painel visual moderno em HTML5, CSS3 e JavaScript puro (`Fetch API`) que consome a API em tempo real sem recarregar a página.
- [x] **Listagem em Tempo Real (`GET`):** Consulta assíncrona ao PostgreSQL retornando todos os usuários cadastrados em formato JSON.
- [x] **Cadastro com Validação (`POST`):** Criação de novos registros de usuários com verificação de e-mail único diretamente no banco de dados.
- [x] **Autenticação de Administrador via JWT (`POST`):** Sistema de login exclusivo para DBAs que valida credenciais seguras e emite um Token JWT com expiração configurada (1 hora).
- [x] **Exclusão Protegida por Middleware (`DELETE`):** Rota restrita que intercepta a requisição, exige o cabeçalho `Authorization: Bearer <token>` e valida a assinatura criptográfica antes de permitir a remoção de um registro.

---

## 📡 Documentação da API (Endpoints)

| Método | Rota | Descrição | Autenticação | Status Codes |
| :--- | :--- | :--- | :---: | :--- |
| `GET` | `/` | Entrega a interface visual interativa (`index.html`) | Pública | `200 OK` |
| `POST` | `/login` | Autentica o DBA e retorna o Token JWT assinado | Pública | `200 OK` / `401 Unauthorized` |
| `GET` | `/usuarios` | Retorna a lista completa de usuários em JSON | Pública | `200 OK` / `500 Internal Error` |
| `POST` | `/usuarios` | Cadastra um novo usuário (`nome` e `email` no *body*) | Pública | `201 Created` / `400 Bad Request` |
| `DELETE` | `/usuarios/:id` | Remove um usuário específico pelo ID no banco | **Token JWT (DBA)** | `200 OK` / `401` / `403` / `404` |

---

## 📂 Estrutura de Arquivos

```text
├── public/                 # Camada de Apresentação (Frontend)
│   └── index.html          # Interface Glassmorphism e integração via Fetch API
├── database.js             # Módulo CommonJS de conexão com o PostgreSQL e auto-criação de tabela
├── index.js                # Servidor Express, rotas CRUD, Middleware JWT e exportação Serverless
├── package.json            # Manifesto do projeto, metadados, scripts e dependências (express, pg, jsonwebtoken, dotenv)
├── .gitignore              # Proteção de variáveis sensíveis (.env) e pasta node_modules
└── painel-de-controle.png  # Captura de tela do sistema em produção na nuvem