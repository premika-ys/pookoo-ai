// import React, { useContext, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChatContext } from '../context/ChatContext';

// const panelVariants = {
//   hidden: { opacity: 0, x: 40 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
//   exit: { opacity: 0, x: 40, transition: { duration: 0.2 } },
// };

// const cardColors = [
//   { bg: 'rgba(168, 213, 162, 0.18)', border: 'var(--accent-green)', icon: '🤖', label: 'AI' },
//   { bg: 'rgba(245, 233, 122, 0.2)', border: 'var(--accent-yellow-dark)', icon: '📋', label: 'Summary' },
//   { bg: 'rgba(245, 184, 200, 0.18)', border: 'var(--accent-pink)', icon: '📝', label: 'Summarize' },
//   { bg: 'rgba(181, 184, 245, 0.2)', border: 'var(--accent-purple)', icon: '✨', label: 'Highlight block' },
// ];

// export default function SummaryPanel({ onClose }) {
//   const { summary, generateSummary, currentSession } = useContext(ChatContext);
//   const [loading, setLoading] = useState(false);
//   const [copied, setCopied] = useState(false);
//   const [expanded, setExpanded] = useState([0, 1, 2, 3]);

//   const handleGenerate = async () => {
//     setLoading(true);
//     try {
//       await generateSummary();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCopy = () => {
//     if (summary) {
//       navigator.clipboard.writeText(
//         typeof summary === 'string'
//           ? summary
//           : summary.map(s => s.content).join('\n\n')
//       );
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     }
//   };

//   const toggleCard = (i) => {
//     setExpanded(prev =>
//       prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
//     );
//   };

//   // const summaryCards = typeof summary === 'string'
//   //   ? [{ content: summary, type: 0 }]
//   //   : Array.isArray(summary)
//   //   ? summary.map((s, i) => ({ ...s, type: i % cardColors.length }))
//   //   : [
//   //       { content: 'AI generated dolor sit amet, consectetur adipiscing elit, sed do ad eiusmod at', type: 0 },
//   //       { content: 'AI generated dolor sit amet, consectetur adipiscing elit, sed do ad eiusmod at', type: 1 },
//   //       { content: 'Amolestie sed a adipiscing amolestie, amusante consectetur tincidunt laoreet. Nullam molestie consequat sliquis.', type: 2 },
//   //       { content: 'AI generatus dolor sit amet, consectetur adipiscing elit, sed is sed, is sed is dolor consequat.', type: 3 },
//   //     ];
//   const summaryCards = summary
//   ? [
//       {
//         content: summary,
//         type: 0,
//       }
//     ]
//   : [];

//   return (
//     <motion.div
//       // className="chat-right-panel"
//       // variants={panelVariants}
//       // initial="hidden"
//       // animate="visible"
//       // exit="exit"
     
//   className="chat-right-panel"
//  style={{
//   position: 'relative',
//   height: 'calc(100vh - 70px)',
//   minHeight: '1000px',
//   overflow: 'hidden',
// }}
//     >
//       {/* Header */}
//       <div style={{
//         padding: '16px 18px',
//         borderBottom: '1px solid var(--border-color)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         background: 'rgba(255,255,207,0.7)',
//         backdropFilter: 'blur(8px)',
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//           <span style={{ fontSize: '1.1rem' }}>⭐</span>
//           <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
//             SUMMARY PANEL
//           </span>
//         </div>
//         <div style={{ display: 'flex', gap: 8 }}>
//           <motion.button
//             onClick={handleCopy}
//             style={{
//               display: 'flex', alignItems: 'center', gap: 5,
//               background: copied ? 'var(--accent-green-light)' : 'var(--bg-input)',
//               border: '1.5px solid var(--border-input)',
//               borderRadius: 'var(--radius-full)',
//               padding: '5px 12px',
//               fontSize: '0.75rem', fontWeight: 700,
//               color: copied ? '#3A8B34' : 'var(--text-secondary)',
//               cursor: 'pointer',
//               fontFamily: 'var(--font-main)',
//             }}
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {copied ? ' Copied!' : ' Copy'}
//           </motion.button>
//           <button
//             onClick={onClose}
//             style={{
//               background: 'none', border: 'none', cursor: 'pointer',
//               color: 'var(--text-muted)', fontSize: '1rem', padding: '4px',
//               borderRadius: '8px',
//             }}
//           >✕</button>
//         </div>
//       </div>

