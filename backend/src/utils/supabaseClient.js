// src/utils/supabaseClient.js
require('dotenv').config();
require('cross-fetch/polyfill');      // polyfill fetch global
const { createClient } = require('@supabase/supabase-js');
const { Agent } = require('https');

const agent = new Agent({ keepAlive: true });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  {
    fetch,                           // cross-fetch global
    fetchOptions: { agent }          // usa HTTP keep-alive
  }
);

module.exports = supabase;
