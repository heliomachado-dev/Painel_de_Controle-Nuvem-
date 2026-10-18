require('dotenv').config();
const express = require('express');
const db = require('./database'); // Conexão com o PostgreSQL vinda do database.js
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json()); // Permite ler o corpo das requisições em JSON
app.use(express.static('public')); // Serve a interface visual (HTML/CSS)

// Variáveis de ambiente seguras (vindas do .env ou das configurações do Render)
const CHAVE_SECRETA = process.env.JWT_SECRET;
const ADMIN_USER = process.env.DBA_USER;
const ADMIN_SENHA = process.env.DBA_SENHA;

// Rota de Login (Gera e devolve o Token JWT)
app.post('/login', (req, res) => {
    const { id, senha } = req.body;
    if (id === ADMIN_USER && senha === ADMIN_SENHA) {
        const token = jwt.sign({ cargo: 'DBA' }, CHAVE_SECRETA, { expiresIn: '1h' });
        return res.json({ token: token });
    }
    return res.status(401).json({ erro: "Credenciais inválidas." });
});

// Middleware de Proteção de Rotas (Tranca de segurança)
function verificarAutenticacao(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ erro: "Acesso negado. Token não fornecido." });
    }

    jwt.verify(token, CHAVE_SECRETA, (err, usuarioDecodificado) => {
        if (err) {
            return res.status(401).json({ erro: "Token inválido ou expirado." });
        }
        req.usuario = usuarioDecodificado;
        next(); // Se o token for válido, libera o acesso para a rota
    });
}

// --- ROTAS DO BANCO DE DADOS (POSTGRESQL) ---

// Rota para listar usuários
app.get('/usuarios', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM usuarios");
        res.json(result.rows); 
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar usuários" });
    }
});

// Rota para cadastrar novos usuários
app.post('/usuarios', async (req, res) => {
    const { nome, email } = req.body; 
    try {
        // Os parâmetros $1 e $2 protegem a aplicação contra ataques de SQL Injection
        const result = await db.query(
            "INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING id",
            [nome, email]
        );
        res.status(201).json({ id: result.rows[0].id, nome, email });
    } catch (err) {
        res.status(400).json({ erro: "Erro ao cadastrar. E-mail pode estar em uso." });
    }
});

// Rota protegida para deletar usuários (Exige Token do DBA)
app.delete('/usuarios/:id', verificarAutenticacao, async (req, res) => {
    const id = req.params.id; 
    try {
        const result = await db.query("DELETE FROM usuarios WHERE id = $1", [id]);
        if (result.rowCount === 0) return res.status(404).json({ erro: "Usuário não encontrado." });
        res.json({ mensagem: "Usuário deletado!" });
    } catch (err) {
        res.status(500).json({ erro: "Erro interno." });
    }
});

// Inicia o servidor na porta da nuvem (Render) ou na porta local (3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor Express rodando na porta ${PORT}`));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor Express rodando na porta ${PORT}`));

// Permite que a Vercel execute o seu servidor Express
module.exports = app;