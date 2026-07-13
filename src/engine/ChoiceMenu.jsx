import React, { useState, useEffect } from 'react';

export default function ChoiceMenu({ options, onSelect, chapterColor = 'var(--color-ch1-accent)' }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
      } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
      } else if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        onSelect(options[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options, selectedIndex, onSelect]);

  return (
    <div className="choice-menu" style={{ '--active-color': chapterColor }}>
      {options.map((option, index) => (
        <div 
          key={index} 
          className={`choice-item ${index === selectedIndex ? 'active' : ''}`}
          onClick={() => onSelect(option)}
          onMouseEnter={() => setSelectedIndex(index)}
        >
          <div className="choice-cursor">▶</div>
          <div className="choice-label">{option.label}</div>
        </div>
      ))}
    </div>
  );
}
