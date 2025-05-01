import React from 'react';
import TextCenter from './TextCenter';
import './OptionComponent.css';
import Img1 from '/images/learn.jpg';
import Img2 from '/images/puzzle.jpg';
import Img3 from '/images/flashcards.webp';
import Divider from './atoms/Divider';
import Button from './atoms/Button';

export default function ImagesSection() {
  const cards = [
    {
      src: Img2,
      title: 'Quiz',
      description: 'Test your kana skills with timed quizzes and instant feedback.',
      buttonText: 'Start Quiz'
    },
    {
      src: Img1,
      title: 'Learn Fast',
      description: 'Accelerate your hiragana & katakana mastery with bite-sized lessons.',
      buttonText: 'Start Learning'
    },
    {
      src: Img3,
      title: 'Flashcards',
      description: 'Reinforce your memory with customizable flashcards you can review anywhere.',
      buttonText: 'Review Flashcards'
    },
  ];
  

  return (
    <section className="images-section">

<Divider/>


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
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p> 
                 <div className='button-container'>
                 
                      <Button variant='secondary'>{card.buttonText}</Button>
                 </div>
              </div>
            
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