//       {/* Generate button if no summary */}
//       {!summary && (
//         <div style={{ padding: 20 }}>
//           <motion.button
//             onClick={handleGenerate}
//             disabled={loading}
//             style={{
//               width: '100%',
//               padding: '12px',
//               background: 'linear-gradient(135deg, var(--accent-green-light) 0%, #D0EEC9 100%)',
//               border: '1.5px solid var(--accent-green)',
//               borderRadius: 'var(--radius-full)',
//               fontSize: '0.875rem', fontWeight: 700,
//               color: '#3A8B34', cursor: 'pointer',
//               fontFamily: 'var(--font-main)',
//             }}
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.97 }}
//           >
//             {loading ? ' Generating...' : ' Generate Summary'}
//           </motion.button>
//         </div>
//       )}

//       {/* Summary cards */}
//       {/* <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}> */}
//       <div

//   style={{
//     flex: 1,
//     overflowY: 'scroll',
//     overflowX: 'hidden',
//     padding: '12px 14px 2px 14px',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 12,
//     height: '100%',
//     maxHeight: 'calc(100vh - 180px)',
//     minHeight: 0,
//     scrollBehavior: 'smooth',

//     scrollbarWidth: 'thin',
//     scrollbarColor: '#9BCF95 transparent',
//   }}
// >

//         {summaryCards.length === 0 && !loading && (
//   <div style={{
//     textAlign: 'center',
//     padding: '40px 20px',
//     color: 'var(--text-muted)',
//     fontSize: '0.9rem',
//     lineHeight: 1.6,
//   }}>
//     ⭐ No summary generated yet.
//     <br />
//     Click "Generate Summary".
//   </div>
// )}{summaryCards.map((card, i) => {
//           const color = cardColors[card.type ?? i % cardColors.length];
//           return (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.06 }}
//               style={{
//                 background: color.bg,
//                 border: `1px solid ${color.border}`,
//                 borderRadius: 'var(--radius-md)',
//                 overflow: 'hidden',
//               }}
//   //           <motion.div
//   // initial={{ height: 0, opacity: 0 }}
//   // animate={{ height: 'auto', opacity: 1 }}
//   // exit={{ height: 0, opacity: 0 }}
//   // transition={{ duration: 0.22 }}
//   // style={{
//   //   overflow: 'hidden',
//   //   maxHeight: '70vh',
//   // }}
// >
            
//               {/* Card header */}
//               <div
//                 onClick={() => toggleCard(i)}
//                 style={{
//                   padding: '10px 14px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'space-between',
//                   cursor: 'pointer',
//                 }}
//               >
//                 <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
//                   <span style={{ fontSize: '1rem' }}>{color.icon}</span>
//                   <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
//                     {color.label}
//                   </span>
//                 </div>
//                 <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
//                   {expanded.includes(i) ? '▲' : '▼'}
//                 </span>
//               </div>

