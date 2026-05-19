import React from 'react';
import { motion } from 'framer-motion';
import '../styles/message.css';
import owlMascot from '../assets/landing.png.png';

const SUGGESTIONS = [
  ' Summarize my PDF',
  ' Generate a quiz',
  ' Explain this concept',
  ' Create study notes',
  ' Give me key insights',
  ' Test my knowledge',
];

export default function EmptyState({ onSuggestionClick }) {
  return (
    <motion.div
      className="empty-state"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{
          width: 140,
          height: 140,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, rgba(168,213,162,0.35) 0%, rgba(245,233,122,0.2) 60%, transparent 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 12px 36px rgba(168,213,162,0.25)',
        }}>
          {/* <span style={{ fontSize: '5.5rem', lineHeight: 1, filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.1))' }}>🦉</span> */}
          <img
  src={owlMascot}
  alt="Pookoo Owl"
  style={{
    width: '700px',
    height: '700px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.1))',
  }}
/>
        </div>
      </motion.div>

      <div className="empty-state-title">Hi, I'm Pookoo!</div>
      <p className="empty-state-sub">
        Your intelligent study and research companion. Upload a PDF or ask me anything to get started.
      </p>

      <div className="empty-state-suggestions">
        {SUGGESTIONS.map((s, i) => (
          <motion.button
            key={i}
            className="suggestion-chip"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.06 }}
            onClick={() => onSuggestionClick && onSuggestionClick(s.replace(/^[\S\s]{2}\s/, ''))}
          >
            {s}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

