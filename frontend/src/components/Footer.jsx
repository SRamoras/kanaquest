/* src/components/Footer.jsx */
import React from 'react';
import './Footer.css';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaTwitter } from 'react-icons/fa';
import logo from '/images/logo.png';

export default function Footer({
  logoAlt = 'KanaQuest Logo',
  links = [
    { href: '/privacy-policy', label: 'Privacy policy' },
     { href: '/cookies-policy', label: 'Terms of Coockies' },   { href: '/terms-of-service', label: 'Terms of Service' },

  ],

  links2 = [
    { href: '/login', label: 'Login' },
    { href: '/register', label: 'Register' },
  ],

  socials = {
    tiktok: 'https://www.tiktok.com',
    facebook: 'https://www.facebook.com',
    instagram: 'https://www.instagram.com',
    youtube: 'https://www.youtube.com',
    twitter: 'https://twitter.com',
  },
}) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer" id='contact'>
      <div className="footer__grid">
        {/* Logo & Descrição */}
        <div className="footer__brand">
          {/* <a href="/" className="footer__logo-link">
            <img src={logo} alt={logoAlt} className="footer__logo" />
          </a> */}
          <p className="footer__desc">
          KanaQuest empowers you to master new languages through engaging, game-like experiences and bite-sized lessons designed to keep you motivated every step of the way.
          </p>
        </div>
      
        {/* Navegação */}
        <nav className="footer__nav" aria-label="Navegação do Rodapé">
          <h4 className="footer__title">Get Started</h4>
          <ul className="footer__list">
            {links2.map(({ href, label }) => (
              <li key={label}>
                <a href={href} className="footer__link">{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__nav" aria-label="Navegação do Rodapé">
          <h4 className="footer__title">Navegar</h4>
          <ul className="footer__list">
            {links.map(({ href, label }) => (
              <li key={label}>
                <a href={href} className="footer__link">{label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Redes Sociais */}
        <div className="footer__socials-container">
          <h4 className="footer__title">Folow us</h4>
          <div className="footer__socials" aria-label="Redes Sociais">
            {socials.tiktok && <a href={socials.tiktok} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="TikTok"><FaTiktok/></a>}
            {socials.facebook && <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Facebook"><FaFacebookF/></a>}
            {socials.instagram && <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Instagram"><FaInstagram/></a>}
            {socials.youtube && <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="YouTube"><FaYoutube/></a>}
            {socials.twitter && <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="footer__social" aria-label="Twitter"><FaTwitter/></a>}
          </div>
        </div>
      </div>
<h1 className='main-title-footer'>KanaQuest</h1>
      {/* Rodapé Inferior */}
      <div className="footer__bottom">
<p>&copy; {currentYear} KanaQuest. All rights reserved.</p>
      </div>
    </footer>
);
}
