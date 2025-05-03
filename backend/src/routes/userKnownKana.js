const express = require('express');
const supabase = require('../utils/supabaseClient');
const router = express.Router();

// Função auxiliar para extrair user_id a partir do Bearer Token
async function getUserId(req) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1];
    if (!token) return null;
    // No Supabase v2, getUser verifica o JWT e retorna o usuário
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return null;
    return user.id;
  } catch {
    return null;
  }
}

// GET /api/userknownkana
// Retorna todos os registros com character e romaji via relacionamento
router.get('/', async (req, res, next) => {
    console.log('[userKnownKana] corpo recebido:', req.body);
    try {
            const userId = await getUserId(req);       // ← usa o helper que lê o JWT
            if (!userId) {
              return res.status(401).json({ error: 'Usuário não autenticado' });
           }
        
            const { data, error } = await supabase
              .from('user_known_kana')
              .select(`
                kana_id,
                kana ( character, romaji )
              `)
              .eq('user_id', userId);

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
    console.log('[userKnownKana] corpo recebido:', req.body);
    const { kanaIds } = req.body;
  if (!Array.isArray(kanaIds)) {
    return res.status(400).json({ error: 'Envie um JSON { kanaIds: [1,2,3] }' });
  }
  try {
    const userId = await getUserId(req);
    if (!userId) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const { kanaIds } = req.body;
    if (!Array.isArray(kanaIds)) {
      return res.status(400).json({ error: 'kanaIds deve ser um array de IDs' });
    }

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
    const userId = await getUserId(req);
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
