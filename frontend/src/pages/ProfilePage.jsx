import React, { useEffect, useState } from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import api from '../services/api';

export default function ProfilePage() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/kanaStats');
        setStats(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading dashboard…</p>;

  // Overall accuracy
  const total = stats.length;
  const correct = stats.filter(a => a.correct).length;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;

  // Aggregate wrong counts by character
  const wrongByChar = {};
  stats.forEach(a => {
    if (!a.correct) {
      wrongByChar[a.character] = (wrongByChar[a.character] || 0) + 1;
    }
  });
  const topMissed = Object.entries(wrongByChar)
    .map(([character, wrong]) => ({ character, wrong }))
    .sort((a, b) => b.wrong - a.wrong)
    .slice(0, 10);

  // Data for pie chart
  const pieData = [
    { name: 'Correct', value: correct },
    { name: 'Wrong',   value: total - correct }
  ];
  const COLORS = ['#4CAF50', '#F44336'];

  return (
    <div className="p-6 bg-white rounded-lg shadow-md space-y-8">
      <h1 className="text-2xl font-bold">Your Kana Performance</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Accuracy Pie Chart */}
        <div className="flex-1">
          <h2 className="text-lg font-medium mb-2">Overall Accuracy</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <p className="mt-2 text-center text-xl">{accuracy}%</p>
        </div>

        {/* Top Missed Bar Chart */}
        <div className="flex-1">
          <h2 className="text-lg font-medium mb-2">Top 10 Missed Kana</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={topMissed} margin={{ top: 0, right: 20, left: 0, bottom: 5 }}>
              <XAxis dataKey="character" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="wrong" fill="#F44336" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Table */}
      <div>
        <h2 className="text-lg font-medium mb-2">Full Breakdown</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Character</th>
              <th className="px-4 py-2">Attempts</th>
              <th className="px-4 py-2">Wrong</th>
              <th className="px-4 py-2">% Wrong</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(wrongByChar).map(([char, wrong]) => {
              const totalForChar = stats.filter(a => a.character === char).length;
              const pctWrong = Math.round((wrong / totalForChar) * 100);
              return (
                <tr key={char}>  
                  <td className="border px-4 py-2 text-center">{char}</td>
                  <td className="border px-4 py-2 text-center">{totalForChar}</td>
                  <td className="border px-4 py-2 text-center">{wrong}</td>
                  <td className="border px-4 py-2 text-center">{pctWrong}%</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}