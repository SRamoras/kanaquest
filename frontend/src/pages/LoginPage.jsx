import React, { useState } from 'react';
import './LoginPage.css';
import InputComponent from '../components/atoms/Input';
import Button from '../components/atoms/Button';

/**
 * LoginPage
 * Renders a login form with email and password inputs.
 */
export default function LoginPage() {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formValues.email) errs.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formValues.email)) errs.email = 'Invalid email address';
    if (!formValues.password) errs.password = 'Password is required';
    else if (formValues.password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // TODO: submit form (API call)
      console.log('Logging in with', formValues);
    }
  };

  return (
    <div className="login-page-container">
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2 className="login-title">Login to Your Account</h2>
        <InputComponent
          label="Email"
          type="email"
          name="email"
          value={formValues.email}
          placeholder="you@example.com"
          onChange={handleChange}
          error={errors.email}
        />

        <InputComponent
          label="Password"
          type="password"
          name="password"
          value={formValues.password}
          placeholder="••••••••"
          onChange={handleChange}
          error={errors.password}
        />

        <Button variant="primary" type="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
}
