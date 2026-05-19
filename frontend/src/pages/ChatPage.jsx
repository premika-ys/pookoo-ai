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

