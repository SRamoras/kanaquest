// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import QuizPage from './pages/QuizPage';
import SignupPage from './pages/SignupPage';
import KanaTypingGame from './pages/KanaTypingGame';
import ProfilePage from './pages/ProfilePage';

import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/kana" element={<QuizPage />} />
          <Route path="/quiz" element={<KanaTypingGame />} />
          <Route path="/profile" element={<ProfilePage />} />

          
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}