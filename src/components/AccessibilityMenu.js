import React, { useState, useEffect } from 'react';

export default function AccessibilityMenu() {
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [fontSize, setFontSize] = useState('normal');

  useEffect(() => {
    const savedFont = localStorage.getItem('dyslexiaFont') === 'true';
    const savedSize = localStorage.getItem('fontSize') || 'normal';
    
    setDyslexiaFont(savedFont);
    setFontSize(savedSize);
    
    if (savedFont) {
      document.body.style.fontFamily = 'OpenDyslexic, Arial, sans-serif';
    }
    
    document.body.style.fontSize = savedSize === 'large' ? '18px' : '16px';
  }, []);

  const toggleDyslexiaFont = () => {
    const newValue = !dyslexiaFont;
    setDyslexiaFont(newValue);
    localStorage.setItem('dyslexiaFont', newValue.toString());
    
    if (newValue) {
      document.body.style.fontFamily = 'OpenDyslexic, Arial, sans-serif';
    } else {
      document.body.style.fontFamily = 'Inter, system-ui, sans-serif';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000,
      backgroundColor: 'white',
      padding: '12px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    }}>
      <button
        onClick={toggleDyslexiaFont}
        style={{
          padding: '8px 12px',
          backgroundColor: dyslexiaFont ? '#059669' : '#f3f4f6',
          color: dyslexiaFont ? 'white' : '#374151',
          border: 'none',
          borderRadius: '6px',
          fontSize: '14px',
          cursor: 'pointer'
        }}
      >
        {dyslexiaFont ? '✓ Dyslexia Font' : 'Dyslexia Font'}
      </button>
    </div>
  );
}
