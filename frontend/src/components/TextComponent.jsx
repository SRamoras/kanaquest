import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Lenis from '@studio-freight/lenis'; // certifique-se de instalar: npm install @studio-freight/lenis
import './Textcomponent.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollReveal = () => {
  useEffect(() => {
    const splitTypes = document.querySelectorAll('.reveal-type');

    splitTypes.forEach((el) => {
      const bg = el.dataset.bgColor;
      const fg = el.dataset.fgColor;

      // Divide o texto em palavras e caracteres
      const text = new SplitType(el, { types: 'words, chars' });

      gsap.fromTo(
        text.chars,
        { color: bg },
        {
          color: fg,
          duration: 0.3,
          stagger: 0.02,
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true,
            markers: false,
            toggleActions: 'play play reverse reverse'
          }
        }
      );
    });

    const lenis = new Lenis();

    // lenis.on('scroll', (e) => {
    //   console.log(e);
    // });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup se necessário
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      // Adicione aqui o método de destruição do lenis, se houver.
    };
  }, []);

  return (
    <div className="scroll-reveal-container">
      <p className="reveal-type" data-bg-color="#DCDCDC" data-fg-color="#050505">
      Master Japanese kana with Kana Quest.<br /> Engage in fun quizzes and earn instant rewards.<br /> Unlock fluency in just a few simple clicks.
      </p>
    </div>
  );
};

export default ScrollReveal;