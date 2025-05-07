// src/components/ImagesSection.jsx
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import TextCenter from './TextCenter';
import './OptionComponent.css';
import Img1 from '/images/learn.jpg';
import Img2 from '/images/puzzle.jpg';
import Img3 from '/images/55.jpg';
import Divider from './atoms/Divider';
import Button from './atoms/Button';
import DividerLine from './atoms/DividerLine';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ImagesSection() {
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // verifica token e expiração igual ao Navbar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }
    try {
      const { exp } = jwtDecode(token);
      if (exp * 1000 > Date.now()) {
        setIsLoggedIn(true);
      } else {
        // token expirado
        localStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    } catch {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
    }
  }, [/* roda só uma vez */]);

  const cards = [
    {
      src: Img2,
      title: 'Quiz',
      description: 'Test your kana skills…',
      buttonText: 'Start Quiz',
      onClick: () => navigate(isLoggedIn ? '/kana' : '/login'),
    },
    {
      src: Img1,
      title: 'Learn Fast',
      description: 'Accelerate your kana…',
      buttonText: 'Start Learning',
      onClick: () => navigate('/learn'),
    },
    {
      src: Img3,
      title: 'Kana',
      description: 'Select your Kana',
      buttonText: 'Review Flashcards',
      onClick: () => navigate(isLoggedIn ? '/kana' : '/login'),
    },
  ];

  useEffect(() => {
    const cardEls = gsap.utils.toArray('.images-section .card');

    cardEls.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 50, autoAlpha: 0, filter: 'blur(5px)' },
        {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.out',
          delay: i * 0.3,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );

      const overlay = card.querySelector('.card-overlay');
      gsap.fromTo(
        overlay,
        { y: 20, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          ease: 'power2.out',
          delay: i * 0.3 + 0.1,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <div>
      <Divider />

      <section id="features" className="images-section" ref={sectionRef}>
        <TextCenter
          title="Discover Our Comprehensive Features"
          text="Dive into a robust suite of tools designed to streamline your workflow, boost collaboration, and accelerate productivity. From customizable dashboards and real-time analytics to seamless integrations and dedicated support, explore each feature to see how it can transform your experience."
        />

        <div className="card-grid">
          {cards.map((card, i) => (
            <div
              className="card"
              key={i}
              onClick={card.onClick}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => e.key === 'Enter' && card.onClick()}
            >
              <div className="card-image-wrapper">
                <img src={card.src} alt={card.title} className="card-image" />

                <div className="card-overlay">
                  <div className="overlay-content">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-description">{card.description}</p>
                  </div>
                  <div className="button-container">
                    <Button variant="secondary">{card.buttonText}</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <DividerLine thickness="2px" color="#ccc" margin="10rem 0" />
    </div>
  );
}
