import React, { useEffect, useState } from 'react';
import api from '../services/api';
import KanaGrid from '../components/KanaGrid';
import KanjiTable from '../components/KanjiGrid';
import './QuizPage.css';
import Button from '../components/atoms/Button';
import { useNavigate } from 'react-router-dom';
const TABS = [
  { key: 'hiragana', label: 'Hiragana' },
  { key: 'katakana', label: 'Katakana' },
  { key: 'kanji',    label: 'Kanji'    }
];

export default function AlphabetTabs() {
  const [data, setData]           = useState({ hiragana: [], katakana: [], kanji: [] });
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [active, setActive]       = useState('hiragana');
  const [loading, setLoading]     = useState(true);
  const navigate = useNavigate();
  /* 1) Busca tudo */
  useEffect(() => {
    (async () => {
      try {
        const [kanaRes, knownRes] = await Promise.all([
          api.get('/kana'),
          api.get('/userknownkana')
        ]);

        /* --- separa por type (hiragana|katakana|kanji) ------------ */
        const separated = { hiragana: [], katakana: [], kanji: [] };
        kanaRes.data.forEach(r => {
          const key = (r.type ?? '').toLowerCase().trim();  // <<<<<< usa "type"
          if (separated[key]) separated[key].push(r);
          else console.warn('Tipo desconhecido:', r);       // debugging
        });

        setData(separated);
        setSelectedIds(new Set(knownRes.data.map(r => r.kana_id)));
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  /* 2) Marca/desmarca conhecido */
  const toggleKnown = async (id, willBeKnown) => {
    try {
      if (willBeKnown)
        await api.post('/userknownkana', { kanaIds: [id] });
      else
        await api.delete('/userknownkana', { data: { kanaIds: [id] } });

      setSelectedIds(prev => {
        const next = new Set(prev);
        willBeKnown ? next.add(id) : next.delete(id);
        return next;
      });
    } catch (err) {
      console.error('Erro ao atualizar conhecido:', err.response?.data || err.message);
    }
  };

  /* 3) Render */
  if (loading) return <p>Carregando…</p>;

  return (
    <div className="quiz-page-container">
     
     
     <div className="quiz-header">
     <h1 className="heading-title quiz">Quiz de Kana</h1>
      <p className="heading-text quiz">Here you can tailor your practice to exactly what you need: simply tick the kana symbols you already know—or leave them unchecked if you still want to review them—then start the quiz. The trainer will build each round using only the characters you selected, letting you focus on new or tricky kana without wasting time on the ones you’ve already mastered. As you improve, just add more symbols to your active set and watch your reading speed climb.</p>
      <Button  onClick={() => navigate('/quiz')}>START QUIZ</Button>
      </div>
    

    <div className="tabs-wrapper">
      <div className="tab-bar">
        {TABS.map(t => (
          <button
            key={t.key}
            className={t.key === active ? 'tab active' : 'tab'}
            onClick={() => setActive(t.key)}
          >
           <p>{t.label}</p> 
          </button>
        ))}
      </div>

      <div className="tab-content">
        {active === 'kanji' ? (
          <KanjiTable
            rows={data.kanji}
            selectedIds={selectedIds}
            onToggle={toggleKnown}
          />
        ) : (
          <KanaGrid
            rows={data[active]}
            selectedIds={selectedIds}
            onToggle={toggleKnown}
            alphabet={active}           /* “active” continua igual */
          />
        )}
      </div>

    </div>  </div>
  );
}
