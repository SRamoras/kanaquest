import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './KanaTypingGame.css';
import { gsap } from 'gsap';
import Input from '../components/atoms/Input';
import { MdOutlineQuiz } from "react-icons/md";


export default function KanaTypingGame() {
  const navigate = useNavigate();
  const [pool, setPool]             = useState([]);
  const [current, setCurrent]       = useState(null);
  const [input, setInput]           = useState('');
  const [score, setScore]           = useState(0);
  const [rounds, setRounds]         = useState(0);
  const [loading, setLoading]       = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [muted, setMuted]           = useState(false);

  const inRef    = useRef(null);
  const charRef  = useRef(null);

  // Áudios de acerto e erro em public/sounds/
  const correctAudioRef = useRef(new Audio('/sounds/correct.mp3'));
  const wrongAudioRef   = useRef(new Audio('/sounds/wrong.mp3'));

  // Carrega pool e primeira letra
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
        console.error('Erro ao carregar user_known_kana:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Anima troca do símbolo
  useEffect(() => {
    if (!charRef.current) return;
    gsap.fromTo(charRef.current,
      { opacity: 0, y: -30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power2.out' }
    );
    setTimeout(() => inRef.current?.focus(), 100);
  }, [current]);

  const nextRound = () => {
    setInput('');
    setRounds(r => r + 1);
    if (pool.length) {
      const rand = Math.floor(Math.random() * pool.length);
      setCurrent(pool[rand]);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!current) return;

    const isHit = input.trim().toLowerCase() === current.romaji;

    if (!muted) {
      const audio = isHit ? correctAudioRef.current : wrongAudioRef.current;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }

    api.post('/kanaattempts', {
      kanaId:  current.id,
      correct: isHit
    }).catch(console.error);

    if (isHit) setScore(s => s + 1);
    nextRound();
  };

  const handleStop = () => setShowResults(true);
  const handleTryAgain = () => {
    setScore(0);
    setRounds(0);
    setShowResults(false);
    if (pool.length) {
      setCurrent(pool[Math.floor(Math.random() * pool.length)]);
      setInput('');
    }
  };
  const handleChangeKana = () => navigate('/kana');
  const toggleMute = () => setMuted(m => !m);

  if (loading) return <p className="game-msg">Loading…</p>;
  if (!current) return (
    <p className="game-msg">
      You haven’t marked any kana as “known” yet.<br/>
      Go back and tick a few first!
    </p>
  );

  return (

    <div className="kana-typing-game">
      
     {/* Instruções rápidas */}
      <div className="container-left">
       <h1 className='heading-title'>Kana Typing Game</h1> 
       <p className="heading-text">
  As each kana character appears on screen, type its romaji equivalent using your keyboard. Focus on accuracy first, then speed—try to beat your previous best time! This exercise will help you reinforce kana-to-romaji mappings and improve your Japanese reading skills. Ready to test yourself? Let’s go!
</p>
      </div>

      <div className="container-right">
    

<div className='info-quiz-left'>


      <div className="score">
          Score {score} / {rounds}
        </div>

      <div
          className="character-box"
          ref={charRef}
        >
          {current.kana}
        </div>
</div>


<div className='info-quiz-settings'>
        <div className="controls">
          <button className="stop-btn" onClick={handleStop}>
            Stop Quiz
          </button>
          <button
            className="mute-btn"
            onClick={toggleMute}
       
          >
            {muted ? '🔇 Unmute' : '🔊 Mute'}
          </button>
        </div>

<div className='info-quiz-data'>
        
       
        <form className='form-input' onSubmit={handleSubmit}>
          <Input
            ref={inRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="type romaji here"
            autoFocus
            className="input-field"
           
            icon={MdOutlineQuiz}
            
          />
          <button type="submit">Enter</button>
        </form>
      </div>



    </div></div>

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
      </div> 
  );
}
