// src/components/layouts/Layout.jsx
import React, { useEffect, useState } from 'react';
import {Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Loader from './Loader';               // ← verifique que Loader.jsx está em src/components/Loader.jsx
import './Layout.css';
import { initSmoothScroll, destroySmoothScroll } from '../smoothScroll';

export default function Layout({ children }) {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);

  // inicializa o smooth scroll apenas uma vez
  useEffect(() => {
    initSmoothScroll({ duration: 1.2 });
    return () => destroySmoothScroll();
  }, []);

  // a cada mudança de rota, mostra o Loader por pelo menos 2s
  useEffect(() => {
    setShowLoader(true);
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="layout">
      <Navbar />

      {/* enquanto estiver carregando, mostra só o Loader */}
      {showLoader ? (
        <Loader />
      ) : (
        <main className="layout-main">
       <Outlet />
        </main>
      )}

      <Footer />
    </div>
  );
}
