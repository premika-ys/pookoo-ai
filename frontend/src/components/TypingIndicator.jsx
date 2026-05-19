import React from 'react';
import { motion } from 'framer-motion';
import '../styles/message.css';
import owlMascot from '../assets/ollie.png.png';

export default function TypingIndicator() {
  return (
    <motion.div
      className="typing-indicator-row"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
    >
      <div className="message-avatar ai-avatar">
        {/* <span style={{ fontSize: '1.2rem' }}>🦉</span> */}
        <img
  src={owlMascot}
  alt="owl"
  style={{
    width: '50px',
    height: '50px',
    objectFit: 'contain',
  }}
/>
      </div>
      <div className="typing-bubble">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
        <span style={{ marginLeft: 8, fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          Typing
        </span>
      </div>
    </motion.div>
  );
}