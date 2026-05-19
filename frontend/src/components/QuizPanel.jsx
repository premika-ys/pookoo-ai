// import React, { useContext, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChatContext } from '../context/ChatContext';

// const panelVariants = {
//   hidden: { opacity: 0, x: 40 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
//   exit: { opacity: 0, x: 40, transition: { duration: 0.2 } },
// };

// // const DEFAULT_QUIZ = [
// //   {
// //     question: 'What are the suestions to question?',
// //     options: ['Answer', 'Answer', 'Calizzes'],
// //     correct: 0,
// //   },
// // ];

// export default function QuizPanel({ onClose }) {
//   const { quiz, generateQuiz } = useContext(ChatContext);
//   const [loading, setLoading] = useState(false);
//   const [currentQ, setCurrentQ] = useState(0);
//   const [selected, setSelected] = useState({});
//   const [score, setScore] = useState(0);
//   const [finished, setFinished] = useState(false);

//   // const questions = quiz && quiz.length > 0 ? quiz : DEFAULT_QUIZ;
//   const questions = Array.isArray(quiz) ? quiz : [];
//   const total = questions.length;
//   // const current = questions[currentQ];
//   const current = questions[currentQ] || {};

//   const handleGenerate = async () => {
//     setLoading(true);
//     setCurrentQ(0);
//     setSelected({});
//     setScore(0);
//     setFinished(false);
//     try {
//       await generateQuiz();
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelect = (optionIdx) => {
//     if (selected[currentQ] !== undefined) return;
//     // const isCorrect = optionIdx === current.correct;
//     const isCorrect =
//     current.options?.[optionIdx] === current.answer;
//     setSelected(prev => ({ ...prev, [currentQ]: optionIdx }));
//     if (isCorrect) setScore(s => s + 1);
//   };

//   const handleNext = () => {
//     if (currentQ < total - 1) {
//       setCurrentQ(q => q + 1);
//     } else {
//       setFinished(true);
//     }
//   };

//   const handleRestart = () => {
//     setCurrentQ(0);
//     setSelected({});
//     setScore(0);
//     setFinished(false);
//   };

//   const progressPct = total > 0 ? Math.round(((currentQ + (selected[currentQ] !== undefined ? 1 : 0)) / total) * 100) : 0;

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
//         background: 'rgba(255, 249, 195, 0.7)',
//         backdropFilter: 'blur(8px)',
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
//           <span style={{ fontSize: '1.1rem' }}>🎯</span>
//           <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
//             QUIZ GENERATOR UI
//           </span>
//         </div>
//         <button
//           onClick={onClose}
//           style={{
//             background: 'none', border: 'none', cursor: 'pointer',
//             color: 'var(--text-muted)', fontSize: '1rem', padding: '4px', borderRadius: '8px',
//           }}
//         >✕</button>
//       </div>

//       <div style={{ flex: 1, overflowY: 'auto', padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
//         {/* Generate button */}
//         <motion.button
//           onClick={handleGenerate}
//           disabled={loading}
//           style={{
//             padding: '10px',
//             background: 'linear-gradient(135deg, #FEF9C3 0%, var(--accent-yellow) 100%)',
//             border: '1.5px solid var(--accent-yellow-dark)',
//             borderRadius: 'var(--radius-full)',
//             fontSize: '0.82rem', fontWeight: 700,
//             color: '#7A6200', cursor: loading ? 'wait' : 'pointer',
//             fontFamily: 'var(--font-main)',
//           }}
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.97 }}
//         >
//           {loading ? '⏳ Generating Quiz...' : '✨ Generate New Quiz'}
//         </motion.button>

