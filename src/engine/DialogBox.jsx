import React, { useState, useEffect, useRef } from 'react';
import { audioManager } from '../audio/AudioManager';
import CharacterPortrait from './CharacterPortrait';

export default function DialogBox({ speaker, text, onComplete, isAdvanceable = true }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const typingSpeed = 28; // ms per char
  
  // Refs to avoid stale closures in event listeners
  const textRef = useRef(text);
  const isTypingRef = useRef(isTyping);
  
  // Reset when text changes
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);
    isTypingRef.current = true;
    textRef.current = text;
  }, [text]);

  // Typewriter effect
  useEffect(() => {
    if (!isTyping) return;

    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex < text.length) {
        const nextChar = text.charAt(currentIndex);
        setDisplayedText((prev) => prev + nextChar);
        
        // Play blip for alphanumeric characters
        if (/[a-zA-Z0-9]/.test(nextChar)) {
          audioManager.playBlip();
        }
        
        currentIndex++;
      } else {
        setIsTyping(false);
        isTypingRef.current = false;
        clearInterval(intervalId);
      }
    }, typingSpeed);

    return () => clearInterval(intervalId);
  }, [text, isTyping]);

  // Keyboard handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault(); // Prevent scrolling on Space
        
        if (isTypingRef.current) {
          // Skip typing
          setIsTyping(false);
          isTypingRef.current = false;
          setDisplayedText(textRef.current);
        } else if (isAdvanceable && onComplete) {
          // Advance scene
          onComplete();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdvanceable, onComplete]);
  
  // Click handler (same logic as keyboard)
  const handleClick = () => {
    if (isTypingRef.current) {
      setIsTyping(false);
      isTypingRef.current = false;
      setDisplayedText(textRef.current);
    } else if (isAdvanceable && onComplete) {
      onComplete();
    }
  };

  return (
    <div className="dialog-container">
      {speaker && <CharacterPortrait speaker={speaker} />}
      
      <div className="dialog-box" onClick={handleClick}>
        {speaker && <div className="dialog-name-tab">{speaker}</div>}
        <div className="dialog-text">{displayedText}</div>
        {!isTyping && isAdvanceable && <div className="dialog-cursor">▼</div>}
      </div>
    </div>
  );
}
