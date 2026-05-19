// import React, { useContext, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChatContext } from '../context/ChatContext';
// import owlMascot from '../assets/ollie.png.png';

// const panelVariants = {
//   hidden: { opacity: 0, x: 40 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
//   exit: { opacity: 0, x: 40, transition: { duration: 0.2 } },
// };

// const DEFAULT_CARDS = [
//   {
//     question: 'What is OCR in the context of Pookoo AI?',
//     answer: 'OCR (Optical Character Recognition) in Pookoo AI allows the system to extract and read text from scanned documents or image-based PDFs, enabling intelligent Q&A over them.',
//   },
//   {
//     question: 'What types of documents can Pookoo AI analyze?',
//     answer: 'Pookoo AI can analyze PDFs including research papers, textbooks, notes, and scanned documents using its RAG (Retrieval-Augmented Generation) pipeline.',
//   },
//   {
//     question: 'What is RAG and how does Pookoo use it?',
//     answer: 'RAG stands for Retrieval-Augmented Generation. Pookoo uses it to retrieve relevant chunks from uploaded PDFs and feed them into an LLM to generate accurate, context-based answers.',
//   },
// ];

// function FlipCard({ card, index, isActive }) {
//   const [flipped, setFlipped] = useState(false);

//   // Reset flip when card changes
//   React.useEffect(() => {
//     setFlipped(false);
//   }, [index]);

//   return (
//     <div
//       style={{
//         width: '100%',
//         height: '200px',
//         perspective: '1200px',
//         cursor: 'pointer',
//         position: 'relative',
//       }}
//       onClick={() => setFlipped(f => !f)}
//     >
//       <motion.div
//         animate={{ rotateY: flipped ? 180 : 0 }}
//         transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
//         style={{
//           width: '100%',
//           height: '100%',
//           position: 'relative',
//           transformStyle: 'preserve-3d',
//         }}
//       >
//         {/* FRONT */}
//         <div style={{
//           position: 'absolute',
//           inset: 0,
//           backfaceVisibility: 'hidden',
//           WebkitBackfaceVisibility: 'hidden',
//           background: '#FFFFFF',
//           borderRadius: '20px',
//           boxShadow: '0 6px 28px rgba(0,0,0,0.09)',
//           border: '1px solid rgba(200,200,160,0.35)',
//           padding: '24px 22px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//         }}>
//           <div>
//             <p style={{
//               fontSize: '0.72rem',
//               fontWeight: 800,
//               color: '#C8A000',
//               letterSpacing: '0.06em',
//               textTransform: 'uppercase',
//               marginBottom: 10,
//             }}>
//               Question:
//             </p>
//             <p style={{
//               fontSize: '1rem',
//               fontWeight: 700,
//               color: 'var(--text-primary)',
//               lineHeight: 1.5,
//             }}>
//               {card.question}
//             </p>
//           </div>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             marginTop: 12,
//           }}>
//             <span style={{
//               fontSize: '0.78rem',
//               color: 'var(--text-muted)',
//               fontWeight: 600,
//             }}>
//               Tap to Flip
//             </span>
//             {/* <span style={{ fontSize: '1.3rem' }}>🦉</span> */}
//             <img
//   src={owlMascot}
//   alt="owl"
//   style={{
//     width: '28px',
//     height: '28px',
//     objectFit: 'contain',
//   }}
// />
//           </div>
//         </div>