//         {/* Finished screen */}
//         <AnimatePresence mode="wait">
//           {questions.length === 0 && !loading ? (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     style={{
//       textAlign: 'center',
//       padding: '40px 20px',
//       color: 'var(--text-muted)',
//       lineHeight: 1.7,
//     }}
//   >
//     🎯 No quiz generated yet.
//     <br />
//     Click "Generate New Quiz"
//   </motion.div>
// ) :
//           {finished ? (
//             <motion.div
//               key="finished"
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0 }}
//               style={{
//                 background: 'linear-gradient(135deg, rgba(168,213,162,0.2) 0%, rgba(245,233,122,0.2) 100%)',
//                 border: '1.5px solid var(--accent-green)',
//                 borderRadius: 'var(--radius-lg)',
//                 padding: '24px 16px',
//                 textAlign: 'center',
//               }}
//             >
//               <div style={{ fontSize: '3rem', marginBottom: 12 }}>🎉</div>
//               <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 800, marginBottom: 6 }}>
//                 Quiz Complete!
//               </div>
//               <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: 20 }}>
//                 You scored <strong>{score}</strong> out of <strong>{total}</strong>
//               </div>
//               <motion.button
//                 onClick={handleRestart}
//                 style={{
//                   padding: '10px 24px',
//                   background: 'linear-gradient(135deg, var(--accent-green-light) 0%, var(--accent-green) 100%)',
//                   border: 'none', borderRadius: 'var(--radius-full)',
//                   fontSize: '0.875rem', fontWeight: 700, color: '#fff',
//                   cursor: 'pointer', fontFamily: 'var(--font-main)',
//                   boxShadow: '0 4px 14px rgba(123,191,116,0.35)',
//                 }}
//                 whileHover={{ scale: 1.04 }}
//                 whileTap={{ scale: 0.96 }}
//               >
//                 🔁 Try Again
//               </motion.button>
//             </motion.div>
//           ) : (
//             <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
//               {/* Question card */}
//               <div style={{
//                 background: '#FFFFFF',
//                 border: '1px solid var(--border-color)',
//                 borderRadius: 'var(--radius-lg)',
//                 padding: '16px',
//                 boxShadow: 'var(--shadow-sm)',
//               }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
//                   <span style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
//                     Q{currentQ + 1} / {total}
//                   </span>
//                   <span style={{
//                     background: 'var(--accent-yellow)',
//                     borderRadius: 99, padding: '3px 10px',
//                     fontSize: '0.72rem', fontWeight: 800, color: '#7A6200',
//                   }}>
//                     Score {score}/{total}
//                   </span>
//                 </div>

//                 <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16, lineHeight: 1.5 }}>
//                   {current.question}
//                 </p>

//                 {/* Options */}
//                 <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
//                   {current.options.map((opt, oi) => {
//                     const answered = selected[currentQ] !== undefined;
//                     const isSelected = selected[currentQ] === oi;
//                     // const isCorrect = oi === current.correct;
//                     const isCorrect =
//   current.options?.[oi] === current.answer;
//                     let bg = '#F9F9E8';
//                     let border = 'var(--border-input)';
//                     let color = 'var(--text-primary)';

//                     if (answered) {
//                       if (isCorrect) { bg = 'rgba(168,213,162,0.3)'; border = 'var(--accent-green-dark)'; color = '#3A8B34'; }
//                       else if (isSelected) { bg = 'rgba(245,184,200,0.3)'; border = 'var(--accent-pink)'; color = '#C0415B'; }
//                     } else if (isSelected) {
//                       bg = 'var(--accent-green-light)';
//                     }

//                     return (
//                       <motion.button
//                         key={oi}
//                         onClick={() => handleSelect(oi)}
//                         whileHover={!answered ? { scale: 1.02 } : {}}
//                         whileTap={!answered ? { scale: 0.98 } : {}}
//                         style={{
//                           padding: '10px 14px',
//                           background: bg,
//                           border: `1.5px solid ${border}`,
//                           borderRadius: 'var(--radius-md)',
//                           textAlign: 'left',
//                           fontSize: '0.85rem',
//                           fontWeight: 600,
//                           color,
//                           cursor: answered ? 'default' : 'pointer',
//                           fontFamily: 'var(--font-main)',
//                           transition: 'all 0.2s',
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: 8,
//                         }}
//                       >
//                         <span style={{
//                           width: 22, height: 22, borderRadius: '50%',
//                           background: border === 'var(--border-input)' ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.5)',
//                           display: 'flex', alignItems: 'center', justifyContent: 'center',
//                           fontSize: '0.7rem', fontWeight: 800, flexShrink: 0,
//                           border: `1px solid ${border}`,
//                         }}>
//                           {String.fromCharCode(65 + oi)}
//                         </span>
//                         {opt}
//                         {answered && isCorrect && <span style={{ marginLeft: 'auto' }}>✅</span>}
//                         {answered && isSelected && !isCorrect && <span style={{ marginLeft: 'auto' }}>❌</span>}
//                       </motion.button>
//                     );
//                   })}
//                 </div>

//                 {/* Next button */}
//                 {selected[currentQ] !== undefined && (
//                   <motion.button
//                     onClick={handleNext}
//                     initial={{ opacity: 0, y: 8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     style={{
//                       marginTop: 14,
//                       width: '100%',
//                       padding: '10px',
//                       background: 'linear-gradient(135deg, var(--accent-green) 0%, var(--accent-green-dark) 100%)',
//                       border: 'none',
//                       borderRadius: 'var(--radius-full)',
//                       fontSize: '0.875rem', fontWeight: 700, color: '#fff',
//                       cursor: 'pointer', fontFamily: 'var(--font-main)',
//                       boxShadow: '0 4px 12px rgba(123,191,116,0.35)',
//                     }}
//                     whileHover={{ scale: 1.02 }}
//                     whileTap={{ scale: 0.97 }}
//                   >
//                     {currentQ < total - 1 ? 'Next Question →' : 'Finish Quiz 🎉'}
//                   </motion.button>
//                 )}
//               </div>

