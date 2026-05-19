import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import SummaryPanel from '../components/SummaryPanel';
import QuizPanel from '../components/QuizPanel';
import { ChatContext } from '../context/ChatContext';
import '../styles/chat.css';
import FlashCardPanel from '../components/FlashCardPanel';
import SettingsPanel from '../components/SettingsPanel';

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePanel, setActivePanel] = useState(null); // 'summary' | 'quiz' | null
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const { currentSession } = useContext(ChatContext);

  const openSummary = () => {
    setActivePanel('summary');
    setRightPanelOpen(true);
    setSidebarOpen(false);
  };

  const openQuiz = () => {
    setActivePanel('quiz');
    setRightPanelOpen(true);
    setSidebarOpen(false);
  };

  const openFlashCards = () => {
  setActivePanel('flashcards');
  setRightPanelOpen(true);
  setSidebarOpen(false);
};
const openSettings = () => {
  setActivePanel('settings');
  setRightPanelOpen(true);
  setSidebarOpen(false);
};

  const closePanel = () => {
    setRightPanelOpen(false);
    setTimeout(() => setActivePanel(null), 300);
  };

  return (
    <div className="chat-page">
      {/* Sidebar */}
      {/* <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onOpenSummary={openSummary}
        onOpenQuiz={openQuiz}
        activePanelType={activePanel}
      /> */}
      {/* <Sidebar
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
  onOpenSummary={openSummary}
  onOpenQuiz={openQuiz}
  onOpenFlashCards={openFlashCards}
  activePanelType={activePanel}
/> */}
<Sidebar
  isOpen={sidebarOpen}
  onClose={() => setSidebarOpen(false)}
  onOpenSummary={openSummary}
  onOpenQuiz={openQuiz}
  onOpenFlashCards={openFlashCards}
  onOpenSettings={openSettings}
  activePanelType={activePanel}
/>

      {/* Main */}
      <div className="chat-main">
        {/* Top bar */}
        <div className="chat-topbar">
          <button className="chat-topbar-menu" onClick={() => setSidebarOpen(true)}>☰</button>
          <div className="chat-topbar-title">
            {currentSession?.title || 'AI Connexion'}
          </div>
          <div className="chat-topbar-actions">
            <motion.button
              className={`chat-topbar-btn ${activePanel === 'summary' && rightPanelOpen ? 'active' : ''}`}
              onClick={activePanel === 'summary' && rightPanelOpen ? closePanel : openSummary}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
            <span>Summary</span>
            </motion.button>
            <motion.button
              className={`chat-topbar-btn ${activePanel === 'quiz' && rightPanelOpen ? 'active' : ''}`}
              onClick={activePanel === 'quiz' && rightPanelOpen ? closePanel : openQuiz}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Quiz</span>
            </motion.button>
          </div>
        </div>

        {/* Chat content + panels */}
        <div className="chat-content">
          <ChatWindow />

          {/* Right Panel */}
          <AnimatePresence>
            {rightPanelOpen && activePanel === 'summary' && (
              <SummaryPanel key="summary" onClose={closePanel} />
            )}
            {rightPanelOpen && activePanel === 'quiz' && (
              <QuizPanel key="quiz" onClose={closePanel} />
            )}
          {/* {rightPanelOpen && activePanel === 'flashcards' && (
          <FlashCardPanel
          key="flashcards"
          onClose={closePanel}
           />
            )} */}
            {rightPanelOpen && activePanel === 'flashcards' && (
           <FlashCardPanel
            key="flashcards"
             onClose={closePanel}
           />
            )}   
            {rightPanelOpen && activePanel === 'settings' && (
  <SettingsPanel
    key="settings"
    onClose={closePanel}
  />
)}  
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// import React, {
//   createContext,
//   useState,
//   useEffect,
// } from 'react'

// import api from '../services/api'

// export const ChatContext = createContext()

// export function ChatProvider({ children }) {

//   const [messages, setMessages] = useState([])
//   const [loading, setLoading] = useState(false)

//   const [currentSession, setCurrentSession] =
//     useState(null)

//   // CREATE SESSION
//   useEffect(() => {

//     createNewSession()

//   }, [])

//   // NEW SESSION
//   const createNewSession = async () => {

//     try {

//       const res = await api.get('/create-session')

//       setCurrentSession({
//         id: res.data.session_id,
//         title: 'New Chat',
//       })

//     } catch (err) {

//       console.error(err)

//     }
//   }

//   // SEND MESSAGE
//   const sendMessage = async (question) => {

//     if (!question.trim()) return

//     // USER MESSAGE
//     const userMessage = {
//       role: 'user',
//       content: question,
//     }

//     setMessages(prev => [...prev, userMessage])

//     try {

//       setLoading(true)

//       const res = await api.post('/chat', {

//         session_id: currentSession.id,

//         question: question,

//       })

//       // AI MESSAGE
//       const aiMessage = {
//         role: 'assistant',
//         content: res.data.answer,
//       }

//       setMessages(prev => [...prev, aiMessage])

//     } catch (err) {

//       console.error(err)

//       setMessages(prev => [
//         ...prev,
//         {
//           role: 'assistant',
//           content:
//             'Sorry, I encountered an error. Please try again.',
//         },
//       ])

//     } finally {

//       setLoading(false)

//     }
//   }

//   return (

//     <ChatContext.Provider
//       value={{
//         messages,
//         loading,
//         sendMessage,
//         currentSession,
//         createNewSession,
//       }}
//     >

//       {children}

//     </ChatContext.Provider>
//   )
// }