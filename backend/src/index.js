// src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const kanaRoutes = require('./routes/kana');
const userKnownKanaRoutes = require('./routes/userKnownKana');
const kanaAttemptsRoutes = require('./routes/kanaAttempts');
const kanaStatsRoutes = require('./routes/kanaStats');

const app = express();
const PORT = process.env.PORT || 5000;

// Whitelist de origens permitidas
const whitelist = [
  'http://localhost:5173',              // front-end em dev
  process.env.CLIENT_URL                  // front-end em prod (definido no .env da produção)
];

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      // permite requests sem origin (Postman, curl)
      if (!origin || whitelist.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true
  })
);
app.use(express.static(path.join(__dirname, '../public')));

// Rotas de API
app.use('/api/kanaStats', kanaStatsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/kana', kanaRoutes);
app.use('/api/userknownkana', userKnownKanaRoutes);
app.use('/api/kanaattempts', kanaAttemptsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Rota do jogo
app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/game.html'));
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
