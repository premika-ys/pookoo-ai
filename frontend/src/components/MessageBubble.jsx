// import React from 'react';
// import { motion } from 'framer-motion';
// import '../styles/message.css';
// import owlMascot from '../assets/ollie.png.png';

// export default function MessageBubble({ message }) {
//   const { role, content, citations, timestamp } = message;
//   const isAI = role === 'assistant';

//   const formatTime = (ts) => {
//     if (!ts) return '';
//     const d = new Date(ts);
//     return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <motion.div
//       className={`message-row ${isAI ? 'ai' : 'user'}`}
//       initial={{ opacity: 0, y: 14 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3, ease: 'easeOut' }}
//     >
//       {/* Avatar */}
//       <div className={`message-avatar ${isAI ? 'ai-avatar' : 'user-avatar'}`}>
//         {isAI ? (
//           // <span style={{ fontSize: '1.2rem' }}>🦉</span>
//           <img
//   src={owlMascot}
//   alt="owl"
//   style={{
//     width: '34px',
//     height: '34px',
//     objectFit: 'contain',
//   }}
// />
//         ) : (
//           <span>U</span>
//         )}
//       </div>

//       {/* Bubble */}
//       <div className="message-bubble-wrap">
//         <div className="message-sender">{isAI ? 'AI response' : 'User'}</div>
//         <div className={`message-bubble ${isAI ? 'ai' : 'user'}`}>
//           <span style={{ whiteSpace: 'pre-wrap' }}>{content}</span>

//           {/* Citations */}
//           {isAI && citations && citations.length > 0 && (
//             <div className="message-citations">
//               {citations.map((cite, i) => (
//                 <span key={i} className="citation-chip">
//                   <span className="citation-chip-icon">📄</span>
//                   {cite}
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>
//         {timestamp && (
//           <div className="message-time">{formatTime(timestamp)}</div>
//         )}
//       </div>
//     </motion.div>
//   );
// }






// import React, { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import '../styles/message.css';
// import owlMascot from '../assets/ollie.png.png';

// export default function MessageBubble({ message, onReply }) {
//   const { role, content, citations, timestamp } = message;
//   const isAI = role === 'assistant';

//   const [liked, setLiked]         = useState(false);
//   const [showToast, setShowToast] = useState(false);
//   const toastTimer                = useRef(null);

//   const formatTime = (ts) => {
//     if (!ts) return '';
//     return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   const handleLike = () => setLiked(prev => !prev);

//   const handleCopy = () => {
//     navigator.clipboard.writeText(content).catch(() => {
//       const el = document.createElement('textarea');
//       el.value = content;
//       document.body.appendChild(el);
//       el.select();
//       document.execCommand('copy');
//       document.body.removeChild(el);
//     });
//     setShowToast(true);
//     clearTimeout(toastTimer.current);
//     toastTimer.current = setTimeout(() => setShowToast(false), 2200);
//   };

//   const handleReply = () => {
//     if (onReply) onReply(content);
//   };

//   return (
//     <motion.div
//       className={`message-row ${isAI ? 'ai' : 'user'}`}
//       initial={{ opacity: 0, y: 14 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3, ease: 'easeOut' }}
//     >
//       {/* Avatar */}
//       <div className={`message-avatar ${isAI ? 'ai-avatar' : 'user-avatar'}`}>
//         {isAI ? (
//           <img src={owlMascot} alt="owl" style={{ width: 34, height: 34, objectFit: 'contain' }} />
//         ) : (
//           <span>U</span>
//         )}
//       </div>

//       {/* Bubble */}
//       <div className="message-bubble-wrap">
//         <div className="message-sender">{isAI ? 'AI response' : 'User'}</div>

//         <div className={`message-bubble ${isAI ? 'ai' : 'user'}`}>
//           <span style={{ whiteSpace: 'pre-wrap' }}>{content}</span>

//           {isAI && citations && citations.length > 0 && (
//             <div className="message-citations">
//               {citations.map((cite, i) => (
//                 <span key={i} className="citation-chip">
//                   <span className="citation-chip-icon">📄</span>
//                   {cite}
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>

//         {timestamp && (
//           <div className="message-time">{formatTime(timestamp)}</div>
//         )}

//         {/* ── AI Message Actions ── */}
//         {isAI && (
//           <div className="msg-actions">

