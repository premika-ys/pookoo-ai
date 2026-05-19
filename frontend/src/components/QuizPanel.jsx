import React, { useContext, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatContext } from '../context/ChatContext';
import PdfSelector from './PdfSelector';

export default function QuizPanel({ onClose }) {
  const { quiz, generateQuiz, uploadedPdfs } = useContext(ChatContext);

  const [loading, setLoading]     = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ]   = useState(0);
  const [selected, setSelected]   = useState(null);
  const [score, setScore]         = useState(0);
  const [finished, setFinished]   = useState(false);

  // ── PDF selection state ──────────────────────────────────────────────────
  const [selectedPdfs, setSelectedPdfs] = useState(
    () => new Set((uploadedPdfs || []).map(p => p.filename || p.name))
  );

  const handleTogglePdf = (filename) => {
    setSelectedPdfs(prev => {
      const next = new Set(prev);
      next.has(filename) ? next.delete(filename) : next.add(filename);
      return next;
    });
  };
  const handleSelectAll = () =>
    setSelectedPdfs(new Set((uploadedPdfs || []).map(p => p.filename || p.name)));
  const handleClearAll = () => setSelectedPdfs(new Set());

  // ── Sync quiz from context ───────────────────────────────────────────────
  useEffect(() => {
    if (quiz && quiz.length > 0) {
      setQuestions(quiz);
      setCurrentQ(0);
      setSelected(null);
      setScore(0);
      setFinished(false);
    }
  }, [quiz]);

  const current = useMemo(() => questions[currentQ], [questions, currentQ]);

  // ── Generate quiz ────────────────────────────────────────────────────────
  const handleGenerateQuiz = async () => {
    try {
      setLoading(true);
      await generateQuiz([...selectedPdfs]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ── Answer selection ─────────────────────────────────────────────────────
  const handleSelect = (option) => {
    if (selected) return;
    setSelected(option);

    const correctOption =
      current.answer === 'Option A' ? current.options[0] :
      current.answer === 'Option B' ? current.options[1] :
      current.answer === 'Option C' ? current.options[2] :
      current.options[3];

    if (option.trim().toLowerCase() === correctOption.trim().toLowerCase()) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQ + 1 < questions.length) {
        setCurrentQ(prev => prev + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 900);
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 100, opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        width: '420px',
        height: '100%',
        background: '#fdfdfd',
        borderLeft: '1px solid #e7e7e7',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div style={{
        padding: '20px',
        borderBottom: '1px solid #ececec',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#fff',
        flexShrink: 0,
      }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
          📍 Quiz Generator
        </h2>
        <button
          onClick={onClose}
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '18px' }}
        >
          ✕
        </button>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* ── PDF Selector ─────────────────────────────────────────────── */}
        <PdfSelector
          pdfs={uploadedPdfs}
          selected={selectedPdfs}
          onToggle={handleTogglePdf}
          onSelectAll={handleSelectAll}
          onClearAll={handleClearAll}
        />

        {/* ── Generate button ───────────────────────────────────────────── */}
        <motion.button
          onClick={handleGenerateQuiz}
          disabled={loading || selectedPdfs.size === 0}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{
            width: '100%',
            padding: '14px',
            border: 'none',
            borderRadius: '14px',
            background: selectedPdfs.size === 0
              ? '#e8e8e8'
              : 'linear-gradient(135deg, #b6e388 0%, #7acb73 100%)',
            color: selectedPdfs.size === 0 ? '#aaa' : '#fff',
            fontWeight: 700,
            cursor: loading || selectedPdfs.size === 0 ? 'not-allowed' : 'pointer',
            fontSize: '15px',
            fontFamily: 'var(--font-main)',
            transition: 'all 0.2s',
          }}
        >
          {loading
            ? '⏳ Generating Quiz...'
            : selectedPdfs.size === 0
            ? 'Select PDFs above'
            : `✨ Generate Quiz (${selectedPdfs.size} PDF${selectedPdfs.size > 1 ? 's' : ''})`}
        </motion.button>

        <AnimatePresence mode="wait">

          {/* Empty state */}
          {questions.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '32px 20px', color: '#777', lineHeight: 1.7 }}
            >
              🎯 No quiz generated yet.<br />
              Select PDFs and click Generate.
            </motion.div>
          )}

          {/* Finished screen */}
          {finished && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: 'center', padding: '40px 20px' }}
            >
              <h2> Quiz Finished!</h2>
              <p style={{ fontSize: '18px', marginBottom: '20px' }}>
                You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>
              </p>
              <motion.button
                onClick={handleRestart}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '12px 22px', border: 'none', borderRadius: '12px',
                  background: '#7acb73', color: '#fff', fontWeight: 700, cursor: 'pointer',
                }}
              >
                 Try Again
              </motion.button>
            </motion.div>
          )}

          {/* Question UI */}
          {!finished && current && (
            <motion.div
              key={currentQ}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div style={{ marginBottom: '18px', fontWeight: 600, color: '#666' }}>
                Question {currentQ + 1} / {questions.length}
              </div>

              <div style={{
                padding: '18px', borderRadius: '16px',
                background: '#f8f8f8', marginBottom: '20px',
                lineHeight: 1.6, fontWeight: 600,
              }}>
                {current.question}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {current.options.map((option, i) => {
                  const correctOption =
                    current.answer === 'Option A' ? current.options[0] :
                    current.answer === 'Option B' ? current.options[1] :
                    current.answer === 'Option C' ? current.options[2] :
                    current.options[3];

                  const isCorrect  = option.trim().toLowerCase() === correctOption.trim().toLowerCase();
                  const isSelected = selected === option;
                  let bg = '#fff';
                  if (selected) {
                    if (isCorrect)       bg = '#c7f3c3';
                    else if (isSelected) bg = '#ffd2d2';
                  }

                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleSelect(option)}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        textAlign: 'left', padding: '14px', borderRadius: '14px',
                        border: '1px solid #ddd', background: bg,
                        cursor: 'pointer', fontSize: '14px', transition: '0.2s',
                      }}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}