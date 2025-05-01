require('dotenv').config()
const express = require('express')
const { createClient } = require('@supabase/supabase-js')
const router = express.Router()

// cliente Supabase com service_role (para criar usuários)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Cadastro de usuário
router.post('/signup', async (req, res) => {
  const { email, password } = req.body
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  })
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

// Login
router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)  // data.session e data.user
})

// Logout (token no header Authorization: Bearer <access_token>)
router.post('/signout', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  const { error } = await supabase.auth.signOut({ token })
  if (error) return res.status(400).json({ error: error.message })
  res.json({ message: 'Deslogado com sucesso' })
})

module.exports = router