//         {/* BACK */}
//         <div style={{
//           position: 'absolute',
//           inset: 0,
//           backfaceVisibility: 'hidden',
//           WebkitBackfaceVisibility: 'hidden',
//           transform: 'rotateY(180deg)',
//           background: 'linear-gradient(135deg, #E8F8E4 0%, #F5FAF0 100%)',
//           borderRadius: '20px',
//           boxShadow: '0 6px 28px rgba(0,0,0,0.09)',
//           border: '1px solid rgba(168,213,162,0.5)',
//           padding: '24px 22px',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'space-between',
//         }}>
//           <div>
//             <p style={{
//               fontSize: '0.72rem',
//               fontWeight: 800,
//               color: '#3A8B34',
//               letterSpacing: '0.06em',
//               textTransform: 'uppercase',
//               marginBottom: 10,
//             }}>
//               Answer:
//             </p>
//             <p style={{
//               fontSize: '0.875rem',
//               color: 'var(--text-primary)',
//               lineHeight: 1.6,
//             }}>
//               {card.answer}
//             </p>
//           </div>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'space-between',
//             marginTop: 8,
//           }}>
//             <span style={{
//               fontSize: '0.78rem',
//               color: 'var(--accent-green-dark)',
//               fontWeight: 600,
//             }}>
//               Tap to flip back
//             </span>
//             <span style={{ fontSize: '1.3rem' }}></span>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default function FlashCardPanel({ onClose }) {
//   const { flashCards, generateFlashCards } = useContext(ChatContext);
//   const [loading, setLoading] = useState(false);
//   const [currentIdx, setCurrentIdx] = useState(0);

//   const cards = flashCards && flashCards.length > 0 ? flashCards : DEFAULT_CARDS;
//   const total = cards.length;
//   const current = cards[currentIdx];

//   const handleGenerate = async () => {
//     setLoading(true);
//     setCurrentIdx(0);
//     try {
//       await generateFlashCards();
//     } catch (err) {
//       console.error('FlashCards error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const goNext = () => {
//     if (currentIdx < total - 1) setCurrentIdx(i => i + 1);
//   };

//   const goPrev = () => {
//     if (currentIdx > 0) setCurrentIdx(i => i - 1);
//   };

//   return (
//     <motion.div
//       className="chat-right-panel"
//       variants={panelVariants}
//       initial="hidden"
//       animate="visible"
//       exit="exit"
//     >
//       {/* Header */}
//       <div style={{
//         padding: '16px 18px',
//         borderBottom: '1px solid var(--border-color)',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         background: 'rgba(255,249,195,0.75)',
//         backdropFilter: 'blur(8px)',
//         flexShrink: 0,
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//           <span style={{ fontSize: '1.1rem' }}>💡</span>
//           <span style={{
//             fontFamily: 'var(--font-display)',
//             fontWeight: 800,
//             fontSize: '0.95rem',
//             color: 'var(--text-primary)',
//           }}>
//             Flash Cards
//           </span>
//         </div>
//         <button
//           onClick={onClose}
//           style={{
//             background: 'none', border: 'none', cursor: 'pointer',
//             color: 'var(--text-muted)', fontSize: '1rem',
//             padding: '4px 7px', borderRadius: '8px',
//           }}
//         >
//           ✕
//         </button>
//       </div>

//       {/* Body */}
//       <div style={{
//         flex: 1,
//         overflowY: 'auto',
//         padding: '16px 14px',
//         display: 'flex',
//         flexDirection: 'column',
//         gap: 14,
//       }}>
//         {/* Generate button */}
//         <motion.button
//           onClick={handleGenerate}
//           disabled={loading}
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.97 }}
//           style={{
//             width: '100%',
//             padding: '12px',
//             background: 'linear-gradient(135deg, #A8D5A2 0%, #7BBF74 100%)',
//             border: 'none',
//             borderRadius: '99px',
//             fontSize: '0.875rem',
//             fontWeight: 700,
//             color: '#fff',
//             cursor: loading ? 'wait' : 'pointer',
//             fontFamily: 'var(--font-main)',
//             boxShadow: '0 4px 16px rgba(123,191,116,0.35)',
//             letterSpacing: '0.01em',
//           }}
//         >
//           {loading ? ' Generating...' : ' Generate New Flash Cards'}
//         </motion.button>

