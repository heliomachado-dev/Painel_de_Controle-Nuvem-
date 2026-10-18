const { Pool } = require('pg');

// Na nuvem, usaremos uma URL de conexão fornecida pela plataforma
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false // Necessário para conexões em nuvem
    }
});

// Criação da tabela automaticamente no PostgreSQL
pool.query(`
    CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL
    )
`).then(() => console.log("Conectado ao PostgreSQL na Nuvem!"))
  .catch(err => console.error("Erro ao criar tabela:", err));

module.exports = pool;