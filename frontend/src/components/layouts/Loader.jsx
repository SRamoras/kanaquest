// src/components/Loader.jsx
import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../animations/loader.json';
import './Loader.css';

export default function Loader() {
  return (
    <div className="loader-container">
      <Lottie 
        animationData={animationData} 
        loop={true} 
        style={{ width: 300, height: 300 }} 
      />
    </div>
  );
}
