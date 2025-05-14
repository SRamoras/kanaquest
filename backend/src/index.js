// src/index.js
require('dotenv').config();                // Carrega o .env antes de tudo

const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const kanaRoutes = require('./routes/kana');
const userKnownKanaRoutes = require('./routes/userKnownKana');
const kanaattemptsRoutes = require('./routes/kanaAttempts')
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para JSON, CORS e arquivos estáticos
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' })); // Ajuste o origin conforme seu front-end
app.use(express.static(path.join(__dirname, '../public')));

// Rotas de API
app.use('/api/kanaStats', require('./routes/kanaStats'));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/kana', kanaRoutes);
app.use('/api/userknownkana', userKnownKanaRoutes);
app.use('/api/kanaattempts', kanaattemptsRoutes);




// Rota do jogo
app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/game.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

// Middleware de tratamento de erro
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});

module.exports = app;