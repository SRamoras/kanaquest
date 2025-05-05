import React, { useState } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './LoginPage.css';
import InputComponent from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import api from '../services/api';
import Login from '/images/login.jpg';
import { FiMail, FiLock } from 'react-icons/fi';
export default function LoginPage() {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // <<< hook de navegação
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const errs = {};
    if (!formValues.email) errs.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formValues.email))
      errs.email = 'Invalid email address';
    if (!formValues.password) errs.password = 'Password is required';
    else if (formValues.password.length < 6)
      errs.password = 'Password must be at least 6 characters';
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
      const { data } = await api.post('/auth/login', formValues);
      console.log('[LoginPage] resposta do servidor:', data);
      console.log('[LoginPage] access_token:', data.session.access_token);
      console.log('[LoginPage] refresh_token:', data.session.refresh_token);

      localStorage.setItem('token', data.session.access_token);
      navigate('/kana');
      // redirecionar ou atualizar estado global de autenticação aqui
    } catch (err) {
      console.error('[LoginPage] erro ao logar:', err.response?.data || err.message);
      setErrors({ submit: err.response?.data?.error || 'Login failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-left">
      <div className='login-input-container'>   <form className="login-form" onSubmit={handleSubmit} noValidate>
          <h2 className="login-title">Login to Your Account</h2>

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

          {errors.submit && <p className="error-message">{errors.submit}</p>}

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </Button>

          {/* Novo bloco para registo */}
          <p className="register-text">
          Don't have an account yet?{' '}
            <Link to="/register" className="register-link">
              Register here
            </Link>
            .
          </p>
        </form>
        </div>     
         </div>

      <div className="login-page-right">
        <div className="img-container-login">
          <img src={Login} alt="Login Illustration" />
        </div>
      </div>
    </div>
  );
}
