require('dotenv').config();
const express = require('express');
const db = require('./database');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const CHAVE_SECRETA = process.env.JWT_SECRET;
const ADMIN_USER = process.env.DBA_USER;
const ADMIN_SENHA = process.env.DBA_SENHA;

app.post('/login', (req, res) => {
    const { id, senha } = req.body;
    if (id === ADMIN_USER && senha === ADMIN_SENHA) {
        const token = jwt.sign({ cargo: 'DBA' }, CHAVE_SECRETA, { expiresIn: '1h' });
        return res.json({ token: token });
    }
    return res.status(401).json({ erro: "Credenciais inválidas." });
});

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

app.get('/usuarios', (req, res) => {
    db.all("SELECT * FROM usuarios", [], (err, rows) => {
        if (err) return res.status(500).json({ erro: "Erro ao buscar usuários" });
        res.json(rows); 
    });
});

app.post('/usuarios', (req, res) => {
    const { nome, email } = req.body; 
    const stmt = db.prepare("INSERT INTO usuarios (nome, email) VALUES (?, ?)");
    stmt.run(nome, email, function(err) {
        if (err) return res.status(400).json({ erro: "Erro ao cadastrar. E-mail pode estar em uso." });
        res.status(201).json({ id: this.lastID, nome, email });
    });
    stmt.finalize();
});

app.delete('/usuarios/:id', verificarAutenticacao, (req, res) => {
    const id = req.params.id; 
    const stmt = db.prepare("DELETE FROM usuarios WHERE id = ?");
    stmt.run(id, function(err) {
        if (err) return res.status(500).json({ erro: "Erro interno." });
        if (this.changes === 0) return res.status(404).json({ erro: "Usuário não encontrado." });
        res.json({ mensagem: "Usuário deletado!" });
    });
    stmt.finalize();
});

app.listen(3000, () => console.log("Servidor Express rodando na porta 3000"));