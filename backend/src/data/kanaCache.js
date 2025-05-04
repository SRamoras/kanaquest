// src/data/kanaCache.js
const supabase = require('../utils/supabaseClient');

let kanaCache = [];

// IIFE para carregar o cache uma vez ao iniciar
(async () => {
  try {
    const { data, error } = await supabase
      .from('kana')
      .select('id, kana:character, romaji, type, meaning')
      .order('id', { ascending: true });

    if (error) throw error;
    kanaCache = data;
    console.log(`[CACHE] Carregado ${kanaCache.length} caracteres kana.`);
  } catch (err) {
    console.error('[CACHE] Falha ao carregar kana:', err.message);
    process.exit(1); // ou continue com array vazio, dependendo da sua escolha
  }
})();

module.exports = () => kanaCache;
