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

// 1) Body parser
app.use(express.json());

// 2) CORS dinâmico
const allowedOrigins = [
  process.env.CLIENT_URL,        // ex: http://localhost:3000 ou https://kanaquest-tau.vercel.app
  'http://localhost:5173',       // Vite dev
  'http://localhost:3000'        // CRA ou vercel dev --listen 3000
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);           
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error(`Origem ${origin} não permitida pelo CORS`));
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// 3) Serve arquivos estáticos do front-end (build em ../dist)
app.use(express.static(path.join(__dirname, '../dist')));

// 4) Rotas da API
app.use('/api/auth',          authRoutes);
app.use('/api/users',         userRoutes);
app.use('/api/kana',          kanaRoutes);
app.use('/api/userknownkana', userKnownKanaRoutes);
app.use('/api/kanaattempts',  kanaAttemptsRoutes);
app.use('/api/kanaStats',     kanaStatsRoutes);

// 5) Catch-all para SPA (Express 5 exige RegExp ou parâmetro nomeado)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// 6) Tratamento de erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

// 7) Start do servidor
app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});

module.exports = app;
