// src/components/KanaTypingGame.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './KanaTypingGame.css';

export default function KanaTypingGame() {
  const navigate = useNavigate();
  const [pool, setPool]         = useState([]);
  const [current, setCurrent]   = useState(null);
  const [input, setInput]       = useState('');
  const [score, setScore]       = useState(0);
  const [rounds, setRounds]     = useState(0);
  const [loading, setLoading]   = useState(true);
  const [showResults, setShowResults] = useState(false);
  const inRef = useRef(null);

  // load user-known kana
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/userknownkana?withKana=true');
        const clean = data.map(r => ({
          id:     r.kana_id,
          kana:   r.kana.character,
          romaji: r.kana.romaji.toLowerCase()
        }));
        setPool(clean);
        setCurrent(clean[Math.floor(Math.random() * clean.length)] || null);
      } catch (err) {
        console.error('Erro a carregar user_known_kana:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const nextRound = () => {
    setInput('');
    setRounds(r => r + 1);
    if (pool.length) {
      const rand = Math.floor(Math.random() * pool.length);
      setCurrent(pool[rand]);
      setTimeout(() => inRef.current?.focus(), 0);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!current) return;

    const isHit = input.trim().toLowerCase() === current.romaji;

    // log the attempt
    api.post('/kanaattempts', {
      kanaId:  current.id,
      correct: isHit
    }).catch(console.error);

    if (isHit) setScore(s => s + 1);
    nextRound();
  };

  const handleStop = () => {
    setShowResults(true);
  };

  const handleTryAgain = () => {
    setScore(0);
    setRounds(0);
    setShowResults(false);
    // pick fresh
    if (pool.length) {
      const rand = Math.floor(Math.random() * pool.length);
      setCurrent(pool[rand]);
      setInput('');
      setTimeout(() => inRef.current?.focus(), 0);
    }
  };

  const handleChangeKana = () => {
    navigate('/kana');
  };

  if (loading) return <p className="game-msg">Loading…</p>;
  if (!current) return (
    <p className="game-msg">
      You haven’t marked any kana as “known” yet.<br/>
      Go back and tick a few first!
    </p>
  );

  return (
    <>
      <div className="typing-game-wrapper">
        <h2>Kana Typing Drill</h2>

        <div className="controls">
          <button className="stop-btn" onClick={handleStop}>
            Stop Quiz
          </button>
        </div>

        <div className="score">
          Score {score} / {rounds}
        </div>

        <div className="character-box">{current.kana}</div>

        <form onSubmit={handleSubmit}>
          <input
            ref={inRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="type romaji here"
            autoFocus
          />
          <button type="submit">Enter</button>
        </form>
      </div>

      {showResults && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Quiz Results</h3>
            <p>Your final score:</p>
            <div className="final-score">
              {score} / {rounds}
            </div>
            <div className="modal-buttons">
              <button onClick={handleTryAgain}>Try Again</button>
              <button onClick={handleChangeKana}>Change the Kana</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
