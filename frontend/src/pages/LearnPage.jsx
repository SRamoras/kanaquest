// src/pages/LearnPage.jsx
import React, { useEffect, useState } from 'react';
import './LearnPage.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DividerLine from '../components/atoms/DividerLine';
const sections = [
  {
    id: 'hiragana',
    title: 'Learn Hiragana',
    description:
      'Hiragana is the basic phonetic syllabary of Japanese, used for native words, verb endings, and particles. Mastering Hiragana is the first step to reading and writing in Japanese.',
    embedUrl: 'https://www.youtube.com/embed/6p9Il_j0zjc?start=1900',
  },
  {
    id: 'katakana',
    title: 'Learn Katakana',
    description:
      'Katakana is the complementary phonetic syllabary to Hiragana, mainly used for foreign loanwords, onomatopoeia, and scientific names. It\'s essential for reading menus, brands, and imported terms.',
    embedUrl: 'https://www.youtube.com/embed/s6DKRgtVLGA',
  },
  {
    id: 'kanji',
    title: 'Introduction to Kanji',
    description:
      'Kanji are the Chinese characters used in Japanese to represent ideas, words, and concepts. Starting with the most common Kanji helps you quickly expand your written vocabulary.',
    embedUrl: 'https://www.youtube.com/embed/mPppVDX_GiY',
  },
];

export default function LearnPage() {
  const [loaded, setLoaded] = useState({});

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const sectionsEls = gsap.utils.toArray('.learning-section');
    sectionsEls.forEach((wrapper) => {
      const contentElems = wrapper.querySelectorAll(
        '.video-text .heading-title, .video-text .heading-text, .video-container'
      );
      gsap.fromTo(
        contentElems,
        { y: 20, autoAlpha: 0, filter: 'blur(5px)' },
        {
          y: 0,
          autoAlpha: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power2.out',
          delay: 0.3,
          stagger: 0.3,
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, []);

  return (
    <div className="learn-page">
      <div className="video-intro">
        <h2 className="heading-title">Japanese Learning Resources</h2>
        <p className="heading-text">
          Discover concise video lessons covering Hiragana, Katakana, and Kanji fundamentals. Built by expert instructors, these tutorials guide you through pronunciation, writing practice, and character recognition to jumpstart your Japanese learning.
        </p>
      </div>
      <DividerLine />
      <div className="video-page-container">
        {sections.map(({ id, title, description, embedUrl }) => (
          <section key={id} className="learning-section">
            <div className="video-text">
              <h2 className="heading-title">{title}</h2>
              <p className="heading-text">{description}</p>
            </div>
            <div className={`video-container ${loaded[id] ? 'loaded' : ''}`}>
              <iframe
                src={embedUrl}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setLoaded((prev) => ({ ...prev, [id]: true }))}
              />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}