//             {/* Heart */}
//             <motion.button
//               className={`msg-action-btn ${liked ? 'liked' : ''}`}
//               onClick={handleLike}
//               whileHover={{ scale: 1.18 }}
//               whileTap={{ scale: 0.85 }}
//               title={liked ? 'Unlike' : 'Like'}
//             >
//               <motion.span
//                 key={liked ? 'filled' : 'empty'}
//                 initial={{ scale: 0.6, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ type: 'spring', stiffness: 400, damping: 18 }}
//               >
//                 {liked ? '❤️' : '🤍'}
//               </motion.span>
//             </motion.button>

//             {/* Copy */}
//             <div style={{ position: 'relative' }}>
//               <motion.button
//                 className="msg-action-btn"
//                 onClick={handleCopy}
//                 whileHover={{ scale: 1.18 }}
//                 whileTap={{ scale: 0.85 }}
//                 title="Copy response"
//               >
//                 {showToast ? '✅' : '📋'}
//               </motion.button>

//               <AnimatePresence>
//                 {showToast && (
//                   <motion.div
//                     className="copy-toast"
//                     initial={{ opacity: 0, y: 6, scale: 0.88 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: 6, scale: 0.88 }}
//                     transition={{ duration: 0.18 }}
//                   >
//                     <img src={owlMascot} alt="" style={{ width: 40, height: 20, objectFit: 'contain' }} />
//                     Text copied!
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Reply */}
//             <motion.button
//               className="msg-action-btn"
//               onClick={handleReply}
//               whileHover={{ scale: 1.18 }}
//               whileTap={{ scale: 0.85 }}
//               title="Reply to this"
//             >
//               ↩
//             </motion.button>

//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }





// import React, { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import '../styles/message.css';
// import owlMascot from '../assets/ollie.png.png';
// import heartFilled from '../assets/heart.png.png';
// import heartOutline from '../assets/outline.png';
// import copyIcon from '../assets/copy.png';
// import replyIcon from '../assets/outline.png';
// import deleteIcon from '../assets/delete.png';

// export default function MessageBubble({ message, onReply }) {
//   const { role, content, citations, timestamp } = message;
//   const isAI = role === 'assistant';

//   const [liked, setLiked]           = useState(false);
//   const [showCopyToast, setShowCopyToast] = useState(false);
//   const [showLikeToast, setShowLikeToast] = useState(false);
//   const copyTimer = useRef(null);
//   const likeTimer = useRef(null);

