// src/pages/TermsOfService.jsx
import React from 'react';
import './TermsOfService.css';

export default function TermsOfService() {
  return (
    <div className="tos-container">
      <div className="tos-header">
        <h1 className="heading-title">Terms of Service</h1>
        <p>
          Welcome to Kana Quest. By accessing or using our platform, you agree to
          comply with and be bound by these Terms of Service.
        </p>
      </div>

      <div className="tos-section">
        <h2>1. Accounts</h2>
        <ul>
          <li>You must provide accurate and complete information when creating an account.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
          <li>You agree not to share your account or access token with others.</li>
        </ul>
      </div>

      <div className="tos-section">
        <h2>2. Acceptable Use</h2>
        <ul>
          <li>You may use the platform solely for personal, non-commercial purposes.</li>
          <li>You agree not to engage in any activity that is unlawful or infringes on others' rights.</li>
          <li>You shall not attempt to disrupt or interfere with the platform's functionality.</li>
        </ul>
      </div>

      <div className="tos-section">
        <h2>3. Intellectual Property</h2>
        <p>
          All content on Kana Quest, including text, images, code, and quizzes,
          is the property of Kana Quest and protected by copyright law.
        </p>
      </div>

      <div className="tos-section">
        <h2>4. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account if you violate these Terms.
        </p>
      </div>

      <div className="tos-section">
        <h2>5. Changes to Terms</h2>
        <p>
          We may update these Terms of Service at any time. Any significant changes
          will be communicated via email or a notice on our website.
        </p>
      </div>

      <div className="tos-section">
        <h2>6. Contact</h2>
        <p>
          If you have any questions about these Terms, please contact us at
          support@kanaquest.com.
        </p>
      </div>
    </div>
  );
}
