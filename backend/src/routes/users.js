
// src/routes/users.js
const express = require('express');
const supabase = require('../utils/supabaseClient');
const router = express.Router();

// Get all users from the 'users' table
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Future routes (e.g., GET /users/:id, POST /users, etc.) go here

module.exports = router;