//   const formatTime = (ts) => {
//     if (!ts) return '';
//     return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   const handleLike = () => {
//     const next = !liked;
//     setLiked(next);
//     if (next) {
//       setShowLikeToast(true);
//       clearTimeout(likeTimer.current);
//       likeTimer.current = setTimeout(() => setShowLikeToast(false), 2200);
//     } else {
//       setShowLikeToast(false);
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(content).catch(() => {
//       const el = document.createElement('textarea');
//       el.value = content;
//       document.body.appendChild(el);
//       el.select();
//       document.execCommand('copy');
//       document.body.removeChild(el);
//     });
//     setShowCopyToast(true);
//     clearTimeout(copyTimer.current);
//     copyTimer.current = setTimeout(() => setShowCopyToast(false), 2200);
//   };

//   const handleReply = () => {
//     if (onReply) onReply(content);
//   };

//   return (
//     <motion.div
//       className={`message-row ${isAI ? 'ai' : 'user'}`}
//       initial={{ opacity: 0, y: 14 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3, ease: 'easeOut' }}
//     >
//       {/* Avatar */}
//       <div className={`message-avatar ${isAI ? 'ai-avatar' : 'user-avatar'}`}>
//         {isAI ? (
//           <img src={owlMascot} alt="owl" style={{ width: 34, height: 34, objectFit: 'contain' }} />
//         ) : (
//           <span>U</span>
//         )}
//       </div>

//       {/* Bubble */}
//       <div className="message-bubble-wrap">
//         <div className="message-sender">{isAI ? 'AI response' : 'User'}</div>

//         <div className={`message-bubble ${isAI ? 'ai' : 'user'}`}>
//           <span style={{ whiteSpace: 'pre-wrap' }}>{content}</span>

//           {isAI && citations && citations.length > 0 && (
//             <div className="message-citations">
//               {citations.map((cite, i) => (
//                 <span key={i} className="citation-chip">
//                   <span className="citation-chip-icon">📄</span>
//                   {cite}
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>

//         {timestamp && (
//           <div className="message-time">{formatTime(timestamp)}</div>
//         )}

//         {/* AI Message Actions */}
//         {isAI && (
//           <div className="msg-actions">

//             {/* Like */}
//             <div style={{ position: 'relative' }}>
//               <motion.button
//                 className={`msg-action-btn ${liked ? 'liked' : ''}`}
//                 onClick={handleLike}
//                 whileHover={{ scale: 1.18 }}
//                 whileTap={{ scale: 0.85 }}
//                 title={liked ? 'Unlike' : 'Like'}
//               >
//                 <motion.img
//                   key={liked ? 'filled' : 'outline'}
//                   src={liked ? heartFilled : heartOutline}
//                   alt="like"
//                   className="action-icon"
//                   initial={{ scale: 0.6, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ type: 'spring', stiffness: 400, damping: 18 }}
//                 />
//               </motion.button>

//               <AnimatePresence>
//                 {showLikeToast && (
//                   <motion.div
//                     className="action-toast"
//                     initial={{ opacity: 0, y: 6, scale: 0.88 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: 6, scale: 0.88 }}
//                     transition={{ duration: 0.18 }}
//                   >
//                     <img src={heartFilled} alt="" className="toast-icon" />
//                     <span>Thanks!!</span>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Copy */}
//             <div style={{ position: 'relative' }}>
//               <motion.button
//                 className="msg-action-btn"
//                 onClick={handleCopy}
//                 whileHover={{ scale: 1.18 }}
//                 whileTap={{ scale: 0.85 }}
//                 title="Copy response"
//               >
//                 <img
//                   src={copyIcon}
//                   alt="copy"
//                   className="action-icon"
//                   style={{ opacity: showCopyToast ? 0.5 : 1, transition: 'opacity 0.2s' }}
//                 />
//               </motion.button>

//               <AnimatePresence>
//                 {showCopyToast && (
//                   <motion.div
//                     className="action-toast"
//                     initial={{ opacity: 0, y: 6, scale: 0.88 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: 6, scale: 0.88 }}
//                     transition={{ duration: 0.18 }}
//                   >
//                     <img src={owlMascot} alt="" className="toast-icon" />
//                     <span>Text copied!</span>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* Reply */}
//             <motion.button
//               className="msg-action-btn"
//               onClick={handleReply}
//               whileHover={{ scale: 1.18 }}
//               whileTap={{ scale: 0.85 }}
//               title="Reply to this"
//             >
//               <img src={replyIcon} alt="reply" className="action-icon" />
//             </motion.button>

//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }


// import React, { useState, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import '../styles/message.css';
// import owlMascot    from '../assets/ollie.png.png';
// import heartFilled  from '../assets/heart.png.png';
// import heartOutline from '../assets/outline.png';
// import copyIcon     from '../assets/copy.png';

// export default function MessageBubble({ message, onReply }) {
//   const { role, content, citations, timestamp } = message;
//   const isAI = role === 'assistant';

//   const [liked, setLiked]             = useState(false);
//   const [showCopyToast, setShowCopyToast] = useState(false);
//   const [showLikeToast, setShowLikeToast] = useState(false);
//   const copyTimer = useRef(null);
//   const likeTimer = useRef(null);

//   const formatTime = (ts) => {
//     if (!ts) return '';
//     return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };

//   const handleLike = () => {
//     const next = !liked;
//     setLiked(next);
//     if (next) {
//       setShowLikeToast(true);
//       clearTimeout(likeTimer.current);
//       likeTimer.current = setTimeout(() => setShowLikeToast(false), 2200);
//     } else {
//       setShowLikeToast(false);
//     }
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(content).catch(() => {
//       const el = document.createElement('textarea');
//       el.value = content;
//       document.body.appendChild(el);
//       el.select();
//       document.execCommand('copy');
//       document.body.removeChild(el);
//     });
//     setShowCopyToast(true);
//     clearTimeout(copyTimer.current);
//     copyTimer.current = setTimeout(() => setShowCopyToast(false), 2200);
//   };

//   const handleReply = () => {
//     if (onReply) onReply(content);
//   };

//   return (
//     <motion.div
//       className={`message-row ${isAI ? 'ai' : 'user'}`}
//       initial={{ opacity: 0, y: 14 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3, ease: 'easeOut' }}
//     >
//       {/* Avatar */}
//       <div className={`message-avatar ${isAI ? 'ai-avatar' : 'user-avatar'}`}>
//         {isAI ? (
//           <img src={owlMascot} alt="owl" style={{ width: 34, height: 34, objectFit: 'contain' }} />
//         ) : (
//           <span>U</span>
//         )}
//       </div>

//       {/* Bubble */}
//       <div className="message-bubble-wrap">
//         <div className="message-sender">{isAI ? 'AI response' : 'User'}</div>

//         <div className={`message-bubble ${isAI ? 'ai' : 'user'}`}>
//           <span style={{ whiteSpace: 'pre-wrap' }}>{content}</span>

//           {isAI && citations && citations.length > 0 && (
//             <div className="message-citations">
//               {citations.map((cite, i) => (
//                 <span key={i} className="citation-chip">
//                   <span className="citation-chip-icon">📄</span>
//                   {cite}
//                 </span>
//               ))}
//             </div>
//           )}
//         </div>

//         {timestamp && (
//           <div className="message-time">{formatTime(timestamp)}</div>
//         )}

//         {/* AI Message Actions */}
//         {isAI && (
//           <div className="msg-actions">

//             {/* ── Like ── */}
//             <div style={{ position: 'relative' }}>
//               <motion.button
//                 className={`msg-action-btn ${liked ? 'liked' : ''}`}
//                 onClick={handleLike}
//                 whileHover={{ scale: 1.18 }}
//                 whileTap={{ scale: 0.85 }}
//                 title={liked ? 'Unlike' : 'Like'}
//               >
//                 <motion.img
//                   key={liked ? 'filled' : 'outline'}
//                   src={liked ? heartFilled : heartOutline}
//                   alt="like"
//                   className="action-icon"
//                   initial={{ scale: 0.6, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ type: 'spring', stiffness: 400, damping: 18 }}
//                 />
//               </motion.button>

//               <AnimatePresence>
//                 {showLikeToast && (
//                   <motion.div
//                     className="action-toast"
//                     initial={{ opacity: 0, y: 6, scale: 0.88 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: 6, scale: 0.88 }}
//                     transition={{ duration: 0.18 }}
//                   >
//                     {/* ollie mascot instead of heart */}
//                     <img src={owlMascot} alt="" className="toast-icon" />
//                     <span>Thanks!!</span>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
              

// </div>

//             {/* ── Copy ── */}
//             <div style={{ position: 'relative' }}>
//               <motion.button
//                 className="msg-action-btn"
//                 onClick={handleCopy}
//                 whileHover={{ scale: 1.18 }}
//                 whileTap={{ scale: 0.85 }}
//                 title="Copy response"
//               >
//                 <img
//                   src={copyIcon}
//                   alt="copy"
//                   className="action-icon"
//                   style={{ opacity: showCopyToast ? 0.5 : 1, transition: 'opacity 0.2s' }}
//                 />
//               </motion.button>

//               <AnimatePresence>
//                 {showCopyToast && (
//                   <motion.div
//                     className="action-toast"
//                     initial={{ opacity: 0, y: 6, scale: 0.88 }}
//                     animate={{ opacity: 1, y: 0, scale: 1 }}
//                     exit={{ opacity: 0, y: 6, scale: 0.88 }}
//                     transition={{ duration: 0.18 }}
//                   >
//                     <img src={owlMascot} alt="" className="toast-icon" />
//                     <span>Text copied!</span>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {/* ── Reply — inline SVG arrow, no extra PNG needed ── */}
//             <motion.button
//               className="msg-action-btn"
//               onClick={handleReply}
//               whileHover={{ scale: 1.18 }}
//               whileTap={{ scale: 0.85 }}
//               title="Reply to this"
//             >
//               <svg
//                 width="18" height="18" viewBox="0 0 24 24"
//                 fill="none" stroke="currentColor"
//                 strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
//                 className="reply-svg-icon"
//               >
//                 <polyline points="9 17 4 12 9 7" />
//                 <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
//               </svg>
//             </motion.button>

//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// }



import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/message.css';
import owlMascot    from '../assets/ollie.png.png';
import heartFilled  from '../assets/heart.png.png';
import heartOutline from '../assets/outline.png';
import copyIcon     from '../assets/copy.png';

export default function MessageBubble({ message, onReply }) {
  const { role, content, citations, timestamp } = message;
  const isAI = role === 'assistant';

  const [liked, setLiked]                 = useState(false);
  const [showCopyToast, setShowCopyToast] = useState(false);
  const [showLikeToast, setShowLikeToast] = useState(false);
  const copyTimer = useRef(null);
  const likeTimer = useRef(null);

  const formatTime = (ts) => {
    if (!ts) return '';
    return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleLike = () => {
    const next = !liked;
    setLiked(next);
    if (next) {
      setShowLikeToast(true);
      clearTimeout(likeTimer.current);
      likeTimer.current = setTimeout(() => setShowLikeToast(false), 2200);
    } else {
      setShowLikeToast(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content).catch(() => {
      const el = document.createElement('textarea');
      el.value = content;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    });
    setShowCopyToast(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setShowCopyToast(false), 2200);
  };

  const handleReply = () => {
    if (onReply) onReply(content);
  };

  return (
    <motion.div
      className={`message-row ${isAI ? 'ai' : 'user'}`}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Avatar */}
      <div className={`message-avatar ${isAI ? 'ai-avatar' : 'user-avatar'}`}>
        {isAI ? (
          <img src={owlMascot} alt="owl" style={{ width: 34, height: 34, objectFit: 'contain' }} />
        ) : (
          <span>U</span>
        )}
      </div>

      {/* Bubble */}
      <div className="message-bubble-wrap">
        <div className="message-sender">{isAI ? 'AI response' : 'User'}</div>

        <div className={`message-bubble ${isAI ? 'ai' : 'user'}`}>
          <span style={{ whiteSpace: 'pre-wrap' }}>{content}</span>

          {isAI && citations && citations.length > 0 && (
            <div className="message-citations">
              {citations.map((cite, i) => (
                <span key={i} className="citation-chip">
                  <span className="citation-chip-icon">📄</span>
                  {cite}
                </span>
              ))}
            </div>
          )}
        </div>

        {timestamp && (
          <div className="message-time">{formatTime(timestamp)}</div>
        )}

        {/* ───── AI Message Actions ───── */}
        {isAI && (
          <div className="msg-actions">

            {/* Like */}
            <div style={{ position: 'relative' }}>
              <motion.button
                className={`msg-action-btn ${liked ? 'liked' : ''}`}
                onClick={handleLike}
                whileHover={{ scale: 1.18 }}
                whileTap={{ scale: 0.85 }}
                title={liked ? 'Unlike' : 'Like'}
              >
                <motion.img
                  key={liked ? 'filled' : 'outline'}
                  src={liked ? heartFilled : heartOutline}
                  alt="like"
                  className="action-icon"
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                />
              </motion.button>

              <AnimatePresence>
                {showLikeToast && (
                  <motion.div
                    className="action-toast"
                    initial={{ opacity: 0, y: 6, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.88 }}
                    transition={{ duration: 0.18 }}
                  >
                    <img src={owlMascot} alt="" className="toast-icon" />
                    <span>Thanks!!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Copy */}
            <div style={{ position: 'relative' }}>
              <motion.button
                className="msg-action-btn"
                onClick={handleCopy}
                whileHover={{ scale: 1.18 }}
                whileTap={{ scale: 0.85 }}
                title="Copy response"
              >
                <img
                  src={copyIcon}
                  alt="copy"
                  className="action-icon"
                  style={{ opacity: showCopyToast ? 0.5 : 1, transition: 'opacity 0.2s' }}
                />
              </motion.button>

              <AnimatePresence>
                {showCopyToast && (
                  <motion.div
                    className="action-toast"
                    initial={{ opacity: 0, y: 6, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.88 }}
                    transition={{ duration: 0.18 }}
                  >
                    <img src={owlMascot} alt="" className="toast-icon" />
                    <span>Text copied!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Reply */}
            <motion.button
              className="msg-action-btn"
              onClick={handleReply}
              whileHover={{ scale: 1.18 }}
              whileTap={{ scale: 0.85 }}
              title="Reply to this"
            >
              <svg
                width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor"
                strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
                className="reply-svg-icon"
              >
                <polyline points="9 17 4 12 9 7" />
                <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
              </svg>
            </motion.button>

          </div>
        )}

        {/* ───── User Message Actions ───── */}
        {!isAI && (
          <div className="msg-actions user-actions">
            <div style={{ position: 'relative' }}>
              <motion.button
                className="msg-action-btn"
                onClick={handleCopy}
                whileHover={{ scale: 1.18 }}
                whileTap={{ scale: 0.85 }}
                title="Copy message"
              >
                <img
                  src={copyIcon}
                  alt="copy"
                  className="action-icon"
                  style={{ opacity: showCopyToast ? 0.5 : 1, transition: 'opacity 0.2s' }}
                />
              </motion.button>

              <AnimatePresence>
                {showCopyToast && (
                  <motion.div
                    className="action-toast"
                    initial={{ opacity: 0, y: 6, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.88 }}
                    transition={{ duration: 0.18 }}
                  >
                    <img src={owlMascot} alt="" className="toast-icon" />
                    <span>Text copied!</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

      </div>
    </motion.div>
  );
}