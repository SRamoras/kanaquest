import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { jwtDecode } from 'jwt-decode';
import './Navbar.css';
import Button from './atoms/Button';
import Logo from '/images/logo.png';
import DefaultAvatar from '/images/avatarred.png';
import api from '../services/api';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({ token: null, email: null });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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
  }, [location.pathname]);

  // 2) Agenda logout no exp do JWT
  useEffect(() => {
    if (!user.token) return;
    let payload;
    try {
      payload = jwtDecode(user.token);
    } catch {
      handleLogout();
      return;
    }
    const msLeft = payload.exp * 1000 - Date.now();
    if (msLeft <= 0) {
      handleLogout();
      return;
    }
    const timerId = setTimeout(handleLogout, msLeft);
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

  // 4) Scroll condicional para "features"
  const smoothScroll = (id, offset = 0) => {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
    window.history.pushState(null, '', `#${id}`);
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      smoothScroll(location.state.scrollTo, 120);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

  const handleFeaturesClick = e => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: 'features' } });
    } else {
      smoothScroll('features', 120);
    }
  };

  const handleHomeClick = e => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser({ token: null, email: null });
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="container">
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={handleHomeClick}>Home</Link>
          <button className="nav-link-button" onClick={handleFeaturesClick}>
            Features
          </button>
          <Link to="/learn" onClick={() => setMenuOpen(false)}>Learn</Link>
          <Link
            to={user.token ? '/quiz' : '/login'}
            onClick={() => setMenuOpen(false)}
          >
            Quiz
          </Link>
        </nav>

        <Link to="/" onClick={handleHomeClick} className="logo-link">
          <img className="logo" src={Logo} alt="Kana Quest Logo" />
        </Link>

        {!user.token ? (
          <div className="login-button-container">
            <Button variant="primary" onClick={() => navigate('/login')}>
              Start Now
            </Button>
          </div>
        ) : (
          <div className="user-menu" ref={dropdownRef}>
            <button className="user-button" onClick={() => setDropdownOpen(o => !o)}>
              <img src={DefaultAvatar} alt="Avatar" className="avatar" />
              <span className="user-email">
                {user.email ?? 'Carregando…'}
              </span>
              <FiChevronDown className="chevron" />
            </button>
            {dropdownOpen && (
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
                  <button style={{ color: 'red' }} onClick={handleLogout}>
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
