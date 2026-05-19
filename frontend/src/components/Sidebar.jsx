import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext';
import '../styles/sidebar.css';
import owlMascot from '../assets/ollie.png.png';
import deleteIcon from '../assets/delete.png';

export default function Sidebar({
  isOpen,
  onClose,
  onOpenSummary,
  onOpenQuiz,
  onOpenFlashCards,
  onOpenSettings,
  activePanelType
}) {
  const {
    sessions,
    currentSession,
    createSession,
    switchSession,
    deleteSession,
    deletePdf,
    uploadedPdfs,
  } = useContext(ChatContext);

  const { user, logout } = useContext(AuthContext);
  const [search, setSearch] = useState('');

  const filteredSessions = (sessions || []).filter(s =>
    s.title?.toLowerCase().includes(search.toLowerCase())
  );

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  const handleDeleteSession = (e, sessionId) => {
    e.stopPropagation();
    deleteSession(sessionId);
  };

  const handleDeletePdf = (e, filename) => {
    e.stopPropagation();
    deletePdf(filename);
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
      />

      <motion.aside
        className={`sidebar ${isOpen ? 'open' : ''}`}
        initial={false}
      >
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: 'linear-gradient(135deg, #A8D5A2, #F5E97A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 900, fontSize: '0.9rem', color: '#3A7A34',
            }}>
              <img
                src={owlMascot}
                alt="logo"
                style={{ width: '28px', height: '28px', objectFit: 'contain' }}
              />
            </div>
            POOKOO AI
          </div>
          <button className="sidebar-close-btn" onClick={onClose}>✕</button>
        </div>

        {/* New Chat */}
        <button className="sidebar-new-chat" onClick={() => createSession()}>
          <span style={{ fontSize: '1rem' }}>＋</span> New Chat
        </button>

        {/* Search */}
        <div className="sidebar-search">
          <span className="sidebar-search-icon">🧐</span>
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="sidebar-scroll">

          {/* ── Chat History ── */}
          <div className="sidebar-section-title">Chat History</div>

          <AnimatePresence>
            {filteredSessions.length === 0 && (
              <div style={{ padding: '8px 20px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                No chats yet
              </div>
            )}

            {filteredSessions.map((session, i) => (
              <motion.div
                key={session.id}
                className={`sidebar-chat-item ${currentSession?.id === session.id ? 'active' : ''}`}
                onClick={() => { switchSession(session.id); onClose(); }}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ delay: i * 0.03 }}
              >
                <div className="sidebar-chat-icon">💬</div>
                <div className="sidebar-chat-text">
                  <div className="sidebar-chat-name">{session.title || 'New Chat'}</div>
                  <div className="sidebar-chat-time">{session.updatedAt || ''}</div>
                </div>
                {/* Delete button */}
                  {/* Session delete button — was: ✕ */}
<button
  className="sidebar-delete-btn"
  onClick={e => handleDeleteSession(e, session.id)}
  title="Remove from sidebar"
>
  <img src={deleteIcon} alt="delete" className="sidebar-delete-icon" />
</button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* ── Uploaded PDFs ── */}
          {uploadedPdfs && uploadedPdfs.length > 0 && (
            <>
              <div className="sidebar-section-title">Uploaded PDFs</div>
              <AnimatePresence>
                {uploadedPdfs.map((pdf, i) => (
                  <motion.div
                    key={pdf.filename || pdf.id || i}
                    className="sidebar-pdf-item"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <div className="sidebar-pdf-icon">📄</div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div className="sidebar-pdf-name">{pdf.filename || pdf.name}</div>
                      <div className="sidebar-pdf-size">{pdf.size || ''}</div>
                    </div>
                    {/* Delete button */}
                    <button
  className="sidebar-delete-btn pdf-delete"
  onClick={e => handleDeletePdf(e, pdf.filename || pdf.name)}
  title="Remove PDF"
>
  <img src={deleteIcon} alt="delete" className="sidebar-delete-icon" />
</button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </>
          )}

          {/* ── Tools ── */}
          <div className="sidebar-section-title">Tools</div>

          <button
            className={`sidebar-action-btn ${activePanelType === 'summary' ? 'active' : ''}`}
            onClick={onOpenSummary}
          >
            <div className="sidebar-action-icon">⭐</div>
            Summary
          </button>

          <button
            className={`sidebar-action-btn ${activePanelType === 'quiz' ? 'active' : ''}`}
            onClick={onOpenQuiz}
          >
            <div className="sidebar-action-icon">📍</div>
            Quiz Generator
          </button>

          <button
            className={`sidebar-action-btn ${activePanelType === 'flashcards' ? 'active' : ''}`}
            onClick={onOpenFlashCards}
          >
            <div className="sidebar-action-icon">💡</div>
            Flash Cards
          </button>

          <button
            className={`sidebar-action-btn ${activePanelType === 'settings' ? 'active' : ''}`}
            onClick={onOpenSettings}
          >
            <div className="sidebar-action-icon">⚙️</div>
            Settings
          </button>
        </div>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-avatar">{initials}</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user?.name || 'User'}</div>
            <div className="sidebar-user-email">{user?.email || ''}</div>
          </div>
          <button
            className="sidebar-settings-btn"
            onClick={logout}
            title="Logout"
          >
            🚪
          </button>
        </div>
      </motion.aside>
    </>
  );
}