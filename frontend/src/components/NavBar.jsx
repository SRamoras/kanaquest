import React from 'react';
import './Navbar.css';
import Button from './atoms/Button';
import Logo from '/images/logo.png'; // Adjust the path as necessary
export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container">
        
                <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </nav>

        <img className="logo" alt="Start Now" src={Logo} />
       

        
        <Button variant='primary'>Start Now</Button>
   
      </div>
    </header>
  );
}