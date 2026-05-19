import React, { createContext, useState, useCallback, useEffect, useRef } from 'react';
import api from '../services/api';

export const ChatContext = createContext(null);

// ========================================
// LOCALSTORAGE HELPERS
// ========================================

const LS_SESSIONS  = 'pookoo_sessions';
const LS_MESSAGES  = 'pookoo_session_messages';
const LS_PDFS      = 'pookoo_session_pdfs';
const LS_CURRENT   = 'pookoo_current_session';

function lsGet(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function lsSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ========================================
// BACKEND SYNC HELPERS
// ========================================

async function backendSaveSession({ session, messages, pdfs }) {
  try {
    const token = localStorage.getItem('pookoo_token');
    if (!token) return;
    await api.post('/sessions/save', {
      session_id: session.id,
      title: session.title,
      messages: messages.map(m => ({
        id: m.id,
        role: m.role,
        content: m.content,
        timestamp: m.timestamp || new Date().toISOString(),
      })),
      pdfs: pdfs.map(p => ({
        filename: p.filename || p.name,
        name: p.name || p.filename,
        size: p.size || '',
      })),
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch (err) {
    // Backend sync failure — localStorage still has data, not critical
    console.warn('Backend sync failed (non-critical):', err?.message);
  }
}

async function backendListSessions() {
  try {
    const token = localStorage.getItem('pookoo_token');
    if (!token) return null;
    const res = await api.get('/sessions/list', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.sessions || [];
  } catch { return null; }
}

async function backendGetMessages(sessionId) {
  try {
    const token = localStorage.getItem('pookoo_token');
    if (!token) return [];
    const res = await api.get(`/sessions/messages/${sessionId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.messages || [];
  } catch { return []; }
}

async function backendGetPdfs(sessionId) {
  try {
    const token = localStorage.getItem('pookoo_token');
    if (!token) return [];
    const res = await api.get(`/sessions/pdfs/${sessionId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data.pdfs || [];
  } catch { return []; }
}

async function backendDeleteSession(sessionId) {
  try {
    const token = localStorage.getItem('pookoo_token');
    if (!token) return;
    await api.delete(`/sessions/${sessionId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  } catch {}
}


export function ChatProvider({ children }) {

  // ── State — seed from localStorage first (instant paint) ──────────
  const [sessions, setSessions] = useState(() => lsGet(LS_SESSIONS, []));
  const [sessionMessages, setSessionMessages] = useState(() => lsGet(LS_MESSAGES, {}));
  const [sessionPdfs, setSessionPdfs] = useState(() => lsGet(LS_PDFS, {}));
  const [currentSession, setCurrentSession] = useState(() => lsGet(LS_CURRENT, null));
  const [messages, setMessages] = useState(() => {
    const cur = lsGet(LS_CURRENT, null);
    if (!cur) return [];
    return lsGet(LS_MESSAGES, {})[cur.id] || [];
  });
  const [uploadedPdfs, setUploadedPdfs] = useState(() => {
    const cur = lsGet(LS_CURRENT, null);
    if (!cur) return [];
    return lsGet(LS_PDFS, {})[cur.id] || [];
  });

  const [isTyping, setIsTyping] = useState(false);
  const [summary, setSummary] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [flashCards, setFlashCards] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Ref to avoid stale closures in save calls
  const stateRef = useRef({});
  stateRef.current = { sessions, sessionMessages, sessionPdfs, currentSession };

  // ── Persist to localStorage whenever state changes ─────────────────
  useEffect(() => { lsSet(LS_SESSIONS, sessions); }, [sessions]);
  useEffect(() => { lsSet(LS_MESSAGES, sessionMessages); }, [sessionMessages]);
  useEffect(() => { lsSet(LS_PDFS, sessionPdfs); }, [sessionPdfs]);
  useEffect(() => { lsSet(LS_CURRENT, currentSession); }, [currentSession]);


  // ========================================
  // HYDRATE FROM BACKEND ON MOUNT
  //
  // FIX 1: messages from backend are merged
  // with localStorage messages — whichever
  // has more entries wins. This prevents the
  // case where the DB saved fewer messages
  // than localStorage (e.g. save race) from
  // wiping what the user already sees.
  //
  // FIX 2: sessionToRestore now matches by
  // session ID only (not title) so a title
  // update never causes a wrong session to
  // be selected on refresh.
  //
  // FIX 3: setMessages and setUploadedPdfs
  // are called with the fully-resolved values
  // AFTER Promise.all completes — not inside
  // the async map callback — so they always
  // have the correct final state.
  // ========================================

  useEffect(() => {
    async function hydrate() {
      const token = localStorage.getItem('pookoo_token');
      if (!token) {
        setHydrated(true);
        return;
      }

      const backendSessions = await backendListSessions();
      if (!backendSessions || backendSessions.length === 0) {
        // No backend sessions — keep whatever localStorage has
        setHydrated(true);
        return;
      }

      // Backend is source of truth for session list
      setSessions(backendSessions);
      lsSet(LS_SESSIONS, backendSessions);

      // Keep local caches as fallback
      const localMessages = lsGet(LS_MESSAGES, {});
      const localPdfs     = lsGet(LS_PDFS, {});

      const allMessages = {};
      const allPdfs     = {};

      await Promise.all(
        backendSessions.map(async (session) => {
          const [backendMsgs, backendPdfs] = await Promise.all([
            backendGetMessages(session.id),
            backendGetPdfs(session.id),
          ]);

          // FIX 1: use whichever source has more messages
          // (backend may lag behind localStorage on a save race)
          const localMsgs = localMessages[session.id] || [];
          allMessages[session.id] =
            backendMsgs.length >= localMsgs.length ? backendMsgs : localMsgs;

          // FIX: keep local PDFs if backend returned nothing
          if (backendPdfs && backendPdfs.length > 0) {
            allPdfs[session.id] = backendPdfs;
          } else {
            allPdfs[session.id] = localPdfs[session.id] || [];
          }
        })
      );

      setSessionMessages(allMessages);
      setSessionPdfs(allPdfs);
      lsSet(LS_MESSAGES, allMessages);
      lsSet(LS_PDFS, allPdfs);

      // FIX 2: match saved session by ID only — title may have changed
      const savedCurrentId = lsGet(LS_CURRENT, null)?.id;
      const sessionToRestore =
        savedCurrentId && backendSessions.find(s => s.id === savedCurrentId)
          ? backendSessions.find(s => s.id === savedCurrentId)   // use backend copy (has latest title)
          : backendSessions[0];

      if (sessionToRestore) {
        // FIX 3: set messages/pdfs AFTER Promise.all — allMessages is fully populated here
        const restoredMsgs = allMessages[sessionToRestore.id] || [];
        const restoredPdfs = allPdfs[sessionToRestore.id] || [];

        setCurrentSession(sessionToRestore);
        setMessages(restoredMsgs);
        setUploadedPdfs(restoredPdfs);
        lsSet(LS_CURRENT, sessionToRestore);
      }

      setHydrated(true);
    }

    hydrate();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  // ========================================
  // CREATE SESSION
  // ========================================

  const createSession = useCallback(async () => {
    try {
      const res = await api.get('/create-session');
      const session = {
        id: res.data.session_id,
        title: 'New Chat',
        updatedAt: new Date().toLocaleTimeString(),
      };

      setSessions(prev => {
        const updated = [session, ...prev];
        lsSet(LS_SESSIONS, updated);
        return updated;
      });

      setCurrentSession(session);
      setMessages([]);
      setUploadedPdfs([]);
      setSessionPdfs(prev => {
        const updated = { ...prev, [session.id]: [] };
        lsSet(LS_PDFS, updated);
        return updated;
      });
      setSummary(null);
      setQuiz([]);
      setFlashCards([]);

      return session;

    } catch (err) {
      console.error(err);
      const session = {
        id: Date.now().toString(),
        title: 'New Chat',
        updatedAt: new Date().toLocaleTimeString(),
      };
      setSessions(prev => {
        const updated = [session, ...prev];
        lsSet(LS_SESSIONS, updated);
        return updated;
      });
      setCurrentSession(session);
      setMessages([]);
      setUploadedPdfs([]);
      return session;
    }
  }, []);


  // ========================================
  // SWITCH SESSION
  // ========================================

  const switchSession = useCallback(async (sessionId) => {
    const { sessions: currentSessions, sessionMessages: allMsgs, sessionPdfs: allPdfs } = stateRef.current;
    const session = currentSessions.find(s => s.id === sessionId);
    if (!session) return;

    setCurrentSession(session);

    // Messages: use cached, else fetch from backend
    let msgs = allMsgs[sessionId];
    if (!msgs) {
      msgs = await backendGetMessages(sessionId);
      setSessionMessages(prev => {
        const updated = { ...prev, [sessionId]: msgs };
        lsSet(LS_MESSAGES, updated);
        return updated;
      });
    }
    setMessages(msgs || []);

    // PDFs: use cached local first — avoids flicker and blank sidebar
    // Only fetch from backend if nothing cached locally
    let pdfs = allPdfs[sessionId];
    if (!pdfs || pdfs.length === 0) {
      const backendPdfs = await backendGetPdfs(sessionId);
      // FIX: only use backend result if it actually has data
      pdfs = backendPdfs && backendPdfs.length > 0 ? backendPdfs : (allPdfs[sessionId] || []);
      setSessionPdfs(prev => {
        const updated = { ...prev, [sessionId]: pdfs };
        lsSet(LS_PDFS, updated);
        return updated;
      });
    }
    setUploadedPdfs(pdfs || []);

    setSummary(null);
    setQuiz([]);
    setFlashCards([]);
  }, []);


  // ========================================
  // DELETE SESSION (frontend + backend DB)
  // Does NOT delete files/vectorstore
  // ========================================

  const deleteSession = useCallback((sessionId) => {
    // Remove from backend DB (non-blocking)
    backendDeleteSession(sessionId);

    setSessions(prev => {
      const updated = prev.filter(s => s.id !== sessionId);
      lsSet(LS_SESSIONS, updated);
      return updated;
    });

    setSessionMessages(prev => {
      const updated = { ...prev };
      delete updated[sessionId];
      lsSet(LS_MESSAGES, updated);
      return updated;
    });

    setSessionPdfs(prev => {
      const updated = { ...prev };
      delete updated[sessionId];
      lsSet(LS_PDFS, updated);
      return updated;
    });

    setCurrentSession(prev => {
      if (prev?.id === sessionId) {
        lsSet(LS_CURRENT, null);
        setMessages([]);
        setUploadedPdfs([]);
        return null;
      }
      return prev;
    });
  }, []);


  // ========================================
  // DELETE PDF (frontend only)
  // ========================================

  const deletePdf = useCallback((filename) => {
    const { currentSession: cur, sessionMessages: allMsgs } = stateRef.current;

    setUploadedPdfs(prev => {
      const updated = prev.filter(p => (p.filename || p.name) !== filename);
      return updated;
    });

    if (cur) {
      setSessionPdfs(prev => {
        const existing = prev[cur.id] || [];
        const updated = {
          ...prev,
          [cur.id]: existing.filter(p => (p.filename || p.name) !== filename),
        };
        lsSet(LS_PDFS, updated);

        // Sync to backend with updated PDF list
        const newPdfs = updated[cur.id] || [];
        const msgs = allMsgs[cur.id] || [];
        backendSaveSession({ session: cur, messages: msgs, pdfs: newPdfs });

        return updated;
      });
    }
  }, []);


  // ========================================
  // SEND MESSAGE
  // ========================================

  const sendMessage = useCallback(async (content) => {
    if (!content?.trim()) return;

    let session = stateRef.current.currentSession;
    if (!session) {
      session = await createSession();
    }

    const sessionId = session.id;

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    let updatedMsgsAfterUser = [];

    setMessages(prev => {
      updatedMsgsAfterUser = [...prev, userMsg];
      setSessionMessages(prevSessions => {
        const newState = { ...prevSessions, [sessionId]: updatedMsgsAfterUser };
        lsSet(LS_MESSAGES, newState);
        return newState;
      });
      return updatedMsgsAfterUser;
    });

    setIsTyping(true);

    try {
      const res = await api.post('/chat', {
        session_id: sessionId,
        question: content,
      });

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: res.data.answer || 'No response',
        timestamp: new Date().toISOString(),
      };

      let updatedMsgsAfterAI = [];

      setMessages(prev => {
        updatedMsgsAfterAI = [...prev, aiMsg];
        setSessionMessages(prevSessions => {
          const newState = { ...prevSessions, [sessionId]: updatedMsgsAfterAI };
          lsSet(LS_MESSAGES, newState);
          return newState;
        });
        return updatedMsgsAfterAI;
      });

      // Update session title
      let updatedSession = session;
      if (session.title === 'New Chat') {
        const newTitle = content.slice(0, 30) + (content.length > 30 ? '...' : '');
        updatedSession = { ...session, title: newTitle };

        setSessions(prev => {
          const updated = prev.map(s =>
            s.id === sessionId ? updatedSession : s
          );
          lsSet(LS_SESSIONS, updated);
          return updated;
        });

        setCurrentSession(prev =>
          prev?.id === sessionId ? updatedSession : prev
        );
      }

      // Save to backend after AI response
      const currentPdfs = stateRef.current.sessionPdfs[sessionId] || [];
      backendSaveSession({
        session: updatedSession,
        messages: updatedMsgsAfterAI,
        pdfs: currentPdfs,
      });

    } catch (err) {
      console.error('CHAT ERROR:', err);

      const errMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => {
        const updated = [...prev, errMsg];
        setSessionMessages(prevSessions => {
          const newState = { ...prevSessions, [sessionId]: updated };
          lsSet(LS_MESSAGES, newState);
          return newState;
        });
        return updated;
      });

    } finally {
      setIsTyping(false);
    }
  }, [createSession]);


  // ========================================
  // PDF UPLOAD
  // FIX: state is now updated BEFORE the
  // backend sync attempt. Even if backendSave
  // fails, the PDF will still appear in the
  // sidebar immediately after upload.
  // ========================================

  const uploadPdf = useCallback(async (file) => {
    try {
      let session = stateRef.current.currentSession;
      if (!session) {
        session = await createSession();
      }

      const sessionId = session.id;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('session_id', sessionId);

      // Upload to backend first
      await api.post('/upload-pdf', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Build PDF object from the file directly
      const pdf = {
        id: file.name,
        filename: file.name,
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
      };

      // ── FIX: update state synchronously and unconditionally ──
      // We do NOT check "exists" by filename alone anymore because
      // after a page refresh the local state may be empty even though
      // the file was uploaded before. Always reflect the current upload.

      let newPdfsForSession = [];

      setSessionPdfs(prev => {
        const existing = prev[sessionId] || [];
        // Deduplicate only within this render cycle
        const alreadyThere = existing.some(item => (item.filename || item.name) === pdf.filename);
        newPdfsForSession = alreadyThere ? existing : [...existing, pdf];
        const updated = { ...prev, [sessionId]: newPdfsForSession };
        lsSet(LS_PDFS, updated);          // persist to localStorage immediately
        return updated;
      });

      // Mirror into uploadedPdfs (what the sidebar reads)
      setUploadedPdfs(prev => {
        const alreadyThere = prev.some(item => (item.filename || item.name) === pdf.filename);
        return alreadyThere ? prev : [...prev, pdf];
      });

      // Non-blocking backend save — failure here does NOT affect the sidebar
      setTimeout(() => {
        const msgs = stateRef.current.sessionMessages[sessionId] || [];
        const latestPdfs = stateRef.current.sessionPdfs[sessionId] || newPdfsForSession;
        backendSaveSession({
          session: stateRef.current.currentSession || session,
          messages: msgs,
          pdfs: latestPdfs,
        });
      }, 100);

      return pdf;

    } catch (err) {
      console.error('UPLOAD ERROR:', err);
      return null;
    }
  }, [createSession]);


  // ========================================
  // SUMMARY
  // ========================================

  const generateSummary = useCallback(async (selectedPdfs = []) => {
    const res = await api.post('/summary', {
      session_id: stateRef.current.currentSession?.id,
      selected_pdfs: selectedPdfs,
    });
    setSummary(res.data.summary);
    return res.data.summary;
  }, []);


  // ========================================
  // QUIZ
  // ========================================

  const generateQuiz = useCallback(async (selectedPdfs = []) => {
    try {
      const res = await api.post('/quiz', {
        session_id: stateRef.current.currentSession?.id,
        selected_pdfs: selectedPdfs,
      });

      let quizData = [];
      if (Array.isArray(res.data.quiz)) {
        quizData = res.data.quiz;
      } else if (Array.isArray(res.data.questions)) {
        quizData = res.data.questions;
      } else if (typeof res.data.quiz === 'string') {
        try { quizData = JSON.parse(res.data.quiz); } catch { quizData = []; }
      }

      setQuiz(quizData);
      return quizData;
    } catch (err) {
      console.error('QUIZ ERROR:', err);
      setQuiz([]);
      return [];
    }
  }, []);


  // ========================================
  // FLASHCARDS
  // ========================================

  const generateFlashCards = useCallback(async (selectedPdfs = []) => {
    try {
      const res = await api.post('/flashcards', {
        session_id: stateRef.current.currentSession?.id,
        selected_pdfs: selectedPdfs,
      });

      let cards = [];
      if (Array.isArray(res.data.flashcards)) {
        cards = res.data.flashcards;
      } else if (Array.isArray(res.data)) {
        cards = res.data;
      }

      setFlashCards(cards);
      return cards;
    } catch (err) {
      console.error('FLASHCARD ERROR:', err);
      setFlashCards([]);
      return [];
    }
  }, []);


  return (
    <ChatContext.Provider
      value={{
        sessions,
        currentSession,
        messages,
        isTyping,
        uploadedPdfs,
        summary,
        quiz,
        flashCards,
        hydrated,
        createSession,
        switchSession,
        deleteSession,
        deletePdf,
        sendMessage,
        uploadPdf,
        generateSummary,
        generateQuiz,
        generateFlashCards,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}