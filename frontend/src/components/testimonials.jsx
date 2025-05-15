// src/components/Testimonials.jsx
import React, { useRef, useState, useEffect } from 'react';
import './testimonials.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Student',
    quote: 'I learned Japanese kana easily and practiced daily with KanaQuest. It made mastering hiragana and katakana fun and effective!'
  },
  {
    id: 2,
    name: 'Emily Clark',
    role: 'Language Enthusiast',
    quote: 'KanaQuest helped me build confidence quickly. The interactive quizzes and clear lessons made learning kana a breeze.'
  },
  {
    id: 3,
    name: 'Michael Lee',
    role: 'Traveler',
    quote: 'Thanks to KanaQuest, I could read basic Japanese menus and signs on my trip. Learning kana was fast and enjoyable.'
  },
  {
    id: 4,
    name: 'Sophie Turner',
    role: 'Anime Fan',
    quote: 'Practicing with KanaQuest every day improved my listening and reading skills. Now I can follow dialogues in anime without subtitles.'
  },
  {
    id: 5,
    name: 'David Smith',
    role: 'Newbie Learner',
    quote: 'As a complete beginner, I was amazed at how quickly I picked up kana characters. KanaQuest’s step-by-step approach is top-notch.'
  }
];


const Testimonials = () => {
  const trackRef = useRef(null);
  const titleRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = () => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 0);
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth);
  };

  useEffect(() => {
    updateButtons();
    window.addEventListener('resize', updateButtons);
    return () => window.removeEventListener('resize', updateButtons);
  }, []);

  // Animação do título e subtítulo
  useEffect(() => {
    const elems = titleRef.current.querySelectorAll('.heading-title, .heading-text');

    gsap.fromTo(
      elems,
      { y: 20, filter: 'blur(5px)', opacity: 0 },
      {
        y: 0,
        filter: 'blur(0px)',
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 0.1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
          // markers: true,
        }
      }
    );
  }, []);

  // Animação dos cards
  useEffect(() => {
    const cards = gsap.utils.toArray('.testimonial-card');

    gsap.fromTo(
      cards,
      { y: 50, autoAlpha: 0, filter: 'blur(5px)' },
      {
        y: 0,
        autoAlpha: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        delay: 0.2,
        stagger: 0.15,
        scrollTrigger: {
          trigger: trackRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          // markers: true,
        }
      }
    );

    ScrollTrigger.refresh();
  }, []);

  const handleScroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.testimonial-card');
    const gap = parseInt(getComputedStyle(track).getPropertyValue('gap'));
    const amount = card.offsetWidth + gap;

    track.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' });
    setTimeout(updateButtons, 300);
  };

  return (
    <section className="testimonials-container">
      <div className="testimonials-header">
        <div className="testimonials-title" ref={titleRef}>
          <h2 className="heading-title">Testimonials</h2>
          <p className="heading-text">What our users say about us</p>
        </div>
        <div className="testimonials-controls">
          <button
            className="arrow-button"
            onClick={() => handleScroll('prev')}
            disabled={!canPrev}
          >
            {/* Ícone de seta para a esquerda */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                 strokeLinecap="round" strokeLinejoin="round" className="icon">
              <path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <button
            className="arrow-button"
            onClick={() => handleScroll('next')}
            disabled={!canNext}
          >
            {/* Ícone de seta para a direita */}
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
                 strokeLinecap="round" strokeLinejoin="round" className="icon">
              <path d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="testimonials-track"
        ref={trackRef}
        onScroll={updateButtons}
      >
        {testimonials.map(({ id, name, role, quote }) => (
          <div key={id} className="testimonial-card">
            <p className="testimonial-quote">"{quote}"</p>
            <p className="testimonial-name">{name}</p>
            {/* <p className="testimonial-role">{role}</p> */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
