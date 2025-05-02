import React from 'react';
import './ImgComponent.css';
import Img1 from '/images/img2.jpg';

/**
 * ImageTextComponent
 * Renders an image on the left with a title and text on the right.
 */
const ImageComponent = () => {
  const title = 'Master Japanese Kana Effortlessly';
  const text = `Don't waste a second—dive into KanaQuest and transform your Japanese journey today! With interactive quizzes, mnemonic challenges, and progressive levels, mastering both hiragana and katakana has never been this engaging. Join our vibrant community, challenge your friends, and watch your skills soar to new heights!`;

  return (
    <div className="image-text-wrapper">
      
      <img
        src={Img1}
        alt="Kana Quest hero"
        className="image-text-img"
      />

      <div className="image-text-content">
        <h2 className="heading-title">{title}</h2>
        <p className="heading-text">{text}</p>
      </div>
    </div>
  );
};export default ImageComponent;