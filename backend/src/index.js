// src/index.js

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const authRoutes          = require('./routes/auth');
const userRoutes          = require('./routes/users');
const kanaRoutes          = require('./routes/kana');
const userKnownKanaRoutes = require('./routes/userKnownKana');
const kanaAttemptsRoutes  = require('./routes/kanaAttempts');
const kanaStatsRoutes     = require('./routes/kanaStats');

const app  = express();
const PORT = process.env.PORT || 5000;

// Body parser
app.use(express.json());

// CORS — usa SEMPRE o mesmo allowedOrigins
const allowedOrigins = [
  process.env.CLIENT_URL,   
  'http://localhost:5173',   
  'http://localhost:3000',
  'https://kanaquest-tau.vercel.app/'
];

app.use(cors({
  origin: (origin, callback) => {
    // libera Postman, Curl ou requests sem origin
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`Origem ${origin} não permitida pelo CORS`));
  },
  credentials: true
}));

// Serve front-end build (ajuste para 'dist' ou 'build' conforme seu setup)
app.use(express.static(path.join(__dirname, '../dist')));

// Rotas da API
app.use('/api/auth',          authRoutes);
app.use('/api/users',         userRoutes);
app.use('/api/kana',          kanaRoutes);
app.use('/api/userknownkana', userKnownKanaRoutes);
app.use('/api/kanaattempts',  kanaAttemptsRoutes);
app.use('/api/kanaStats',     kanaStatsRoutes);

// Catch-all para a SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});

module.exports = app;
