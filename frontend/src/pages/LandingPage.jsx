import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/landing.css';
import owlMascot from '../assets/ollie.png.png';

// Fallback logo if asset not found
const LogoFallback = () => (
  <div style={{
    width: 36, height: 36, borderRadius: 10,
    background: 'linear-gradient(135deg, #A8D5A2 0%, #F5E97A 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 900, fontSize: '1rem', color: '#3A7A34'
  }}>
  <img
    src={owlMascot}
    alt="logo"
    style={{
      width: '28px',
      height: '28px',
      objectFit: 'contain',
    }}
  />
</div>
);

const featureCards = [
  {
    num: '01',
     icon: '💡',
    color: 'fc-green',
    btnColor: 'fcb-green',
    title: 'AI PDF Chat',
    desc: 'Access and chat with any PDF document using intelligent learning and education models.',
    btn: 'Open Chat',
    mascot: true,
  },
  {
    num: '02',
     icon: '⭐',
    color: 'fc-blue',
    btnColor: 'fcb-yellow',
    title: 'OCR Support',
    desc: 'Mesmerizing text that scans your uploaded documents and educational illustrations.',
    btn: 'Learn More',
  },
  {
    num: '03',
     icon: '💡',
    color: 'fc-yellow',
    btnColor: 'fcb-yellow',
    title: 'Smart Memory',
    desc: 'Conversations on unlimited animated notes and intelligent study and exploration.',
    btn: 'Learn More',
  },
  {
    num: '04',
     icon: '⭐',
    color: 'fc-purple',
    btnColor: 'fcb-yellow',
    title: 'Quiz Generation',
    desc: 'Lorem ipsum dolor illustrations and animated letters and smart entreprises.',
    btn: 'Learn More',
  },
  {
    num: '05',
    icon: '💡',
    color: 'fc-orange',
    btnColor: 'fcb-orange',
    title: 'AI Summaries',
    desc: 'Moderncompatible armasection indica animated checklists, accessories and notes.',
    btn: 'Learn More',
    mascot: true,
  },
  {
    num: '06',
    icon: '⭐',
    color: 'fc-pink',
    btnColor: 'fcb-orange',
    title: 'Flash Card',
    desc: 'Animated quizulations with checklists, accesses and quiz generator tools.',
    btn: 'See Features',
  },
];

const floatBubbles = [
  { className: 'bubble-pdf', label: 'PDFs', delay: 0 },
  { className: 'bubble-notes', label: 'Notes', delay: 0.4 },
  { className: 'bubble-chatbot', label: 'Chatbot', delay: 0.8 },
  { className: 'bubble-genie', label: 'Genie AI', delay: 1.2 },
  { className: 'bubble-quiz', label: 'Quizzes', delay: 0.6 },
];

const floatVariant = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-root">
      {/* Background Blobs */}
      <div className="landing-blob landing-blob-1" />
      <div className="landing-blob landing-blob-2" />
      <div className="landing-blob landing-blob-3" />

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo">
          <LogoFallback />
          <span>POOKOO AI</span>
        </div>
        <div className="navbar-actions">
          <button className="btn-ghost" onClick={() => navigate('/login')}>Login</button>
          <button className="btn-primary" onClick={() => navigate('/signup')}>Get Started Free</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="hero-badge"> AI-Powered Learning</div>

          <h1 className="hero-title">
            POOKOO AI:<br />
            Your Intelligent<br />
            Study &amp; Research<br />
            <span>Companion.</span>
          </h1>

          <p className="hero-sub">
            Pookoo is a modern AI SaaS application for intelligent study and research — upload PDFs, chat, summarize, and quiz yourself instantly.
          </p>

          <div className="hero-cta">
            <motion.button
              className="btn-hero-primary"
              onClick={() => navigate('/chat')}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
               Open Chat
            </motion.button>
            <motion.button
              className="btn-hero-secondary"
              onClick={() => {
                document.querySelector('.features-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              See Features
            </motion.button>
          </div>
        </motion.div>

        {/* Hero Visual */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
        >
          {/* Floating Bubbles */}
          {floatBubbles.map((b) => (
            <motion.div
              key={b.className}
              className={`hero-float-bubble ${b.className}`}
              variants={floatVariant}
              animate="animate"
              style={{ animationDelay: `${b.delay}s` }}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: b.delay + 0.3, duration: 0.5 }}
            >
              <span className="bubble-icon">{b.icon}</span>
              {b.label}
            </motion.div>
          ))}

          {/* Mascot */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ zIndex: 3, position: 'relative' }}
          >
            <div style={{
              width: 260,
              height: 260,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 40%, rgba(168,213,162,0.35) 0%, rgba(245,233,122,0.2) 60%, transparent 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 20px 60px rgba(168,213,162,0.3)',
            }}>
              <img
  src={owlMascot}
  alt="POOKOO AI Mascot"
  style={{
    width: '2000px',
    height: '2000px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.15))',
  }}
/>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Features Sections</h2>
          <p>Modern illustrations with DreamWorks and Pixar.</p>
        </motion.div>

        <div className="features-grid">
          {featureCards.map((card, i) => (
            <motion.div
              key={i}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
            >
              <div className="feature-card-num">{card.num}</div>
              <div className={`feature-card-icon-wrap ${card.color}`}>{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <button className={`feature-card-btn ${card.btnColor}`}>{card.btn}</button>
              {card.mascot && (
                <img
  src={owlMascot}
  alt="mascot"
  style={{
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: '60px',
    opacity: 0.8,
  }}
/>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        © 2026 POOKOO AI — Your Intelligent Study & Research Companion
      </footer>
    </div>
  );
}