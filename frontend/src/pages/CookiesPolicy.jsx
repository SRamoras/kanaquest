// src/pages/CookiesPolicy.jsx
import React from 'react';
import './DefaultPolicy.css';

export default function CookiesPolicy() {
  return (
    <div className="default-container">
      <div className="default-header">
        <h1 className="heading-title">Cookies Policy</h1>
        <p>
          At Kana Quest ("we", "our"), we use cookies and similar technologies
          to enhance your experience on our site.
        </p>
      </div>

      <div className="default-section">
        <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files placed on your device when you visit a website.
          They help the site remember your preferences and activity.
        </p>
      </div>

      <div className="default-section">
        <h2>2. How We Use Cookies</h2>
        <ul>
          <li>
            <strong>Authentication:</strong> Keep you logged in during your session.
          </li>
          <li>
            <strong>Preferences:</strong> Store your display settings and quiz progress.
          </li>
          <li>
            <strong>Analytics:</strong> Collect anonymous usage data to improve our services.
          </li>
        </ul>
      </div>

      <div className="default-section">
        <h2>3. Third-Party Cookies</h2>
        <p>
          We may allow third-party services (e.g., analytics providers) to set cookies
          on your device. These are subject to their respective privacy policies.
        </p>
      </div>

      <div className="default-section">
        <h2>4. Managing Cookies</h2>
        <p>
          You can manage or disable cookies through your browser settings. However,
          disabling cookies may affect site functionality, such as keeping you logged in
          or tracking progress.
        </p>
      </div>

      <div className="default-section">
        <h2>5. More Information</h2>
        <p>
          For questions about our Cookies Policy, please contact us at cookies@kanaquest.com.
        </p>
      </div>
    </div>
  );
}