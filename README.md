import React from 'react';

const apps = [
  { name: 'GitHub', icon: '🐙', url: 'https://github.com' },
  { name: 'Google', icon: '🔎', url: 'https://google.com' },
  { name: 'Docs', icon: '📄', url: 'https://docs.github.com' },
  { name: 'Email', icon: '✉️', url: 'mailto:someone@example.com' },
  // Add more apps as needed
];

export default function LaunchpadDashboard() {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Launchpad Dashboard</h1>
      <div style={styles.grid}>
        {apps.map(app => (
          <a
            key={app.name}
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.card}
          >
            <span style={styles.icon}>{app.icon}</span>
            <span style={styles.label}>{app.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'sans-serif',
    padding: '2rem',
    background: '#f5f5f5',
    minHeight: '100vh',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
    gap: '1.5rem',
    maxWidth: '600px',
    margin: '0 auto',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textDecoration: 'none',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    padding: '1.5rem 1rem',
    transition: 'transform 0.1s',
    color: '#333',
  },
  icon: {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
  },
  label: {
    fontSize: '1rem',
    fontWeight: 600,
  },
};
