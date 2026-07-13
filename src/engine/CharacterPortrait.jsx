import React, { useState } from 'react';

const characterColors = {
  Jolyne: 'var(--color-ch1-accent)',
  Jotaro: 'var(--color-ch2-accent)',
  Ermes: '#FF8C00',
  Gwess: '#A020F0',
  Anasui: '#FF69B4',
  Weather: '#87CEEB',
  Pucci: '#4B0082',
  Emporio: '#FFA500',
  'F.F.': '#00FA9A',
};

export default function CharacterPortrait({ speaker }) {
  const [imageError, setImageError] = useState(false);

  if (!speaker) return null;

  const initial = speaker.charAt(0);
  const bgColor = characterColors[speaker] || 'var(--color-cream-dark)';
  const imageSrc = `/images/portrait-${speaker.toLowerCase().replace(/[^a-z0-9]/g, '')}.jpg`;

  return (
    <div className="character-portrait">
      {!imageError ? (
        <img 
          className="portrait-image" 
          src={imageSrc} 
          alt={speaker} 
          onError={() => setImageError(true)} 
        />
      ) : (
        <div 
          className="portrait-placeholder" 
          style={{ 
            backgroundColor: bgColor, 
            width: '100%', 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: 'var(--color-ink)'
          }}
        >
          {initial}
        </div>
      )}
    </div>
  );
}
