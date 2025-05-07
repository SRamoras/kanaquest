// api/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('../src/routes/auth');
const userRoutes = require('../src/routes/users');
const kanaRoutes = require('../src/routes/kana');
const userKnownKanaRoutes = require('../src/routes/userKnownKana');
const kanaAttemptsRoutes = require('../src/routes/kanaAttempts');
const kanaStatsRoutes = require('../src/routes/kanaStats');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS: permite seu front em dev e prod
const whitelist = [
  'http://localhost:5173',
  process.env.CLIENT_URL          // ex: https://seu-front.vercel.app
];
app.use(
  cors({
    origin: (origin, cb) =>
      !origin || whitelist.includes(origin)
        ? cb(null, true)
        : cb(new Error(`Origin ${origin} não autorizado pelo CORS`)),
    credentials: true
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/kanaStats', kanaStatsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/kana', kanaRoutes);
app.use('/api/userknownkana', userKnownKanaRoutes);
app.use('/api/kanaattempts', kanaAttemptsRoutes);

app.get('/api/health', (req, res) => res.json({ status: 'OK' }));
app.get('/game', (req, res) =>
  res.sendFile(path.join(__dirname, '../public/game.html'))
);

// exporta o app para o Vercel
module.exports = app;
