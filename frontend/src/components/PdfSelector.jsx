/**
 * PdfSelector.jsx
 * ───────────────
 * Reusable multi-PDF checkbox selector used by
 * SummaryPanel, QuizPanel, and FlashCardPanel.
 *
 * Props:
 *   pdfs          – array of { filename, name, size }  (from ChatContext.uploadedPdfs)
 *   selected      – Set of selected filenames (state managed by parent)
 *   onToggle      – (filename) => void
 *   onSelectAll   – () => void
 *   onClearAll    – () => void
 */

import React from 'react';
import { motion } from 'framer-motion';

export default function PdfSelector({ pdfs, selected, onToggle, onSelectAll, onClearAll }) {
  if (!pdfs || pdfs.length === 0) {
    return (
      <div style={{
        padding: '12px 14px',
        background: 'rgba(245,233,122,0.15)',
        border: '1px dashed rgba(200,180,0,0.35)',
        borderRadius: '12px',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        textAlign: 'center',
        lineHeight: 1.6,
      }}>
        📂 No PDFs uploaded yet.<br />
        Upload a PDF in the chat first.
      </div>
    );
  }

  const allSelected = pdfs.length > 0 && selected.size === pdfs.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>

      {/* Section header + select-all/clear-all controls */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 2,
      }}>
        <span style={{
          fontSize: '0.72rem',
          fontWeight: 800,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
        }}>
          📂 Uploaded PDFs
        </span>
        <button
          onClick={allSelected ? onClearAll : onSelectAll}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: 'var(--accent-green-dark)',
            cursor: 'pointer',
            padding: '2px 6px',
            borderRadius: '6px',
            fontFamily: 'var(--font-main)',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(168,213,162,0.15)'}
          onMouseLeave={e => e.target.style.background = 'none'}
        >
          {allSelected ? 'Clear all' : 'Select all'}
        </button>
      </div>

      {/* PDF checkbox cards */}
      {pdfs.map((pdf, i) => {
      const filename = pdf.filename || pdf.name;
      const isChecked = selected.has(filename);

         return (
       <motion.div
      key={filename || pdf.id || pdf.name || i}
            onClick={() => onToggle(filename)}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 12px',
              borderRadius: '12px',
              border: '1.5px solid',
              borderColor: isChecked ? 'var(--accent-green-dark)' : 'rgba(200,200,160,0.4)',
              background: isChecked
                ? 'linear-gradient(135deg, rgba(168,213,162,0.18) 0%, rgba(200,235,196,0.14) 100%)'
                : 'rgba(255,255,248,0.7)',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              userSelect: 'none',
              boxShadow: isChecked
                ? '0 2px 10px rgba(123,191,116,0.15)'
                : '0 1px 4px rgba(0,0,0,0.04)',
            }}
          >
            {/* Custom checkbox */}
            <div style={{
              width: 18,
              height: 18,
              borderRadius: '5px',
              border: '2px solid',
              borderColor: isChecked ? 'var(--accent-green-dark)' : 'rgba(160,160,120,0.5)',
              background: isChecked
                ? 'linear-gradient(135deg, #A8D5A2 0%, #7BBF74 100%)'
                : 'rgba(255,255,255,0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              transition: 'all 0.15s ease',
            }}>
              {isChecked && (
                <motion.svg
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.15, type: 'spring', stiffness: 500 }}
                  width="10" height="10" viewBox="0 0 10 10"
                  fill="none"
                >
                  <polyline
                    points="1.5,5 4,7.5 8.5,2.5"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              )}
            </div>

            {/* PDF icon */}
            <div style={{
              width: 28,
              height: 28,
              borderRadius: '7px',
              background: isChecked ? 'rgba(168,213,162,0.3)' : 'rgba(245,197,144,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              flexShrink: 0,
              transition: 'background 0.18s',
            }}>
              📄
            </div>

            {/* Filename + size */}
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                color: isChecked ? '#2D5A28' : 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                transition: 'color 0.15s',
              }}>
                {filename}
              </div>
              {pdf.size && (
                <div style={{
                  fontSize: '0.68rem',
                  color: 'var(--text-muted)',
                  marginTop: 1,
                }}>
                  {pdf.size}
                </div>
              )}
            </div>
          </motion.div>
        );
      })}

      {/* Selection count badge */}
      {selected.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginTop: 2,
            padding: '5px 10px',
            background: 'rgba(168,213,162,0.2)',
            border: '1px solid rgba(168,213,162,0.5)',
            borderRadius: '8px',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#3A8B34',
            textAlign: 'center',
          }}
        >
          ✓ {selected.size} of {pdfs.length} PDF{pdfs.length > 1 ? 's' : ''} selected
        </motion.div>
      )}
    </div>
  );
}