//               {/* Card body */}
//               <AnimatePresence initial={false}>
//                 {expanded.includes(i) && (
//                   // <motion.div
//                   //   initial={{ height: 0, opacity: 0 }}
//                   //   animate={{ height: 'auto', opacity: 1 }}
//                   //   exit={{ height: 0, opacity: 0 }}
//                   //   transition={{ duration: 0.22 }}
//                   //   style={{ overflow: 'hidden' }}
//                   // >
//                   <motion.div
//   initial={{ height: 0, opacity: 0 }}
//   animate={{ height: 'auto', opacity: 1 }}
//   exit={{ height: 0, opacity: 0 }}
//   transition={{ duration: 0.22 }}
//   style={{
//     overflow: 'hidden',
//     maxHeight: '70vh',
//   }}
// >
//                     {/* <div style={{
//                       padding: '0 14px 12px',
//                       fontSize: '0.82rem',
//                       color: 'var(--text-secondary)',
//                       lineHeight: 1.6,
//                     }}> */}
//                     <div
//   style={{
//     padding: '0 14px 12px',
//     fontSize: '0.82rem',
//     color: 'var(--text-secondary)',
//     lineHeight: 1.6,

//     maxHeight: '60vh',
//     overflowY: 'auto',
//     overflowX: 'hidden',

//     scrollbarWidth: 'thin',
//     scrollbarColor: '#9BCF95 transparent',

//     paddingRight: '8px',
//   }}
// >
//                       {/* {card.content} */}
//                       <div style={{ whiteSpace: 'pre-wrap' }}>
//                          {card.content}
//                          </div>
//                       {card.citations && (
//                         <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
//                           {card.citations.map((c, ci) => (
//                             <span key={ci} style={{
//                               background: 'rgba(255,255,255,0.7)',
//                               border: '1px solid var(--border-input)',
//                               borderRadius: 99, padding: '2px 8px',
//                               fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)',
//                             }}>
//                                {c}
//                             </span>
//                           ))}
//                         </div>
//                       )}
//                     </div>
//                     {/* Scroll To Bottom Button */}

  

//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </motion.div>
//           );
//         })}
//       </div>
//     </motion.div>
//   );
// }

import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatContext } from '../context/ChatContext';
import PdfSelector from './PdfSelector';

const panelVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: 40, transition: { duration: 0.2 } },
};

const cardColors = [
  { bg: 'rgba(168, 213, 162, 0.18)', border: 'var(--accent-green)', icon: '🤖', label: 'AI' },
  { bg: 'rgba(245, 233, 122, 0.2)', border: 'var(--accent-yellow-dark)', icon: '📋', label: 'Summary' },
  { bg: 'rgba(245, 184, 200, 0.18)', border: 'var(--accent-pink)', icon: '📝', label: 'Summarize' },
  { bg: 'rgba(181, 184, 245, 0.2)', border: 'var(--accent-purple)', icon: '✨', label: 'Highlight block' },
];

