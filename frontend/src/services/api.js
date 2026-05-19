// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
//   timeout: 30000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor — attach token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('pookoo_token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Response interceptor — handle 401
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('pookoo_token');
//       localStorage.removeItem('pookoo_user');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// REQUEST INTERCEPTOR
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pookoo_token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('pookoo_token')
      localStorage.removeItem('pookoo_user')

      window.location.href = '/login'
    }

    return Promise.reject(error)
  }
)

// =========================
// CREATE SESSION
// =========================
export async function createSession() {
  const existing = localStorage.getItem('pookoo_session_id')

  if (existing) return existing

  const res = await api.get('/create-session')

  const sessionId = res.data.session_id

  localStorage.setItem('pookoo_session_id', sessionId)

  return sessionId
}

// =========================
// SEND CHAT
// =========================
export async function sendChat(sessionId, question) {
  const res = await api.post('/chat', {
    session_id: sessionId,
    question: question,
  })

  return res.data
}

// =========================
// UPLOAD PDF
// =========================
export async function uploadPDF(sessionId, file, onProgress) {
  const formData = new FormData()

  formData.append('file', file)
  formData.append('session_id', sessionId)

  const res = await api.post('/upload-pdf', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },

    onUploadProgress: (progressEvent) => {
      if (!onProgress) return

      const percent = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      )

      onProgress(percent)
    },
  })

  return res.data
}

// =========================
// SUMMARY
// =========================
export async function getSummary(sessionId) {
  const res = await api.get('/summary', {
    params: {
      session_id: sessionId,
    },
  })

  return res.data
}

// =========================
// QUIZ
// =========================
export async function getQuiz(sessionId) {
  const res = await api.get('/quiz', {
    params: {
      session_id: sessionId,
    },
  })

  return res.data
}

export default api

