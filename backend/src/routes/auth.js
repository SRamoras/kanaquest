// src/routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const supabase = require('../utils/supabaseClient');
const router = express.Router();

// Sign up a new user
router.post('/signup', async (req, res) => {
  console.log('[Auth] /signup body:', req.body);
  const { email, password } = req.body;
  try {
    // Cria usuário no esquema auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
    if (signUpError) {
      console.error('[Auth] Signup error:', signUpError);
      return res.status(400).json({ error: signUpError.message });
    }
    console.log('[Auth] Signup response data:', signUpData);
    console.log('[Auth] Signup session:', signUpData.session);

    // Inserir dados adicionais na tabela custom 'users' com senha hash
    const userId = signUpData.user.id;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .insert([{ id: userId, email, password: hashedPassword }]);
    if (profileError) {
      console.error('[Auth] Error inserting into users table:', profileError);
    } else {
      console.log('[Auth] User profile inserted:', userProfile);
    }

    res.status(201).json(signUpData);
  } catch (err) {
    console.error('[Auth] Unexpected error during signup:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  console.log('[Auth] /login body:', req.body);
  const { email, password } = req.body;
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('[Auth] Login error:', error);
      return res.status(400).json({ error: error.message });
    }
    console.log('[Auth] Login response data:', data);
    console.log('[Auth] access_token:', data.session?.access_token);
    console.log('[Auth] refresh_token:', data.session?.refresh_token);
    res.status(200).json(data);
  } catch (err) {
    console.error('[Auth] Unexpected error during login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout
router.post('/logout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json({ message: 'Logged out' });
  } catch (err) {
    console.error('[Auth] Unexpected error during logout:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
