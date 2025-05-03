/* src/components/TranslateWidget.jsx */
import React, { useEffect, useState, useRef } from 'react';
import './TranslateWidget.css';

const LANGUAGES = [
  { code: 'pt', label: 'Português' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  // …adicione mais se desejar…
];

export default function TranslateWidget() {
  const [ready, setReady] = useState(false);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 1) Injeta e inicializa o Google Translate
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en', // idioma original do site
        autoDisplay: false  // sem banner automático
      }, 'google_translate_element');
      setReady(true);
    };
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
  }, []);

  // 2) Remove o banner caso apareça
  useEffect(() => {
    if (!ready) return;
    const interval = setInterval(() => {
      const banner = document.querySelector('.goog-te-banner-frame.skiptranslate')
                  || document.querySelector('.goog-te-banner-frame');
      if (banner) {
        banner.style.display = 'none';
        document.body.style.top = '0px';
        clearInterval(interval);
      }
    }, 100);
  }, [ready]);

  // 3) Aplica tradução disparando event 'change' no select interno
  function applyTranslation(code) {
    const tryApply = () => {
      const combo = document.querySelector('.goog-te-combo')
                  || document.querySelector('#google_translate_element select');
      if (combo) {
        combo.value = code;
        combo.dispatchEvent(new Event('change'));
        return true;
      }
      return false;
    };
    if (!tryApply()) {
      const interval = setInterval(() => {
        if (tryApply()) clearInterval(interval);
      }, 100);
    }
  }

  // 4) Seleciona idioma e dispara tradução
  function selectLanguage(lang) {
    setSelected(lang);
    setOpen(false);
    applyTranslation(lang.code);
  }

  // 5) Autodetecta e traduz no load
  useEffect(() => {
    if (!ready) return;
    const navLang = (navigator.languages?.[0] || navigator.language || 'en').split('-')[0];
    const match = LANGUAGES.find(l => navLang.toLowerCase().startsWith(l.code));
    if (match) selectLanguage(match);
  }, [ready]);

  // 6) Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="tw-widget" ref={dropdownRef}>
      {/* container oculto do Google */}
      <div id="google_translate_element" style={{ display: 'none' }} />

      {/* botão customizado */}
      <button
        className="tw-button"
        onClick={() => setOpen(o => !o)}
        disabled={!ready}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected?.label || 'Idioma'}
        <span className={`tw-arrow ${open ? 'open' : ''}`} />
      </button>

      {/* lista acima do botão */}
      {open && (
        <ul className="tw-list" role="listbox">
          {LANGUAGES.map(lang => (
            <li
              key={lang.code}
              role="option"
              aria-selected={selected?.code === lang.code}
              className={`tw-item ${selected?.code === lang.code ? 'selected' : ''}`}
              onClick={() => selectLanguage(lang)}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}