//               {/* Progress */}
//               <div style={{ marginTop: 12 }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
//                   <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Progress</span>
//                   <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>Score {score}.00</span>
//                 </div>
//                 <div style={{
//                   height: 7, background: 'var(--border-color)',
//                   borderRadius: 99, overflow: 'hidden',
//                 }}>
//                   <motion.div
//                     initial={{ width: 0 }}
//                     animate={{ width: `${progressPct}%` }}
//                     transition={{ duration: 0.4 }}
//                     style={{
//                       height: '100%',
//                       background: 'linear-gradient(90deg, var(--accent-green) 0%, var(--accent-green-dark) 100%)',
//                       borderRadius: 99,
//                     }}
//                   />
//                 </div>
//                 <div style={{ display: 'flex', gap: 4, marginTop: 8, justifyContent: 'center' }}>
//                   {questions.map((_, qi) => (
//                     <div key={qi} style={{
//                       width: 8, height: 8, borderRadius: '50%',
//                       background: qi < currentQ || (qi === currentQ && selected[currentQ] !== undefined)
//                         ? 'var(--accent-green-dark)'
//                         : qi === currentQ
//                         ? 'var(--accent-yellow)'
//                         : 'var(--border-color)',
//                       transition: 'background 0.25s',
//                     }} />
//                   ))}
//                 </div>
//               </div>
//             </motion.div>
// //          )}
// //         </AnimatePresence>

// //       </div>
// //     </motion.div>
        
// //   );

// // }
// ) : null}

// </AnimatePresence>

// </div>
// </motion.div>
// );
// }

// import React, { useContext, useEffect, useMemo, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChatContext } from '../context/ChatContext';

// export default function QuizPanel({ onClose }) {
//   const {
//     quiz,
//     generateQuiz,
//   } = useContext(ChatContext);

//   const [loading, setLoading] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [currentQ, setCurrentQ] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [score, setScore] = useState(0);
//   const [finished, setFinished] = useState(false);

//   useEffect(() => {
//     if (quiz && quiz.length > 0) {
//       setQuestions(quiz);
//       setCurrentQ(0);
//       setSelected(null);
//       setScore(0);
//       setFinished(false);
//     }
//   }, [quiz]);

//   const current = useMemo(() => {
//     return questions[currentQ];
//   }, [questions, currentQ]);

//   const handleGenerateQuiz = async () => {
//     try {
//       setLoading(true);

//       await generateQuiz();

//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSelect = (option) => {
//     if (selected) return;

//     setSelected(option);

//     // if (option === current.answer) {
//     //   setScore(prev => prev + 1);
//     // }
// //     if (
// //   option.trim().toLowerCase() ===
// //   current.answer.trim().toLowerCase()
// // ) {
// //   setScore(prev => prev + 1);
// // }
// const correctOption =
//   current.answer === 'Option A'
//     ? current.options[0]
//     : current.answer === 'Option B'
//     ? current.options[1]
//     : current.answer === 'Option C'
//     ? current.options[2]
//     : current.options[3];

// if (
//   option.trim().toLowerCase() ===
//   correctOption.trim().toLowerCase()
// ) {
//   setScore(prev => prev + 1);
// }

//     setTimeout(() => {
//       if (currentQ + 1 < questions.length) {
//         setCurrentQ(prev => prev + 1);
//         setSelected(null);
//       } else {
//         setFinished(true);
//       }
//     }, 900);
//   };

//   const handleRestart = () => {
//     setCurrentQ(0);
//     setSelected(null);
//     setScore(0);
//     setFinished(false);
//   };

//   return (
//     <motion.div
//       initial={{ x: 100, opacity: 0 }}
//       animate={{ x: 0, opacity: 1 }}
//       exit={{ x: 100, opacity: 0 }}
//       transition={{ duration: 0.25 }}
//       style={{
//         width: '420px',
//         height: '100%',
//         background: '#fdfdfd',
//         borderLeft: '1px solid #e7e7e7',
//         display: 'flex',
//         flexDirection: 'column',
//         overflow: 'hidden',
//       }}
//     >

//       {/* Header */}
//       <div
//         style={{
//           padding: '20px',
//           borderBottom: '1px solid #ececec',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           background: '#fff',
//         }}
//       >
//         <h2
//           style={{
//             margin: 0,
//             fontSize: '18px',
//             fontWeight: 700,
//           }}
//         >
//            Quiz Generator
//         </h2>

//         <button
//           onClick={onClose}
//           style={{
//             border: 'none',
//             background: 'transparent',
//             cursor: 'pointer',
//             fontSize: '18px',
//           }}
//         >
//           ✕
//         </button>
//       </div>

