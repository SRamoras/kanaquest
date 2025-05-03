import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import Button from './atoms/Button';
import Logo from '/images/logo.png'; // Adjust the path as necessary

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="container">
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </nav>

        <img className="logo" alt="Kana Quest Logo" src={Logo} />

        <Button
          variant="primary"
          onClick={() => navigate('/login')}
        >
          Start Now
        </Button>
      </div>
    </header>
  );
}
