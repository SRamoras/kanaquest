// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import { jwtDecode } from 'jwt-decode';          // <-- instale: npm install jwt-decode
import './Navbar.css';
import Button from './atoms/Button';
import Logo from '/images/logo.png';
import DefaultAvatar from '/images/default.jpg';
import api from '../services/api';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();  
  const [user, setUser] = useState({ token: null, email: null });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // 1) Carrega token e busca email sempre que a rota muda
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser({ token: null, email: null });
      return;
    }
    setUser({ token, email: null });
    (async () => {
      try {
        const { data } = await api.get('/users/email');
        setUser({ token, email: data.email });
      } catch (err) {
        console.error('Erro ao buscar email:', err);
        handleLogout();
      }
    })();
  }, [location.pathname]); // <–– re-executa após qualquer navigate

  // 2) Agenda logout justo no exp do JWT
  useEffect(() => {
    if (!user.token) return;
    let payload;
    try {
      payload = jwtDecode(user.token);       // { exp: <timestamp em segundos>, ... }
    } catch {
      // se não for um JWT válido
      handleLogout();
      return;
    }
    const msLeft = payload.exp * 1000 - Date.now();
    if (msLeft <= 0) {
      // já expirou
      handleLogout();
      return;
    }
    const timerId = setTimeout(() => {
      handleLogout();
    }, msLeft);
    return () => clearTimeout(timerId);
  }, [user.token]);

  // 3) Fecha dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser({ token: null, email: null });
    navigate('/login');
  };
  const scrollToFeatures = e => {
    e.preventDefault();
    const el = document.getElementById('features');
    if (!el) return;
    const offset = 120;
    // posição do topo da página até o elemento
    const elementTop = el.getBoundingClientRect().top + window.pageYOffset;
    const targetScroll = elementTop - offset;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    // atualiza o hash sem pular de verdade de página
    window.history.pushState(null, '', '#features');
  };

  const scrollToContact = e => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (!el) return;

    // posição do topo da página até o elemento
    const elementTop = el.getBoundingClientRect().top + window.pageYOffset;
    const targetScroll = elementTop;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    // atualiza o hash sem pular de verdade de página
    window.history.pushState(null, '', '#contact');
  };
  
  const handleHomeClick = e => {
    if (location.pathname === '/') {
      e.preventDefault(); // cancela o Link padrão
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // se não estiver em '/', deixa o <Link> navegar normalmente
  };

  return (
    <header className="navbar">
      <div className="container">
        <nav className="nav-links">
        <Link to="/" onClick={handleHomeClick}>Home</Link>
          <button
        className="nav-link-button"
        onClick={scrollToFeatures}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        Features
      </button>
      <button
        className="nav-link-button"
        onClick={scrollToContact}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        Contact
      </button>
        </nav>

        <img className="logo" src={Logo} alt="Kana Quest Logo" />

        { !user.token ? (
          <Button variant="primary" onClick={() => navigate('/login')}>
            Start Now
          </Button>
        ) : (
          <div className="user-menu" ref={dropdownRef}>
            <button
              className="user-button"
              onClick={() => setDropdownOpen(o => !o)}
            >
              <img src={DefaultAvatar} alt="Avatar" className="avatar" />
              <span className="user-email">
                {user.email ?? 'Carregando…'}
              </span>
              <FiChevronDown className="chevron" />
            </button>
            { dropdownOpen && (
              <ul className="dropdown">
                <li>
                  <Link to="/kana" onClick={() => setDropdownOpen(false)}>
                    Kana
                  </Link>
                </li>
                <li>
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}>
                    Profile
                  </Link>
                </li>
                <li>
                  <button style={{color:"red"}} onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
