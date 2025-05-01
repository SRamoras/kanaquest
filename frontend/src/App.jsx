// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import MainPage from './pages/MainPage';

import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/features" element={<MainPage />} />
          <Route path="/contact" element={<MainPage />} />
          {/* Adicione mais rotas conforme necessário */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}