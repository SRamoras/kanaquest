import React, { useEffect, useRef } from 'react';
import TextCenter from './TextCenter';
import './OptionComponent.css';
import Img1 from '/images/learn.jpg';
import Img2 from '/images/puzzle.jpg';
import Img3 from '/images/flashcards.webp';
import Divider from './atoms/Divider';
import Button from './atoms/Button';
import DividerLine from './atoms/DividerLine';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ImagesSection() {
  const sectionRef = useRef(null);

  const cards = [
    { src: Img2, title: 'Quiz',       description: 'Test your kana skills…', buttonText: 'Start Quiz' },
    { src: Img1, title: 'Learn Fast', description: 'Accelerate your kana…',  buttonText: 'Start Learning' },
    { src: Img3, title: 'Flashcards', description: 'Reinforce your memory…', buttonText: 'Review Flashcards' },
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
          }
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
          }
        }
      );
    });

    ScrollTrigger.refresh();
  }, []);

  return (
    <div>
      <Divider />

      <section className="images-section" ref={sectionRef}>
        <TextCenter
          title="Discover Our Comprehensive Features"
          text="Dive into a robust suite of tools designed to streamline your workflow, boost collaboration, and accelerate productivity. From customizable dashboards and real-time analytics to seamless integrations and dedicated support, explore each feature to see how it can transform your experience."
        />

        <div className="card-grid">
          {cards.map((card, i) => (
            <div className="card" key={i}>
              <div className="card-image-wrapper">
                <img src={card.src} alt={card.title} className="card-image" />

                <div className="card-overlay">
                  {/* Wrapper para centralizar título e descrição */}
                  <div className="overlay-content">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-description">{card.description}</p>
                  </div>

                  {/* Botão sempre no final */}
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
