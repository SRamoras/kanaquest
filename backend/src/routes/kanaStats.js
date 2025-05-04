const express   = require('express');
const supabase  = require('../utils/supabaseClient');
const getUserId = require('./helpers/getUserId');
const router    = express.Router();

// GET /api/kanaStats
router.get('/', async (req, res, next) => {
  try {
    const userId = await getUserId(req);
    if (!userId) return res.status(401).json({ error: 'Not authenticated' });

    // fetch all attempts for this user, with character & romaji
    const { data, error } = await supabase
      .from('user_kana_stats')           // view created above
      .select('character, romaji, correct')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;