//       {/* Body */}
//       <div
//         style={{
//           flex: 1,
//           overflowY: 'auto',
//           padding: '20px',
//         }}
//       >

//         {/* Generate button */}
//         <motion.button
//           onClick={handleGenerateQuiz}
//           disabled={loading}
//           whileHover={{ scale: 1.02 }}
//           whileTap={{ scale: 0.97 }}
//           style={{
//             width: '100%',
//             padding: '14px',
//             border: 'none',
//             borderRadius: '14px',
//             background: 'linear-gradient(135deg, #b6e388 0%, #7acb73 100%)',
//             color: '#fff',
//             fontWeight: 700,
//             cursor: 'pointer',
//             marginBottom: '22px',
//             fontSize: '15px',
//           }}
//         >
//           {loading ? ' Generating Quiz...' : ' Generate New Quiz'}
//         </motion.button>

//         <AnimatePresence mode="wait">

//           {/* Empty state */}
//           {questions.length === 0 && !loading ? (

//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               style={{
//                 textAlign: 'center',
//                 padding: '40px 20px',
//                 color: '#777',
//                 lineHeight: 1.7,
//               }}
//             >
//                No quiz generated yet.
//               <br />
//               Click "Generate New Quiz"
//             </motion.div>

//           ) : finished ? (

//             /* Finished screen */
//             <motion.div
//               key="finished"
//               initial={{ opacity: 0, scale: 0.95 }}
//               animate={{ opacity: 1, scale: 1 }}
//               style={{
//                 textAlign: 'center',
//                 padding: '40px 20px',
//               }}
//             >

//               <h2> Quiz Finished!</h2>

//               <p
//                 style={{
//                   fontSize: '18px',
//                   marginBottom: '20px',
//                 }}
//               >
//                 You scored <strong>{score}</strong> out of <strong>{questions.length}</strong>
//               </p>

//               <motion.button
//                 onClick={handleRestart}
//                 whileHover={{ scale: 1.03 }}
//                 whileTap={{ scale: 0.97 }}
//                 style={{
//                   padding: '12px 22px',
//                   border: 'none',
//                   borderRadius: '12px',
//                   background: '#7acb73',
//                   color: '#fff',
//                   fontWeight: 700,
//                   cursor: 'pointer',
//                 }}
//               >
//                  Try Again
//               </motion.button>

//             </motion.div>

//           ) : current ? (

//             /* Question UI */
//             <motion.div
//               key={currentQ}
//               initial={{ opacity: 0, y: 14 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0 }}
//             >

//               {/* Progress */}
//               <div
//                 style={{
//                   marginBottom: '18px',
//                   fontWeight: 600,
//                   color: '#666',
//                 }}
//               >
//                 Question {currentQ + 1} / {questions.length}
//               </div>

//               {/* Question */}
//               <div
//                 style={{
//                   padding: '18px',
//                   borderRadius: '16px',
//                   background: '#f8f8f8',
//                   marginBottom: '20px',
//                   lineHeight: 1.6,
//                   fontWeight: 600,
//                 }}
//               >
//                 {current.question}
//               </div>

//               {/* Options */}
//               <div
//                 style={{
//                   display: 'flex',
//                   flexDirection: 'column',
//                   gap: '12px',
//                 }}
//               >
//                 {current.options.map((option, i) => {

//                   // const isCorrect = option === current.answer;
//   //                 const isCorrect =
//   // option.trim().toLowerCase() ===
//   // current.answer.trim().toLowerCase();
//   const correctOption =
//   current.answer === 'Option A'
//     ? current.options[0]
//     : current.answer === 'Option B'
//     ? current.options[1]
//     : current.answer === 'Option C'
//     ? current.options[2]
//     : current.options[3];

// const isCorrect =
//   option.trim().toLowerCase() ===
//   correctOption.trim().toLowerCase();
//                   const isSelected = selected === option;

//                   let bg = '#fff';

//                   if (selected) {
//                     if (isCorrect) bg = '#c7f3c3';
//                     else if (isSelected) bg = '#ffd2d2';
//                   }

//                   return (
//                     <motion.button
//                       key={i}
//                       onClick={() => handleSelect(option)}
//                       whileHover={{ scale: 1.01 }}
//                       whileTap={{ scale: 0.98 }}
//                       style={{
//                         textAlign: 'left',
//                         padding: '14px',
//                         borderRadius: '14px',
//                         border: '1px solid #ddd',
//                         background: bg,
//                         cursor: 'pointer',
//                         fontSize: '14px',
//                         transition: '0.2s',
//                       }}
//                     >
//                       {option}
//                     </motion.button>
//                   );
//                 })}
//               </div>

//             </motion.div>

//           ) : null}

//         </AnimatePresence>

//       </div>
//     </motion.div>
//   );
// }

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