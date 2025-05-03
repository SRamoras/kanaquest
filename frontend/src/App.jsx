// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import QuizPage from './pages/QuizPage';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/features" element={<MainPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}