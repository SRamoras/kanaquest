import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import api from '../services/api';
import './ProfilePage.css';
import Select from '../components/atoms/Select';

import { initSmoothScroll, destroySmoothScroll } from '../components/smoothScroll';
export default function ProfilePage() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilter] = useState('all');
  const [timeRange, setTimeRange] = useState('all');
  const options = [
    { label: 'All',      value: 'all'      },
    { label: 'Hiragana', value: 'hiragana' },
    { label: 'Katakana', value: 'katakana' },
    { label: 'Kanji',    value: 'kanji'    },
  ];

  const options2 = [
    { label: 'From Start',      value: 'all'      },
    { label: 'Last 24h', value: '24h' },
    { label: 'Last Week', value: 'week' },
    { label: 'Last Month',    value: 'month'    },
    { label: 'Last Year',    value: 'year'    },
  ];

    useEffect(() => {
      // Configura o smooth scroll (ajusta options conforme necessário)
      initSmoothScroll({ duration: 1.2 });
  
      return () => {
        // Limpa ao desmontar
        destroySmoothScroll();
      };
    }, []);

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

  if (loading) return <div className="pp-loading">Loading dashboard…</div>;

  // Filtragem por tempo
  const now = new Date();
  const filteredByTime = stats.filter(item => {
    const date = new Date(item.created_at);
    switch (timeRange) {
      case '24h':   return now - date <= 24 * 60 * 60 * 1000;
      case 'week':  return now - date <= 7 * 24 * 60 * 60 * 1000;
      case 'month': return now - date <= 30 * 24 * 60 * 60 * 1000;
      case 'year':  return now - date <= 365 * 24 * 60 * 60 * 1000;
      default:      return true;
    }
  });

  // Filtragem por tipo
  const filtered = filteredByTime.filter(item =>
    filterType === 'all' ? true : item.type === filterType
  );

  // Métricas gerais
  const total = filtered.length;
  const correctCount = filtered.filter(item => item.correct).length;
  const accuracyPct = total ? +(correctCount / total * 100).toFixed(1) : 0;

  let bestStreak = 0, current = 0;
  filtered.forEach(item => {
    if (item.correct) {
      current++;
      bestStreak = Math.max(bestStreak, current);
    } else current = 0;
  });

  // Dados para donut de “Correct by Type”
  const typeCounts = filtered.reduce((acc, item) => {
    if (item.correct) acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});
  const donutLabels = ['hiragana', 'katakana', 'kanji'];
  const donutSeries = donutLabels.map(t => typeCounts[t] || 0);

  // Heatmap (todas as datas filtradas por tempo)
  const dateCounts = filteredByTime.reduce((acc, item) => {
    const day = item.created_at.slice(0, 10);
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {});
  const heatmapValues = Object.entries(dateCounts).map(
    ([date, count]) => ({ date, count })
  );

  // Estatísticas por caractere
  const charMap = {};
  filtered.forEach(item => {
    const c = item.character;
    if (!charMap[c]) charMap[c] = { char: c, attempts: 0, wrong: 0 };
    charMap[c].attempts++;
    if (!item.correct) charMap[c].wrong++;
  });
  const charStats = Object.values(charMap).map(o => ({
    ...o,
    wrongPct: +(o.wrong / o.attempts * 100).toFixed(1),
    rightPct: +((o.attempts - o.wrong) / o.attempts * 100).toFixed(1),
    right: o.attempts - o.wrong
  }));

  // Ordenações para tabelas
  const sortedByRight = [...charStats].sort((a, b) => b.rightPct - a.rightPct);
  const sortedByWrong = [...charStats].sort((a, b) => b.wrongPct - a.wrongPct);

  return (
    <div className="pp-container">
    
    <div className='header-text-dashboard'>
      <h1 className="heading-title">Your Compact Kana Performance & Practice Dashboard</h1>
      <p className="heading-text">This dashboard lets you quickly spot mistakes, track your streaks, and monitor progress over time—all in one concise view.
</p>
      </div>
      {/* FILTROS */}
      <div className="pp-filters">
        <div>
    
          <Select
        label="Type:"
        options={options}
        value={filterType}
        onChange={setFilter}
      />
        </div>
        <div>



          <Select
        label="Type:"
        options={options2}
        value={timeRange}
        onChange={setTimeRange}
      />
        </div>
      </div>

      {/* TOPO: Accuracy, Streak, Donut */}
      <div className="pp-grid-top">
        <div className='header-pp-info'>
          <div className="pp-card">
            <h2>Overall Accuracy</h2>
            <div className='center-info-profile'>  
                 <Chart
                 
              options={{
                chart: { type: 'radialBar' },
                colors: ['#cc0000'],
                plotOptions: {
                  radialBar: { dataLabels: { value: { formatter: v => `${v.toFixed(1)}%` } } }
                },
                labels: ['Accuracy']
              }}
              series={[accuracyPct]}
              type="radialBar"
              height={230}
            />
          </div>  </div>

          <div className="pp-card">
      <h2>Best Streak</h2>    
       <div className='center-info-profile'>   
      
            
            <div className="pp-streak-circle">
              <span className="pp-streak-number">{bestStreak}</span>
            </div>

            </div>  

            </div>
        </div>

        <div className='header-pp-info'>
          <div className="pp-calendar-section">
            <h2>Attempts Heatmap</h2>
            <CalendarHeatmap
              className="calendar-heatmap"
              startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))}
              endDate={new Date()}
              values={heatmapValues}
              classForValue={v => v && v.count ? `color-scale-${Math.min(v.count, 4)}` : 'color-empty'}
              showWeekdayLabels
            />
          </div>

          <div className="pp-card">
            <h2>Correct by Type</h2>
           <div className='center-info-profile'> 
            <Chart
              options={{
                chart: { type: 'donut' },
             
                labels: donutLabels,
                colors: ['#cc0000', '#805AD5', '#DD6B20'],
                legend: { position: 'bottom' }
              }}
              series={donutSeries}
              type="donut"
              height={230}
            /></div>
          </div>
        </div>
      </div>

      {/* BOTTOM: Top Wrong e Top Right */}
      <div className="pp-grid-bottom">
        <div className="pp-chart-card">
          <h2>Top 5 Most Missed</h2>
          <Chart
          className="chart-bar-info"
            options={{
              chart: { type: 'bar', toolbar: { show: false } },
              colors: ['#cc0000'],
              xaxis: { categories: sortedByWrong.slice(0, 5).map(o => o.char) },
              yaxis: { labels: { formatter: v => `${v}%` } },
              plotOptions: { bar: { borderRadius: 4, horizontal: false } }
            }}
            series={[{ name: '% Wrong', data: sortedByWrong.slice(0, 5).map(o => o.wrongPct) }]}
            type="bar"
            height={200}
          />
        </div>
        <div className="pp-chart-card">
          <h2>Top 5 Best Known</h2>
          <Chart
            options={{
              chart: { type: 'bar', toolbar: { show: false } },
              xaxis: { categories: sortedByRight.slice(0, 5).map(o => o.char) },
              yaxis: { labels: { formatter: v => `${v}%` } },
              colors: ['#cc0000'],
              plotOptions: { bar: { borderRadius: 4, horizontal: false } }
            }}
            series={[{ name: '% Right', data: sortedByRight.slice(0, 5).map(o => o.rightPct) }]}
            type="bar"
            height={200}
          />
        </div>
      </div>

      {/* DUAS TABELAS ORDENADAS */}
      <div className="pp-table-container-wrapper">
      <section className="pp-table-section">
        <h2>All Kana Sorted by % Right</h2>
        <div className="pp-table-wrapper">
          <table className="pp-table">
            <thead>
              <tr>
                <th>Kana</th><th>Attempts</th><th>Correct</th><th style={{color: "#44a340"}}>% Correct</th>
              </tr>
            </thead>
            <tbody>
              {sortedByRight.map(o => (
                <tr key={o.char}>
                  <td>{o.char}</td>
                  <td>{o.attempts}</td>
                  <td>{o.right}</td>
       
                  <td>{o.rightPct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="pp-table-section">
        <h2>All Kana Sorted by % Wrong</h2>
        <div className="pp-table-wrapper">
          <table className="pp-table">
            <thead>
              <tr>
                <th>Kana</th><th>Attempts</th><th>Wrong</th><th style={{color: "#cc0000"}}>% Wrong</th>
              </tr>
            </thead>
            <tbody>
              {sortedByWrong.map(o => (
                <tr key={o.char}>
                  <td>{o.char}</td>
                  <td>{o.attempts}</td>
                  <td>{o.wrong}</td>
                  <td>{o.wrongPct}%</td>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div></div>
  );
}
