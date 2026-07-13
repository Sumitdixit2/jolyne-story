import React, { useEffect, useState } from 'react';

export default function GameOver({ message, onRetry, chapterColor = 'var(--color-ch1-accent)' }) {
  const [isVisible, setIsVisible] = useState(false);

  // Fade in on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        onRetry();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onRetry]);

  return (
    <div 
      className="game-over-overlay" 
      style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.2s ease-in' }}
      onClick={onRetry}
    >
      <div className="game-over-title">GAME OVER</div>
      <div className="game-over-message">{message}</div>
      <div className="game-over-retry" style={{ '--color-ch1-accent': chapterColor }}>
        <div className="choice-cursor">▶</div>
        <div>Try Again</div>
      </div>
    </div>
  );
}
