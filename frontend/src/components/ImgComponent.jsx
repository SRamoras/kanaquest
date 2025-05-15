// src/components/ImgComponent.jsx
import React, { useRef, useEffect } from 'react';
import './ImgComponent.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Img1 from '/images/img4.jpg';
import Button from './atoms/Button.jsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ImageTextComponent
 * Renders an image on the left with a title and text on the right,
 * with GSAP scroll-triggered animations.
 */
const ImageComponent = () => {
  const wrapperRef = useRef(null);
  const navigate = useNavigate();
  const title = 'Master Japanese Kana Effortlessly';
  const text = `Don't waste a second—dive into KanaQuest and transform your Japanese journey today! With interactive quizzes, mnemonic challenges, and progressive levels, mastering both hiragana and katakana has never been this engaging. Join our vibrant community, challenge your friends, and watch your skills soar to new heights!`;

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const img = wrapper.querySelector('.image-text-img');
    const contentElems = wrapper.querySelectorAll('.heading-title, .heading-text');
    const buttonEl = wrapper.querySelector('.button-container button');

    // 1) animação da imagem
    gsap.fromTo(
      img,
      { x: -100, autoAlpha: 0, filter: 'blur(5px)' },
      {
        x: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      }
    );

    // 2) animação do título e texto
    gsap.fromTo(
      contentElems,
      { y: 20, autoAlpha: 0, filter: 'blur(5px)' },
      {
        y: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        delay: 0.3,     // começa logo após a imagem
        stagger: 0.3,
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      }
    );

    // 3) “pop” do botão
    gsap.fromTo(
      buttonEl,
      { scale: 0.8, autoAlpha: 0,filter: 'blur(5px)' },
      {
        scale: 1,
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: 0.6,
        ease: 'back.out(2)',  // efeito de “bounce”
        delay: 1.2,           // após título/texto (0.3 + 0.3*2)
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      }
    );

    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="image-text-wrapper" ref={wrapperRef}>
      <img
        src={Img1}
        alt="Kana Quest hero"
        className="image-text-img"
      />

      <div className="image-text-content">
        <h2 className="heading-title">{title}</h2>
        <p className="heading-text">{text}</p>
        <div className="button-container">
          <Button variant="primary" onClick={() => navigate('/login')}>
            Start Your Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageComponent;
