import React, { useEffect, useRef } from 'react';
import './TextCenter.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextCenter = ({ title, text }) => {
  const textRef = useRef(null);

  useEffect(() => {
    const lines = textRef.current.querySelectorAll('.heading-title, .heading-text');

    gsap.fromTo(
      lines,
      { y: 20, filter: 'blur(5px)', opacity: 0 },
      {
        y: 0,
        filter: 'blur(0px)',
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 0.2,       // adiciona 0.5s de atraso antes de iniciar
        stagger: 0.3,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
          // markers: true,
        }
      }
    );
  }, []);

  return (
    <div className="text-center-container" ref={textRef}>
      <h1 className="heading-title">{title}</h1>
      <p className="heading-text">{text}</p>
    </div>
  );
};

TextCenter.defaultProps = {
  title: 'Default Title',
  text: 'Default descriptive text goes here.'
};

export default TextCenter;
