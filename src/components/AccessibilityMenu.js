import React, { useState, useEffect } from 'react';

export default function AccessibilityMenu() {
  const [dyslexiaFont, setDyslexiaFont] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedFont = localStorage.getItem('dyslexiaFont') === 'true';
    setDyslexiaFont(savedFont);
    
    if (savedFont) {
      document.body.style.fontFamily = 'OpenDyslexic, "Comic Sans MS", Arial, sans-serif';
    }
  }, []);

  const toggleDyslexiaFont = () => {
    const newValue = !dyslexiaFont;
    setDyslexiaFont(newValue);
    localStorage.setItem('dyslexiaFont', newValue.toString());
    
    if (newValue) {
      document.body.style.fontFamily = 'OpenDyslexic, "Comic Sans MS", Arial, sans-serif';
      document.body.style.lineHeight = '1.6';
      document.body.style.letterSpacing = '0.05em';
    } else {
      document.body.style.fontFamily = 'Inter, system-ui, sans-serif';
      document.body.style.lineHeight = '1.5';
      document.body.style.letterSpacing = 'normal';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 1000
    }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: '#3b82f6',
          color: 'white',
          padding: '10px',
          borderRadius: '50%',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
        title="Accessibility Options"
      >
        ♿
      </button>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '50px',
          right: '0',
          backgroundColor: 'white',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb',
          minWidth: '200px'
        }}>
          <h3 style={{ 
            fontSize: '14px', 
            fontWeight: '600', 
            marginBottom: '12px',
            color: '#374151'
          }}>
            Accessibility Options
          </h3>
          
          <button
            onClick={toggleDyslexiaFont}
            style={{
              width: '100%',
              padding: '8px 12px',
              backgroundColor: dyslexiaFont ? '#059669' : '#f3f4f6',
              color: dyslexiaFont ? 'white' : '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              cursor: 'pointer',
              textAlign: 'left'
            }}
          >
            {dyslexiaFont ? '✓ ' : ''}Dyslexia-Friendly Font
          </button>
        </div>
      )}
    </div>
  );
}
