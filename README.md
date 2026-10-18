# 🚀 API de Gestão de Usuários

Um servidor backend robusto e interativo desenvolvido em Node.js, construído com foco em boas práticas de mercado e executado em ambiente Linux (WSL).

## 🛠️ Tecnologias Utilizadas

* **Node.js**: Plataforma base e criação do servidor nativo[cite: 6].
* **Express**: Framework utilizado para facilitar o roteamento e o tratamento de requisições.
* **SQLite3**: Banco de dados relacional leve para armazenamento local seguro.
* **JWT (JSON Web Token)**: Sistema de segurança para autenticação e proteção de rotas.
* **Dotenv**: Gerenciamento de variáveis de ambiente e proteção de credenciais[cite: 2].

## ⚙️ Funcionalidades do Sistema

A aplicação realiza a comunicação contínua entre cliente e servidor através da serialização e desserialização de dados em JSON[cite: 9], contando com as seguintes funcionalidades:

* **Autenticação Segura**: Login de Administrador (DBA) que gera um token JWT com tempo de expiração.
* **CRUD de Usuários**: 
  * Listagem de usuários no banco de dados.
  * Cadastro de novos usuários (com tratamento para evitar e-mails duplicados).
  * Exclusão de usuários (Rota protegida, exigindo o Token de Autenticação).
* **Interface Estática**: Frontend integrado utilizando Glassmorphism, servido diretamente pelo Express com a configuração correta de `Content-Type`[cite: 11].

## 📂 Estrutura e Gerenciamento

O coração lógico das dependências deste projeto é o `package.json`[cite: 2]. Ele atua como o manifesto da aplicação, definindo atalhos como o script de inicialização e gerenciando pacotes de terceiros (Express, JWT, SQLite) essenciais para o funcionamento do servidor em produção[cite: 2].

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* Ter o [Node.js](https://nodejs.org/) instalado (preferencialmente via NVM em ambiente WSL/Linux).
* Git instalado na máquina.

### Passo a Passo

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/heliomachado-dev/api-gestao-usuarios.git](https://github.com/heliomachado-dev/api-gestao-usuarios.git)