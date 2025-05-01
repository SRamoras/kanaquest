import React, { useEffect, useRef } from 'react';
import './TextCenter.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextCenter = ({ title, text }) => {
  const textRef = useRef(null);

  useEffect(() => {
    // Select elements with the specified classes within the container
    const lines = textRef.current.querySelectorAll('.option-title, .option-text');

    gsap.fromTo(
      lines,
      { y: 20, filter: 'blur(5px)', opacity: 0 },
      {
        y: 0,
        filter: 'blur(0px)',
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.3,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 90%',
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