// src/components/Testimonials.jsx
import React, { useRef, useState, useEffect } from 'react';
import './Testimonials.css';

const testimonials = [
  { id: 1, name: 'Ana Silva', role: 'CEO, Example Corp', quote: 'This product completely transformed how we manage our workflow. Highly recommend!' },
  { id: 2, name: 'Carlos Pereira', role: 'CTO, Innovative Startup', quote: 'Incredible features and outstanding support. We couldn’t be happier.' },
  { id: 3, name: 'Mariana Costa', role: 'Marketing Manager, Creative Agency', quote: 'Easy to use and delivers fast results. Excellent investment for our team.' },
  { id: 4, name: 'João Santos', role: 'Head of Sales, Global Inc', quote: 'Our sales pipeline has never looked better. Fantastic tool.' },
  { id: 5, name: 'Laura Mendes', role: 'Product Owner, Tech Solutions', quote: 'Great UX and support. Our team loves it.' }
];

const Testimonials = () => {
  const trackRef = useRef(null);
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

  const handleScroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.testimonial-card');
    const gap = parseInt(getComputedStyle(track).getPropertyValue('gap'));
    const amount = card.offsetWidth + gap;

    track.scrollBy({ left: direction === 'next' ? amount : -amount, behavior: 'smooth' });
    setTimeout(updateButtons, 300); // atualiza após o scroll suave
  };

  return (
    <section className="testimonials-container">
      <div className="testimonials-header">
        <div className="testimonials-title">
          <h2 className="heading-title">Testimonials</h2>
          <p className="heading-text">What our clients say about us</p>
        </div>
        <div className="testimonials-controls">
          <button
            className="arrow-button"
            onClick={() => handleScroll('prev')}
            disabled={!canPrev}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24" height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
              <path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
          </button>
          <button
            className="arrow-button"
            onClick={() => handleScroll('next')}
            disabled={!canNext}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24" height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon"
            >
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
