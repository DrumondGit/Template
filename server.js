const express = require('express');
const path = require('path');
const cors = require('cors');
const pool = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações do servidor
app.use(express.static(path.join(__dirname, 'public'))); // Configura o servidor para servir arquivos estáticos
app.use(express.json()); // Habilita o parsing de JSON nas requisições
app.use(cors()); // Habilita o middleware de CORS para permitir requisições de diferentes origens

// Rotas
// Rota para criar um novo item no banco de dados
app.post('/items', async (req, res) => {
  const { name } = req.body;

  try {
    // Executa uma consulta SQL de inserção usando o pool de conexões
    const result = await pool.query('INSERT INTO items (name) VALUES ($1) RETURNING id', [name]);
    res.json({ message: 'Item criado com sucesso', id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message }); // Retorna um erro 500 em caso de falha
  }
});

// Rota para listar todos os itens
app.get('/items', async (req, res) => {
  try {
    // Executa uma consulta SQL para selecionar todos os itens usando o pool de conexões
    const { rows } = await pool.query('SELECT * FROM items');
    res.json(rows); // Retorna os resultados da consulta como JSON
  } catch (err) {
    res.status(500).json({ error: err.message }); // Retorna um erro 500 em caso de falha
  }
});

// Inicia o servidor na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
