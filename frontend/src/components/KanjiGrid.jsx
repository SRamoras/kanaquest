import React from 'react';
import './KanjiGrid.css';

/** Largura e altura das células (mesmo tamanho do kana) */
const CELL = 72;

/**
 * rows        → array vindo da API (id, kana, romaji, type:'kanji')
 * selectedIds → Set com ids já marcados
 * onToggle    → (id, willBeKnown)  ⬅ igual ao Hiragana/Katakana
 */
export default function KanjiGrid({ rows, selectedIds, onToggle }) {
  if (!rows.length) return <p>Nenhum kanji cadastrado.</p>;

  return (
    <div
      className="kanji-grid"
      style={{ '--cell': `${CELL}px` }}     /* permite alterar só aqui */
    >
      {rows.map(r => {
        const known = selectedIds.has(r.id);
        return (
          <div
            key={r.id}
            className={`cell1 ${known ? 'known' : 'unknown'}`}
            onClick={() => onToggle(r.id, !known)}
          >
            <span className="char">{r.kana}</span>
            <span className="roman">{r.romaji}</span>
          </div>
        );
      })}
    </div>
  );
}
