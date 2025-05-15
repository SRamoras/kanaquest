import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NotFoundPage.css';
import Button from '../components/atoms/Button';

 const NotFoundPage = () => {


    const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <Button variant="primary" onClick={() => navigate('/')} className="btn-home">Go back home</Button>
    </div>
  );
}
export default NotFoundPage