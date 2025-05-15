// src/pages/PrivacyPolicy.jsx
import React from 'react';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
  return (
    <div className="privacy-container">
      <div className="privacy-header">
        <h1 className="heading-title">Privacy Policy</h1>
        <p>
          At Kana Quest ("we", "our"), we value your privacy and are committed
          to protecting the personal information you share with us.
        </p>
      </div>

      <div className="privacy-section">
        <h2>1. Information We Collect</h2>
        <p>
          We collect only the information necessary to provide and improve our
          Japanese kana learning services and progress statistics. This includes:
        </p>
        <ul>
          <li>Email address (for authentication and communication)</li>
          <li>JWT token (to maintain authenticated sessions)</li>
          <li>Usage data (pages visited, quizzes taken, statistics)</li>
        </ul>
      </div>

      <div className="privacy-section">
        <h2>2. How We Use Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Authenticate and keep you logged in</li>
          <li>Personalize your learning experience</li>
          <li>Generate performance statistics</li>
          <li>Send relevant notifications and updates</li>
        </ul>
      </div>

      <div className="privacy-section">
        <h2>3. Data Sharing</h2>
        <p>
          We do not share your personal data with third parties, except as required
          by law or to protect our rights.
        </p>
      </div>

      <div className="privacy-section">
        <h2>4. Data Storage and Security</h2>
        <p>
          Your data is stored on secure servers with encryption and restricted
          access. We implement technical and organizational measures to protect
          against unauthorized access.
        </p>
      </div>

      <div className="privacy-section">
        <h2>5. Your Rights</h2>
        <p>You may request:</p>
        <ul>
          <li>Access to your personal data</li>
          <li>Correction or deletion of inaccurate data</li>
          <li>Data portability</li>
        </ul>
        <p>
          To exercise your rights, please email us at privacy@kanaquest.com.
        </p>
      </div>

      <div className="privacy-section">
        <h2>6. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you
          of significant changes via email.
        </p>
      </div>
    </div>
  );
}