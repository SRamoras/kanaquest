// src/routes/kana.js
const express = require('express');
const getKanaCache = require('../data/kanaCache');
const router = express.Router();

// GET /api/kana — resposta instantânea do cache em memória
router.get('/', (req, res) => {
  const kana = getKanaCache();
  return res.json(kana);
});

module.exports = router;
