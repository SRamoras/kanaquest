// src/components/BackgroundImageText.jsx
import React from 'react';
import './ImgComponentCover.css';
import BgImage from '/images/img3.jpg';

/**
 * BackgroundImageText
 * Renders a full-width background image with two centered overlay texts.
 */
const BackgroundImageText = () => {
  const title1 = 'Unlock Your Kana Potential Like Never Before';
  const subtitle1 = `Don't waste another moment—start your KanaQuest journey and experience interactive lessons, exciting quizzes, and rewarding achievements that make learning Japanese scripts fun and effective!`;

  const title2 = 'Discover the Art and Culture Behind Hiragana & Katakana';
  const subtitle2 = `Delve deep into the history and aesthetics of Japanese kana, master each character through guided challenges, and connect with a vibrant community of learners as you progress on KanaQuest.`;

  return (
    <div
      className="background-wrapper"
      style={{ backgroundImage: `url(${BgImage})` }}
    >
      <div className="mask-img" />
<div className='text-containers'>
      <div className="background-overlay">
        <h2 className="background-title">{title1}</h2>
        <p className="background-subtitle">{subtitle1}</p>
      </div>

      <div className="background-overlay second">
        <h2 className="background-title">{title2}</h2>
        <p className="background-subtitle">{subtitle2}</p>
      </div></div>
    </div>
  );
};

export default BackgroundImageText;