//         {/* Card counter */}
//         <div style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           padding: '0 2px',
//         }}>
//           <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
//             Card {currentIdx + 1} of {total}
//           </span>
//           <div style={{ display: 'flex', gap: 4 }}>
//             {cards.map((_, i) => (
//               <div
//                 key={i}
//                 onClick={() => setCurrentIdx(i)}
//                 style={{
//                   width: i === currentIdx ? 18 : 7,
//                   height: 7,
//                   borderRadius: 99,
//                   background: i === currentIdx
//                     ? 'var(--accent-green-dark)'
//                     : 'var(--border-color)',
//                   transition: 'all 0.25s',
//                   cursor: 'pointer',
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Stacked card effect + active card */}
//         <div style={{ position: 'relative', marginBottom: 8 }}>
//           {/* Stack shadows behind */}
//           {total > 2 && (
//             <div style={{
//               position: 'absolute',
//               top: 10, left: 10, right: -10,
//               height: '200px',
//               background: '#F0F0D8',
//               borderRadius: '20px',
//               zIndex: 0,
//               boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
//             }} />
//           )}
//           {total > 1 && (
//             <div style={{
//               position: 'absolute',
//               top: 5, left: 5, right: -5,
//               height: '200px',
//               background: '#F8F8E8',
//               borderRadius: '20px',
//               zIndex: 1,
//               boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
//             }} />
//           )}
//           {/* Active card */}
//           <div style={{ position: 'relative', zIndex: 2 }}>
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={currentIdx}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 transition={{ duration: 0.22 }}
//               >
//                 <FlipCard card={current} index={currentIdx} isActive />
//               </motion.div>
//             </AnimatePresence>
//           </div>
//         </div>

//         {/* Navigation */}
//         <div style={{ display: 'flex', gap: 10 }}>
//           <motion.button
//             onClick={goPrev}
//             disabled={currentIdx === 0}
//             whileHover={currentIdx > 0 ? { scale: 1.04 } : {}}
//             whileTap={currentIdx > 0 ? { scale: 0.96 } : {}}
//             style={{
//               flex: 1,
//               padding: '10px',
//               background: currentIdx === 0 ? 'var(--bg-input)' : '#FFFFFF',
//               border: '1.5px solid var(--border-input)',
//               borderRadius: '12px',
//               fontSize: '0.85rem',
//               fontWeight: 700,
//               color: currentIdx === 0 ? 'var(--text-light)' : 'var(--text-secondary)',
//               cursor: currentIdx === 0 ? 'not-allowed' : 'pointer',
//               fontFamily: 'var(--font-main)',
//             }}
//           >
//             ← Prev
//           </motion.button>
//           <motion.button
//             onClick={goNext}
//             disabled={currentIdx === total - 1}
//             whileHover={currentIdx < total - 1 ? { scale: 1.04 } : {}}
//             whileTap={currentIdx < total - 1 ? { scale: 0.96 } : {}}
//             style={{
//               flex: 1,
//               padding: '10px',
//               background: currentIdx === total - 1
//                 ? 'var(--bg-input)'
//                 : 'linear-gradient(135deg, var(--accent-green-light) 0%, #D0EEC9 100%)',
//               border: '1.5px solid',
//               borderColor: currentIdx === total - 1 ? 'var(--border-input)' : 'var(--accent-green)',
//               borderRadius: '12px',
//               fontSize: '0.85rem',
//               fontWeight: 700,
//               color: currentIdx === total - 1 ? 'var(--text-light)' : '#3A8B34',
//               cursor: currentIdx === total - 1 ? 'not-allowed' : 'pointer',
//               fontFamily: 'var(--font-main)',
//             }}
//           >
//             Next →
//           </motion.button>
//         </div>

//         {/* Progress bar */}
//         <div>
//           <div style={{
//             height: 6,
//             background: 'var(--border-color)',
//             borderRadius: 99,
//             overflow: 'hidden',
//           }}>
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: `${((currentIdx + 1) / total) * 100}%` }}
//               transition={{ duration: 0.35 }}
//               style={{
//                 height: '100%',
//                 background: 'linear-gradient(90deg, var(--accent-green) 0%, var(--accent-green-dark) 100%)',
//                 borderRadius: 99,
//               }}
//             />
//           </div>
//           <div style={{
//             textAlign: 'right',
//             marginTop: 4,
//             fontSize: '0.72rem',
//             color: 'var(--text-muted)',
//             fontWeight: 600,
//           }}>
//             {Math.round(((currentIdx + 1) / total) * 100)}% complete
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// }


import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatContext } from '../context/ChatContext';
import PdfSelector from './PdfSelector';
import owlMascot from '../assets/ollie.png.png';

// Graceful asset import
// let owlMascot = null;
// try { owlMascot = new URL('../assets/ollie.png', import.meta.url).href; } catch (_) {}

const panelVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, x: 40, transition: { duration: 0.2 } },
};

const DEFAULT_CARDS = [
  {
    question: 'What is OCR in the context of Pookoo AI?',
    answer: 'OCR (Optical Character Recognition) in Pookoo AI allows the system to extract and read text from scanned documents or image-based PDFs, enabling intelligent Q&A over them.',
  },
  {
    question: 'What types of documents can Pookoo AI analyze?',
    answer: 'Pookoo AI can analyze PDFs including research papers, textbooks, notes, and scanned documents using its RAG (Retrieval-Augmented Generation) pipeline.',
  },
  {
    question: 'What is RAG and how does Pookoo use it?',
    answer: 'RAG stands for Retrieval-Augmented Generation. Pookoo uses it to retrieve relevant chunks from uploaded PDFs and feed them into an LLM to generate accurate, context-based answers.',
  },
];

// ── Flip card sub-component (unchanged logic) ───────────────────────────────
function FlipCard({ card, index }) {
  const [flipped, setFlipped] = useState(false);

  React.useEffect(() => { setFlipped(false); }, [index]);

  return (
    <div
      style={{ width: '100%', height: '200px', perspective: '1200px', cursor: 'pointer' }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {/* FRONT */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          background: '#FFFFFF', borderRadius: '20px',
          boxShadow: '0 6px 28px rgba(0,0,0,0.09)',
          border: '1px solid rgba(200,200,160,0.35)',
          padding: '24px 22px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 800, color: '#C8A000', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
              Question:
            </p>
            <p style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.5 }}>
              {card.question}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>Tap to Flip</span>
            {owlMascot
              ? <img src={owlMascot} alt="owl" style={{ width: 28, height: 28, objectFit: 'contain' }} />
             : // : <span style={{ fontSize: '1.3rem' }}>🦉</span>
              <img
   src={owlMascot}
  alt="owl"
  style={{
   width: '28px',
    height: '28px',
    objectFit: 'contain',
  }}
/>
            }
          </div>
        </div>

        {/* BACK */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: 'linear-gradient(135deg, #E8F8E4 0%, #F5FAF0 100%)',
          borderRadius: '20px', boxShadow: '0 6px 28px rgba(0,0,0,0.09)',
          border: '1px solid rgba(168,213,162,0.5)', padding: '24px 22px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 800, color: '#3A8B34', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 10 }}>
              Answer:
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.6 }}>
              {card.answer}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-green-dark)', fontWeight: 600 }}>Tap to flip back</span>
            <span style={{ fontSize: '1.3rem' }}></span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main panel ─────────────────────────────────────────────────────────────
