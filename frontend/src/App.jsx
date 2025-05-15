// src/App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import QuizPage from './pages/QuizPage';
import SignupPage from './pages/SignupPage';
import KanaTypingGame from './pages/KanaTypingGame';
import ProfilePage from './pages/ProfilePage';
import LearnPage from './pages/LearnPage';
import './index.css';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CookiesPolicy from './pages/CookiesPolicy';
import TermsOfService from './pages/TermsOfService';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },

      { path: '', element: <LoginPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <SignupPage /> },
      { path: 'kana', element: <QuizPage /> },
      { path: 'quiz', element: <KanaTypingGame /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'learn', element: <LearnPage /> },
      { path: 'privacy-policy', element: <PrivacyPolicy /> },
      { path: 'cookies-policy', element: <CookiesPolicy /> },
          
      { path: 'terms-of-service', element: <TermsOfService /> },
      // … outras rotas
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
