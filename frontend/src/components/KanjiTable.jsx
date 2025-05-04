import React from 'react';
import './KanjiTable.css';

export default function KanjiTable({ rows, selectedIds, onToggle }) {
  if (!rows.length) return <p>Nenhum kanji cadastrado.</p>;

  return (
    <table className="kanji-table">
      <thead>
        <tr>
          <th>Kanji</th>
          <th>Romaji</th>
          <th>Meaning</th>
          <th>Known?</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(r => {
          const known = selectedIds.has(r.id);
          return (
            <tr key={r.id} className={known ? 'known' : 'unknown'}>
              <td className="char">{r.kana}</td>
              <td>{r.romaji}</td>
              <td>{r.significado}</td>
              <td>
                <input
                  type="checkbox"
                  checked={known}
                  onChange={() => onToggle(r.id, !known)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
