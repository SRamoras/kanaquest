// src/components/layouts/Layout.jsx
import React, { useEffect, useState } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import Loader from './Loader';
import { initSmoothScroll, destroySmoothScroll } from '../smoothScroll';
import './Layout.css';

export default function Layout() {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(false);

  // 1) Inicializa Lenis + override window.scrollTo
  useEffect(() => {
    initSmoothScroll({ duration: 1.2 });
    return () => destroySmoothScroll();
  }, []);

  // 2) Loader em cada mudança de rota
  useEffect(() => {
    setShowLoader(true);
    const timer = setTimeout(() => setShowLoader(false), 100);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="layout">
      <Navbar />

      {/* ← ÚNICA instância aqui, no root */}
      <ScrollRestoration />

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
