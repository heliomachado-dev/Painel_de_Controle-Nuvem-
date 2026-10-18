require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./database');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const CHAVE_SECRETA = process.env.JWT_SECRET || 'chave_secreta_padrao';
const ADMIN_USER = process.env.DBA_USER || 'admin';
const ADMIN_SENHA = process.env.DBA_SENHA || 'admin';

// Garante que a rota principal (/) carregue o ficheiro index.html da pasta public
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de Login (Gera e devolve o Token JWT)
app.post('/login', (req, res) => {
    const { id, senha } = req.body;
    if (id === ADMIN_USER && senha === ADMIN_SENHA) {
        const token = jwt.sign({ cargo: 'DBA' }, CHAVE_SECRETA, { expiresIn: '1h' });
        return res.json({ token: token });
    }
    return res.status(401).json({ erro: "Credenciais inválidas." });
});

// Middleware de Proteção de Rotas
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
        next();
    });
}

// --- ROTAS DA BASE DE DADOS (POSTGRESQL) ---

app.get('/usuarios', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM usuarios");
        res.json(result.rows); 
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar usuários" });
    }
});

app.post('/usuarios', async (req, res) => {
    const { nome, email } = req.body; 
    try {
        const result = await db.query(
            "INSERT INTO usuarios (nome, email) VALUES ($1, $2) RETURNING id",
            [nome, email]
        );
        res.status(201).json({ id: result.rows[0].id, nome, email });
    } catch (err) {
        res.status(400).json({ erro: "Erro ao cadastrar. E-mail pode estar em uso." });
    }
});

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

// A porta é declarada apenas uma única vez aqui!
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor Express rodando na porta ${PORT}`));

// Exporta a aplicação para a Vercel
module.exports = app;