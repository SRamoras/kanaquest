import React, { useState } from 'react';
import './SignupPage.css';
import { Link } from 'react-router-dom';
import InputComponent from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Login from '/images/register.jpg';
import { FiMail, FiLock } from 'react-icons/fi';
export default function SignupPage() {
  const [formValues, setFormValues] = useState({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formValues.email) errs.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formValues.email)) errs.email = 'Invalid email address';

    if (!formValues.password) errs.password = 'Password is required';
    else if (formValues.password.length < 6) errs.password = 'Password must be at least 6 characters';

    if (formValues.password !== formValues.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const { data } = await api.post('/auth/signup', {
        email: formValues.email,
        password: formValues.password
      });
      console.log('[SignupPage] resposta do servidor:', data);
      // opcional: auto-login ou redirecionar para login
      navigate('/login');
    } catch (err) {
      console.error('[SignupPage] erro ao registrar:', err.response?.data || err.message);
      setErrors({ submit: err.response?.data?.error || 'Signup failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page-container">
        <div className="signup-page-left">
        
        <div className='signup-input-container'>

      
        <form className="signup-form" onSubmit={handleSubmit} noValidate>
        <h2 className="signup-title">Create New Account</h2>

        <InputComponent
          label="Email"
          type="email"
          name="email"
          value={formValues.email}
          placeholder="you@example.com"
          onChange={handleChange}
          error={errors.email}
            icon={FiMail}
        />

        <InputComponent
          label="Password"
          type="password"
          name="password"
          value={formValues.password}
          placeholder="••••••••"
          onChange={handleChange}
          error={errors.password}
               icon={FiLock}
        />

        <InputComponent
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formValues.confirmPassword}
          placeholder="••••••••"
          onChange={handleChange}
          error={errors.confirmPassword}
               icon={FiLock}
        />

        {errors.submit && <p className="error-message">{errors.submit}</p>}

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Button>
        <p className="register-text">
            Do you already have an account?{' '}
            <Link to="/login" className="register-link">
              Login Here
            </Link>
            .
          </p>
      </form>
  </div>

</div> 

       <div className="signup-page-right">
              <div className="img-container-login">
                <img src={Login} alt="Login Illustration" />
              </div>
            </div>
    </div>
  );
}
