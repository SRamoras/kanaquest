import React from 'react';
import './KanaGrid.css';
const GRID = [
  ['a','ka','sa','ta','na','ha','ma','ya','ra','wa'],
  ['i','ki','shi','chi','ni','hi','mi','','ri',''],
  ['u','ku','su','tsu','nu','fu','mu','yu','ru',''],
  ['e','ke','se','te','ne','he','me','','re',''],
  ['o','ko','so','to','no','ho','mo','yo','ro','n']
];

/* Fallbacks para quando API não devolver algum caractere */
const fallbackHiragana = {
  a:'あ', i:'い', u:'う', e:'え', o:'お',
  ka:'か', ki:'き', ku:'く', ke:'け', ko:'こ',
  sa:'さ', shi:'し', su:'す', se:'せ', so:'そ',
  ta:'た', chi:'ち', tsu:'つ', te:'て', to:'と',
  na:'な', ni:'に', nu:'ぬ', ne:'ね', no:'の',
  ha:'は', hi:'ひ', fu:'ふ', he:'へ', ho:'ほ',
  ma:'ま', mi:'み', mu:'む', me:'め', mo:'も',
  ya:'や', yu:'ゆ', yo:'よ',
  ra:'ら', ri:'り', ru:'る', re:'れ', ro:'ろ',
  wa:'わ', o:'を', n:'ん'
};

const fallbackKatakana = {
  a:'ア', i:'イ', u:'ウ', e:'エ', o:'オ',
  ka:'カ', ki:'キ', ku:'ク', ke:'ケ', ko:'コ',
  sa:'サ', shi:'シ', su:'ス', se:'セ', so:'ソ',
  ta:'タ', chi:'チ', tsu:'ツ', te:'テ', to:'ト',
  na:'ナ', ni:'ニ', nu:'ヌ', ne:'ネ', no:'ノ',
  ha:'ハ', hi:'ヒ', fu:'フ', he:'ヘ', ho:'ホ',
  ma:'マ', mi:'ミ', mu:'ム', me:'メ', mo:'モ',
  ya:'ヤ', yu:'ユ', yo:'ヨ',
  ra:'ラ', ri:'リ', ru:'ル', re:'レ', ro:'ロ',
  wa:'ワ', o:'ヲ', n:'ン'
};


export default function KanaGrid({ rows, selectedIds, onToggle, alphabet }) {
   const byRomaji = Object.fromEntries(
       rows.map(r => [r.romaji.toLowerCase(), r])   // normaliza!
     );
  const fallback = alphabet === 'katakana' ? fallbackKatakana : fallbackHiragana;

  return (
    <div className="kana-grid">
      {GRID.flat().map((romaji, idx) => {
        if (!romaji) return <div key={idx} className="cell placeholder" />;

        const row   = byRomaji[romaji];
        const id    = row?.id;    // ★ aqui
        const char  = row?.kana ?? fallback[romaji];
        const known = selectedIds.has(id);

        return (
          <div
            key={idx}
            className={`cell ${known ? 'known' : 'unknown'}`}
            onClick={() => id && onToggle(id, !known)}    
          >
            <span className="kana">{char}</span>
            <span className="roman">{romaji.toUpperCase()}</span>
          </div>
        );
      })}
    </div>
  );
}
