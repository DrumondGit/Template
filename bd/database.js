require('dotenv').config();
const { Pool } = require('pg');

// Configuração do Pool do PostgreSQL com a URL de conexão diretamente
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = pool;
