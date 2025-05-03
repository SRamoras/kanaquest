const express = require('express');
const supabase = require('../utils/supabaseClient');
const router = express.Router();

// GET /api/userknownkana
// Retorna todos os registros com character e romaji via relacionamento
router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('user_known_kana')
      .select(`
        kana_id,
        kana (
          character,
          romaji
        )
      `);

    if (error) {
      console.error('[userKnownKana] Erro ao buscar:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
});

// POST /api/userknownkana
// Body: { kanaIds: [1,2,3,…] }
// Insere novos registros associando user_id
router.post('/', async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const { kanaIds } = req.body;
    if (!Array.isArray(kanaIds)) {
      return res.status(400).json({ error: 'kanaIds deve ser um array de IDs' });
    }

    // Prepara registros incluindo user_id
    const records = kanaIds.map(id => ({
      user_id: userId,
      kana_id: id
    }));

    const { data, error } = await supabase
      .from('user_known_kana')
      .insert(records)
      .select('user_id, kana_id');

    if (error) {
      console.error('[userKnownKana] Erro ao inserir:', error);
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/userknownkana
// Body: { kanaIds: [1,2,3,…] }
// Remove registros correspondentes para o mesmo usuário
router.delete('/', async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const { kanaIds } = req.body;
    if (!Array.isArray(kanaIds)) {
      return res.status(400).json({ error: 'kanaIds deve ser um array de IDs' });
    }

    const { data, error } = await supabase
      .from('user_known_kana')
      .delete()
      .match({ user_id: userId })
      .in('kana_id', kanaIds)
      .select('user_id, kana_id');

    if (error) {
      console.error('[userKnownKana] Erro ao deletar:', error);
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
