import React, { useState, useRef, useEffect } from 'react';
import './QuestionsComponent.css';
import Img2 from '/images/img3.jpg';
const faqItems = [
  {
    id: 1,
    question: 'What is Kana Quest?',
    answer: 'Kana Quest is an interactive learning game designed to help you master the Japanese kana (hiragana and katakana) through fun quizzes, mnemonic challenges and progression-based levels.',
  },
  {
    id: 2,
    question: 'How do I start learning kana with Kana Quest?',
    answer: 'After creating an account, begin at Level 1 where you’ll learn basic hiragana characters. Complete each mini-quiz to unlock new characters and progress through the story mode.',
  },
  {
    id: 3,
    question: 'Does Kana Quest cover both hiragana and katakana?',
    answer: 'Yes—Levels 1–3 focus on hiragana, Levels 4–6 transition to katakana, and later stages mix both scripts in real-world reading challenges.',
  },
  {
    id: 4,
    question: 'Are there leaderboards or social features?',
    answer: 'You can join seasonal events and compare your progress on global leaderboards. Friends can challenge each other in head-to-head quizzes for extra rewards.',
  },
  {
    id: 5,
    question: 'Can I customize my practice sessions?',
    answer: 'Absolutely. In the “Practice” tab you can filter by script (hiragana/katakana), difficulty level, or focus on characters you’ve missed most in past quizzes.',
  }
];

const Questions = () => {
  const [openId, setOpenId] = useState(null);
  const contentRefs = useRef({});

  const toggle = (id) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  useEffect(() => {
    Object.values(contentRefs.current).forEach(ref => {
      if (!ref) return;
      ref.style.maxHeight = ref.dataset.open === 'true'
        ? `${ref.scrollHeight}px`
        : '0px';
    });
  }, [openId]);
  
  

  return (
    <div className="questions-container">
      <div className="questions-header">
       <div>
        <h2 className="heading-title">Frequently Asked Questions</h2>
        <p className="heading-text">
          Here you’ll find answers to the most common questions about Kana Quest.
        </p>
</div>
{/* <img  src={Img2} alt="" /> */}

      </div>
      <div className="questions-list">
        {faqItems.map(item => (
          <div key={item.id} className="question-item">
            <div
              className="question-header"
              onClick={() => toggle(item.id)}
            >
              <span className="question-title">{item.question}</span>
              <span className="question-icon">
                {openId === item.id ? '−' : '+'}
              </span>
            </div>
            <div
              className="question-content"
              ref={el => contentRefs.current[item.id] = el}
              data-open={openId === item.id}
            >
              <div className="question-answer">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Questions;
