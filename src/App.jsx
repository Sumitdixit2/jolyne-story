import React, { useState, useEffect } from 'react';
import GrainOverlay from './grain/GrainOverlay';
import MobilePlaceholder from './components/MobilePlaceholder';

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <>
        <GrainOverlay />
        <MobilePlaceholder />
      </>
    );
  }

  return (
    <>
      <GrainOverlay />
      <div className="experience-container">
        {/* Entry and Chapters will go here */}
        <h1 style={{color: 'var(--color-cream)'}}>Stone Ocean Scaffolded</h1>
      </div>
    </>
  );
}

export default App;
