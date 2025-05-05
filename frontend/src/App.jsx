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

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <SignupPage /> },
      { path: 'kana', element: <QuizPage /> },
      { path: 'quiz', element: <KanaTypingGame /> },
      { path: 'profile', element: <ProfilePage /> },
      // … outras rotas
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
