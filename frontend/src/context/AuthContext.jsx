// import React, { createContext, useState, useEffect } from 'react';
// import api from '../services/api';

// export const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(() => {
//     try {
//       const stored = localStorage.getItem('pookoo_user');
//       return stored ? JSON.parse(stored) : null;
//     } catch {
//       return null;
//     }
//   });
//   const [token, setToken] = useState(() => localStorage.getItem('pookoo_token') || null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (token) {
//       api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     } else {
//       delete api.defaults.headers.common['Authorization'];
//     }
//   }, [token]);

//   const login = async (email, password) => {
//     setLoading(true);
//     try {
//       // Adjust endpoint to match your FastAPI backend
//       const res = await api.post('/auth/login', { email, password });
//       const { access_token, user: userData } = res.data;
//       setToken(access_token);
//       setUser(userData);
//       localStorage.setItem('pookoo_token', access_token);
//       localStorage.setItem('pookoo_user', JSON.stringify(userData));
//       return userData;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const signup = async (formData) => {
//     setLoading(true);
//     try {
//       const res = await api.post('/auth/signup', formData);
//       const { access_token, user: userData } = res.data;
//       setToken(access_token);
//       setUser(userData);
//       localStorage.setItem('pookoo_token', access_token);
//       localStorage.setItem('pookoo_user', JSON.stringify(userData));
//       return userData;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem('pookoo_token');
//     localStorage.removeItem('pookoo_user');
//   };

//   return (
//     // <AuthContext.Provider value={{ user, token, loading, login, signup, logout, isAuthenticated: !!user }}>
//     <AuthContext.Provider value={{
//   user,
//   setUser,
//   token,
//   loading,
//   login,
//   signup,
//   logout,
//   isAuthenticated: !!user
// }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }






import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('pookoo_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  const [token, setToken] = useState(
    () => localStorage.getItem('pookoo_token') || null
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      // Accept both token and access_token from backend
      const receivedToken = res.data.token || res.data.access_token;
      const userData = res.data.user;

      setToken(receivedToken);
      setUser(userData);
      localStorage.setItem('pookoo_token', receivedToken);
      localStorage.setItem('pookoo_user', JSON.stringify(userData));

      return userData;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (formData) => {
    setLoading(true);
    try {
      const res = await api.post('/auth/signup', formData);
      const receivedToken = res.data.token || res.data.access_token;
      const userData = res.data.user;

      setToken(receivedToken);
      setUser(userData);
      localStorage.setItem('pookoo_token', receivedToken);
      localStorage.setItem('pookoo_user', JSON.stringify(userData));

      return userData;
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // LOGOUT — only clears auth tokens.
  // Chat history (pookoo_sessions, etc.) stays
  // in localStorage so it can be rehydrated
  // from backend on next login.
  // ============================================
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('pookoo_token');
    localStorage.removeItem('pookoo_user');
    // NOTE: intentionally NOT removing pookoo_sessions,
    // pookoo_session_messages, pookoo_session_pdfs,
    // pookoo_current_session — these get re-synced from
    // backend on next login.
  };

  return (
    <AuthContext.Provider value={{
      user,
      setUser,
      token,
      loading,
      login,
      signup,
      logout,
      isAuthenticated: !!user,
    }}>
      {children}
    </AuthContext.Provider>
  );
}