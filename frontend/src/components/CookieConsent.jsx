// src/components/CookieConsent.jsx
import React, { useState, useEffect } from 'react';
import './CookieConsent.css';
import Button from './atoms/Button'; // Ajusta o caminho conforme necessário
const COOKIE_KEY = 'cookieConsent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      // se ainda não existe decisão, mostra o popup
      setVisible(true);
    }
  }, []);

  const handleChoice = (choice) => {
    localStorage.setItem(COOKIE_KEY, choice);
    setVisible(false);
    // aqui podes disparar funções adicionais, ex: inicializar analytics
  };

  if (!visible) return null;

  return (
    <div className="cookie-consent">
      <div className="cookie-content">
        <p>
        This website uses cookies to improve your experience.
        By continuing to browse, you agree to our Cookies Policy.
        </p>
        <div className="cookie-buttons">
          <Button
            className="btn accept"
            onClick={() => handleChoice('accepted')}
          >
            Accept
          </Button>
          <Button
            className="btn decline"
            onClick={() => handleChoice('declined')}
          >
            Refuse
          </Button>
        </div>
      </div>
    </div>
  );
}
