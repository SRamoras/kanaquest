// src/routes/users.js
const express = require('express');
const supabase = require('../utils/supabaseClient');  // certifique-se de usar ANON key aqui
const router = express.Router();

// Get all users from the 'users' table
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*');
    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --------------------------------------------------
// Nova rota: GET /users/email
// Pega o token do header Authorization e retorna { email }
router.get('/email', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Formato de token inválido' });
    }

    // Usa o método getUser (v2) para validar o token e extrair o usuário
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError) {
      console.error('AuthError:', authError);
      return res.status(401).json({ error: authError.message });
    }
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado pelo token' });
    }

    // Busca o e-mail na tabela users usando o user.id
    const { data, error: dbError } = await supabase
      .from('users')
      .select('email')
      .eq('id', user.id)
      .single();
    if (dbError) {
      console.error('DBError:', dbError);
      return res.status(400).json({ error: dbError.message });
    }

    res.json({ email: data.email });
  } catch (err) {
    console.error('Rota /users/email falhou:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
