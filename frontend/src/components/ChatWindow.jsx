import React, { useContext, useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatContext } from '../context/ChatContext';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import EmptyState from './EmptyState';
import '../styles/chat.css';

export default function ChatWindow() {
  const {
    messages,
    sendMessage,
    isTyping,
    uploadPdf,
    uploadedPdfs,
    currentSession,
  } = useContext(ChatContext);

  const [input, setInput] = useState('');
  const [attachedPdfs, setAttachedPdfs] = useState([]);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [input]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput('');
    await sendMessage(trimmed, attachedPdfs.map(p => p.id));
    setAttachedPdfs([]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const result = await uploadPdf(file);
      if (result) {
        setAttachedPdfs(prev => [...prev, result]);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    }
    e.target.value = '';
  };

  const removePdf = (id) => {
    setAttachedPdfs(prev => prev.filter(p => p.id !== id));
  };

  const handleSuggestion = (text) => {
    setInput(text);
    textareaRef.current?.focus();
  };

  return (
    <div className="chat-window">
      {/* Messages */}
      <div className="chat-messages">
        {messages.length === 0 ? (
          <EmptyState onSuggestionClick={handleSuggestion} />
        ) : (
          <>
            {messages.map((msg, i) => (
              <MessageBubble key={msg.id || i} message={msg} />
            ))}
            <AnimatePresence>
              {isTyping && <TypingIndicator key="typing" />}
            </AnimatePresence>
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="chat-input-area">
        {uploadedPdfs && uploadedPdfs.length > 0 && (
  <div
    style={{
      marginBottom: '10px',
      padding: '10px 14px',
      background: '#eef8e7',
      border: '1px solid #b7df9d',
      borderRadius: '12px',
      fontSize: '13px',
      color: '#3b6b2c',
      fontWeight: 600,
    }}
  >
    {uploadedPdfs.map((pdf, i) => (
      <div key={pdf.filename || pdf.id || i} style={{ marginBottom: i < uploadedPdfs.length - 1 ? 4 : 0 }}>
        📄 {pdf.filename || pdf.name}
      </div>
    ))}
    <div style={{ marginTop: 6, fontWeight: 500, fontSize: '12px', color: '#5a8a4a' }}>
      {uploadedPdfs.length === 1
        ? 'Ready to ask questions from this PDF.'
        : `${uploadedPdfs.length} PDFs ready — ask questions from any of them.`}
    </div>
  </div>
)}
        {/* PDF Chips */}
        {attachedPdfs.length > 0 && (
          <div className="pdf-chips-row">
            {attachedPdfs.map(pdf => (
              <div key={pdf.id} className="pdf-chip">
                 {pdf.filename || pdf.name}
                <button className="pdf-chip-remove" onClick={() => removePdf(pdf.id)}>✕</button>
              </div>
            ))}
          </div>
        )}

        <div className="chat-input-bar">
          {/* Upload */}
          <button
            className="chat-upload-btn"
            onClick={() => fileInputRef.current?.click()}
            title="Upload PDF"
          >
            📎 Upload
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
          />

          {/* Actions */}
          <div className="chat-input-actions">
            <button className="chat-input-action-btn" title="Emoji">😊</button>
            <motion.button
              className="chat-send-btn"
              onClick={handleSend}
              disabled={!input.trim()}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              title="Send"
            >
              ➤
            </motion.button>
          </div>
        </div>

        <div className="chat-input-hint">
          Press Enter to send · Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}