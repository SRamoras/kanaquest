const express   = require('express');
const supabase  = require('../utils/supabaseClient');
const router    = express.Router();
const getUserId = require('./helpers/getUserId'); // reuse the JWT helper

// POST /api/kanaattempts  { kanaId: 52, correct: true }
router.post('/', async (req, res, next) => {
  try {
    const userId = await getUserId(req);
    if (!userId) return res.status(401).json({ error: 'Not authenticated' });

    const { kanaId, correct } = req.body;
    if (!kanaId || typeof correct !== 'boolean') {
      return res.status(400).json({ error: 'Body must be { kanaId, correct }' });
    }

    const { data, error } = await supabase
      .from('user_kana_attempts')
      .insert([{ user_id: userId, kana_id: kanaId, correct }])
      .select('id, created_at');

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
