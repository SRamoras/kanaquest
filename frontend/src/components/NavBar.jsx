// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiChevronDown } from 'react-icons/fi';
import './Navbar.css';
import Button from './atoms/Button';
import Logo from '/images/logo.png';
import DefaultAvatar from '/images/default.jpg';
import api from '../services/api';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ token: null, email: null });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Ao montar, puxa token e, se existir, busca o email na API
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser({ token: null, email: null });
      return;
    }

    // Armazena token e busca email
    setUser(u => ({ ...u, token }));
    (async () => {
      try {
        const { data } = await api.get('/users/email');
        setUser({ token, email: data.email });
      } catch (err) {
        console.error('Erro ao buscar email:', err);
        // Token inválido/expirado: limpa e encaminha pro login
        localStorage.removeItem('token');
        setUser({ token: null, email: null });
        navigate('/login');
      }
    })();
  }, [navigate]);

  // Fecha dropdown ao clicar fora
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
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="container">
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
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
              onClick={() => setDropdownOpen(open => !open)}
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