export default function FlashCardPanel({ onClose }) {
  const { flashCards, generateFlashCards, uploadedPdfs } = useContext(ChatContext);

  const [loading, setLoading]       = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  // ── PDF selection state ────────────────────────────────────────────────
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

  const cards = flashCards && flashCards.length > 0 ? flashCards : DEFAULT_CARDS;
  const total = cards.length;
  const current = cards[currentIdx];

  const handleGenerate = async () => {
    setLoading(true);
    setCurrentIdx(0);
    try {
      await generateFlashCards([...selectedPdfs]);
    } catch (err) {
      console.error('FlashCards error:', err);
    } finally {
      setLoading(false);
    }
  };

  const goNext = () => { if (currentIdx < total - 1) setCurrentIdx(i => i + 1); };
  const goPrev = () => { if (currentIdx > 0)         setCurrentIdx(i => i - 1); };

  return (
    <motion.div
      className="chat-right-panel"
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div style={{
        padding: '16px 18px',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(255,249,195,0.75)', backdropFilter: 'blur(8px)', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '1.1rem' }}>💡</span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
            Flash Cards
          </span>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '1rem', padding: '4px 7px', borderRadius: '8px' }}
        >
          ✕
        </button>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>

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
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{
            width: '100%', padding: '12px',
            background: selectedPdfs.size === 0
              ? 'var(--bg-input)'
              : 'linear-gradient(135deg, #A8D5A2 0%, #7BBF74 100%)',
            border: 'none', borderRadius: '99px',
            fontSize: '0.875rem', fontWeight: 700,
            color: selectedPdfs.size === 0 ? 'var(--text-muted)' : '#fff',
            cursor: loading || selectedPdfs.size === 0 ? 'not-allowed' : 'pointer',
            fontFamily: 'var(--font-main)',
            boxShadow: selectedPdfs.size > 0 ? '0 4px 16px rgba(123,191,116,0.35)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          {loading
            ? '⏳ Generating...'
            : selectedPdfs.size === 0
            ? 'Select PDFs above'
            : `✨ Generate Flash Cards (${selectedPdfs.size} PDF${selectedPdfs.size > 1 ? 's' : ''})`}
        </motion.button>

        {/* ── Card counter + dots ───────────────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 2px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            Card {currentIdx + 1} of {total}
          </span>
          <div style={{ display: 'flex', gap: 4 }}>
            {cards.map((_, i) => (
              <div key={i} onClick={() => setCurrentIdx(i)} style={{
                width: i === currentIdx ? 18 : 7, height: 7, borderRadius: 99,
                background: i === currentIdx ? 'var(--accent-green-dark)' : 'var(--border-color)',
                transition: 'all 0.25s', cursor: 'pointer',
              }} />
            ))}
          </div>
        </div>

        {/* ── Stacked card effect ───────────────────────────────────────── */}
        <div style={{ position: 'relative', marginBottom: 8 }}>
          {total > 2 && (
            <div style={{ position: 'absolute', top: 10, left: 10, right: -10, height: '200px', background: '#F0F0D8', borderRadius: '20px', zIndex: 0, boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }} />
          )}
          {total > 1 && (
            <div style={{ position: 'absolute', top: 5, left: 5, right: -5, height: '200px', background: '#F8F8E8', borderRadius: '20px', zIndex: 1, boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }} />
          )}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
              >
                <FlipCard card={current} index={currentIdx} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Prev / Next ───────────────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: 10 }}>
          <motion.button
            onClick={goPrev} disabled={currentIdx === 0}
            whileHover={currentIdx > 0 ? { scale: 1.04 } : {}}
            whileTap={currentIdx > 0 ? { scale: 0.96 } : {}}
            style={{
              flex: 1, padding: '10px',
              background: currentIdx === 0 ? 'var(--bg-input)' : '#FFFFFF',
              border: '1.5px solid var(--border-input)', borderRadius: '12px',
              fontSize: '0.85rem', fontWeight: 700,
              color: currentIdx === 0 ? 'var(--text-light)' : 'var(--text-secondary)',
              cursor: currentIdx === 0 ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-main)',
            }}
          >← Prev</motion.button>
          <motion.button
            onClick={goNext} disabled={currentIdx === total - 1}
            whileHover={currentIdx < total - 1 ? { scale: 1.04 } : {}}
            whileTap={currentIdx < total - 1 ? { scale: 0.96 } : {}}
            style={{
              flex: 1, padding: '10px',
              background: currentIdx === total - 1 ? 'var(--bg-input)' : 'linear-gradient(135deg, var(--accent-green-light) 0%, #D0EEC9 100%)',
              border: '1.5px solid',
              borderColor: currentIdx === total - 1 ? 'var(--border-input)' : 'var(--accent-green)',
              borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700,
              color: currentIdx === total - 1 ? 'var(--text-light)' : '#3A8B34',
              cursor: currentIdx === total - 1 ? 'not-allowed' : 'pointer',
              fontFamily: 'var(--font-main)',
            }}
          >Next →</motion.button>
        </div>

        {/* ── Progress bar ──────────────────────────────────────────────── */}
        <div>
          <div style={{ height: 6, background: 'var(--border-color)', borderRadius: 99, overflow: 'hidden' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentIdx + 1) / total) * 100}%` }}
              transition={{ duration: 0.35 }}
              style={{ height: '100%', background: 'linear-gradient(90deg, var(--accent-green) 0%, var(--accent-green-dark) 100%)', borderRadius: 99 }}
            />
          </div>
          <div style={{ textAlign: 'right', marginTop: 4, fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            {Math.round(((currentIdx + 1) / total) * 100)}% complete
          </div>
        </div>
      </div>
    </motion.div>
  );
}