export default function SummaryPanel({ onClose }) {
  const { summary, generateSummary, uploadedPdfs } = useContext(ChatContext);

  const [loading, setLoading]   = useState(false);
  const [copied, setCopied]     = useState(false);
  const [expanded, setExpanded] = useState([0, 1, 2, 3]);

  // ── PDF selection state ──────────────────────────────────────────────────
  // Pre-select all on mount
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

  const handleSelectAll = () => {
    setSelectedPdfs(new Set((uploadedPdfs || []).map(p => p.filename || p.name)));
  };

  const handleClearAll = () => setSelectedPdfs(new Set());

  // ── Generate ─────────────────────────────────────────────────────────────
  const handleGenerate = async () => {
    setLoading(true);
    try {
      await generateSummary([...selectedPdfs]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (summary) {
      navigator.clipboard.writeText(
        typeof summary === 'string'
          ? summary
          : summary.map(s => s.content).join('\n\n')
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const toggleCard = (i) => {
    setExpanded(prev =>
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  };

  const summaryCards = summary ? [{ content: summary, type: 0 }] : [];

  return (
    <motion.div
      className="chat-right-panel"
      style={{
        position: 'relative',
        height: 'calc(100vh - 70px)',
        minHeight: '1000px',
        overflow: 'hidden',
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div style={{
        padding: '16px 18px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255,255,207,0.7)',
        backdropFilter: 'blur(8px)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '1.1rem' }}>⭐</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
            SUMMARY PANEL
          </span>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <motion.button
            onClick={handleCopy}
            style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: copied ? 'var(--accent-green-light)' : 'var(--bg-input)',
              border: '1.5px solid var(--border-input)',
              borderRadius: 'var(--radius-full)',
              padding: '5px 12px',
              fontSize: '0.75rem', fontWeight: 700,
              color: copied ? '#3A8B34' : 'var(--text-secondary)',
              cursor: 'pointer',
              fontFamily: 'var(--font-main)',
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? '✅ Copied!' : '📋 Copy'}
          </motion.button>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', fontSize: '1rem', padding: '4px',
              borderRadius: '8px',
            }}
          >✕</button>
        </div>
      </div>

      {/* ── Scrollable body ────────────────────────────────────────────── */}
      <div style={{
        flex: 1,
        overflowY: 'scroll',
        overflowX: 'hidden',
        padding: '14px 14px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        height: '100%',
        maxHeight: 'calc(100vh - 130px)',
        minHeight: 0,
        scrollBehavior: 'smooth',
        scrollbarWidth: 'thin',
        scrollbarColor: '#9BCF95 transparent',
      }}>

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
          onClick={handleGenerate}
          disabled={loading || selectedPdfs.size === 0}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.97 }}
          style={{
            width: '100%',
            padding: '12px',
            background: selectedPdfs.size === 0
              ? 'var(--bg-input)'
              : 'linear-gradient(135deg, var(--accent-green-light) 0%, #D0EEC9 100%)',
            border: '1.5px solid',
            borderColor: selectedPdfs.size === 0 ? 'var(--border-input)' : 'var(--accent-green)',
            borderRadius: 'var(--radius-full)',
            fontSize: '0.875rem', fontWeight: 700,
            color: selectedPdfs.size === 0 ? 'var(--text-muted)' : '#3A8B34',
            cursor: loading || selectedPdfs.size === 0 ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-main)',
            transition: 'all 0.2s',
          }}
        >
          {loading
            ? '⏳ Generating...'
            : selectedPdfs.size === 0
            ? 'Select PDFs above to generate'
            : `✨ Generate Summary (${selectedPdfs.size} PDF${selectedPdfs.size > 1 ? 's' : ''})`}
        </motion.button>

        {/* ── Empty placeholder ─────────────────────────────────────────── */}
        {summaryCards.length === 0 && !loading && (
          <div style={{
            textAlign: 'center',
            padding: '32px 20px',
            color: 'var(--text-muted)',
            fontSize: '0.875rem',
            lineHeight: 1.6,
          }}>
            ⭐ No summary generated yet.<br />
            Select PDFs and click Generate.
          </div>
        )}

        {/* ── Summary cards ─────────────────────────────────────────────── */}
        {summaryCards.map((card, i) => {
          const color = cardColors[card.type ?? i % cardColors.length];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{
                background: color.bg,
                border: `1px solid ${color.border}`,
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
              }}
            >
              {/* Card header */}
              <div
                onClick={() => toggleCard(i)}
                style={{
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <span style={{ fontSize: '1rem' }}>{color.icon}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {color.label}
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {expanded.includes(i) ? '▲' : '▼'}
                </span>
              </div>

              {/* Card body */}
              <AnimatePresence initial={false}>
                {expanded.includes(i) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    style={{ overflow: 'hidden', maxHeight: '70vh' }}
                  >
                    <div style={{
                      padding: '0 14px 12px',
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      maxHeight: '60vh',
                      overflowY: 'auto',
                      overflowX: 'hidden',
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#9BCF95 transparent',
                      paddingRight: '8px',
                    }}>
                      <div style={{ whiteSpace: 'pre-wrap' }}>{card.content}</div>

                      {card.citations && (
                        <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                          {card.citations.map((c, ci) => (
                            <span key={ci} style={{
                              background: 'rgba(255,255,255,0.7)',
                              border: '1px solid var(--border-input)',
                              borderRadius: 99, padding: '2px 8px',
                              fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-secondary)',
                            }}>
                              📄 {c}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}