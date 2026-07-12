import React from 'react';

export default function MobilePlaceholder() {
  return (
    <div style={{
      width: '100%',
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-cream)',
      color: 'var(--color-ink)',
      padding: '2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontStyle: 'italic' }}>
        Stone Ocean
      </h1>
      <p style={{ fontSize: '1rem', maxWidth: '300px', lineHeight: 1.5 }}>
        This experience requires a larger screen. Please visit on a desktop device.
      </p>
    </div>
  );
}
