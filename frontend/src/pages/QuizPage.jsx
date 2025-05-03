import React, { useEffect, useState } from 'react';
import api from '../services/api'; // ajuste o caminho se necessário

export default function KanaTables() {
  const [kanaRows, setKanaRows] = useState([]);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [kanaRes, knownRes] = await Promise.all([
          api.get('/kana'),
          api.get('/userknownkana'),
        ]);

        console.log('[DEBUG] Primeiro objeto de /kana:', kanaRes.data[0]); // 👈
        setKanaRows(kanaRes.data);
        const knownIds = new Set(knownRes.data.map(r => r.kana_id));
        setSelectedIds(knownIds);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleToggle = async (id, isChecked) => {
    console.log('[KanaTables] Toggling ID:', id, 'Checked:', isChecked);
    try {
      if (isChecked) {
        const response = await api.post('/userknownkana', { kanaIds: [id] });
        console.log('[KanaTables] POST response:', response.data);
      } else {
        const response = await api.delete('/userknownkana', { data: { kanaIds: [id] } });
        console.log('[KanaTables] DELETE response:', response.data);
      }
      setSelectedIds(prev => {
        const next = new Set(prev);
        if (isChecked) next.add(id);
        else next.delete(id);
        return next;
      });
    } catch (err) {
      console.error('[KanaTables] Erro ao atualizar conhecido:', err.response?.data || err.message);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (!kanaRows.length) return <p>Nenhum kana disponível.</p>;

  return (
    <div>
      <h2>Tabela Kana</h2>
      <table border="1" cellPadding="4" cellSpacing="0">
        <thead>
          <tr>
            {Object.keys(kanaRows[0]).map(col => <th key={col}>{col}</th>)}
            <th>Conhecido</th>
          </tr>
        </thead>
        <tbody>
          {kanaRows.map((row, idx) => {
            const id = row.id; // usa o campo correto: kana_id
            const isChecked = selectedIds.has(id);
            return (
              <tr key={idx}>
                {Object.values(row).map((val, i) => <td key={i}>{val}</td>)}
                <td>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleToggle(id, !isChecked)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
