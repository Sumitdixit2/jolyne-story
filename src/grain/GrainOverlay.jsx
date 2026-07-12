import React from 'react';
import './GrainOverlay.css';

export default function GrainOverlay() {
  return (
    <div className="grain-overlay">
      <svg className="grain-svg">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.75" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}
