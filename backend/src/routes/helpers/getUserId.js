// src/routes/helpers/getUserId.js
const supabase = require('../../utils/supabaseClient');

/**
 * Extrai o user_id a partir do Bearer token do supabase
 * Retorna null se não encontrar ou for inválido
 */
async function getUserId(req) {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.split(' ')[1];
    if (!token) return null;

    // Supabase v2: valida o JWT e retorna o user
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return null;

    return user.id;
  } catch {
    return null;
  }
}

module.exports = getUserId;
