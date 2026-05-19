import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css';
import owlMascot from '../assets/login.png.png';


export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/chat');
    } catch (err) {
      setError(err?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-root">
      {/* Blobs */}
      <div className="auth-blob auth-blob-1" />
      <div className="auth-blob auth-blob-2" />
      <div className="auth-blob auth-blob-3" />

      <motion.div
        className="auth-container"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        {/* Left Panel */}
        <div className="auth-left">
          <div className="auth-left-deco auth-left-deco-1" />
          <div className="auth-left-deco auth-left-deco-2" />

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div style={{
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 40%, rgba(168,213,162,0.4) 0%, rgba(245,233,122,0.25) 60%, transparent 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 16px 40px rgba(168,213,162,0.25)',
            }}>
              {/* <span style={{ fontSize: '7rem', lineHeight: 1, filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.12))' }}>🦉</span> */}
              <img
  src={owlMascot}
  alt="owl"
  style={{
    width: '700px',
    height: '700px',
    objectFit: 'contain',
    filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.12))',
  }}
/>
            </div>
          </motion.div>

          <div className="auth-left-title">Welcome Back!</div>
          <div className="auth-left-sub">Log in to continue your intelligent study journey with POOKOO AI.</div>
        </div>

        {/* Right Panel */}
        <div className="auth-right">
          <div className="auth-form-logo">POOKOO AI</div>

          <h2 className="auth-form-title">Authentication</h2>
          <p className="auth-form-sub">Sign in to your account</p>

          {error && (
            <motion.div
              className="auth-error"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Authentication</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="email@gmail.com"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="form-input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-input"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="form-input-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="form-input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="passwordConfirm"
                  className="form-input"
                  placeholder="••••••••"
                  autoComplete="off"
                />
                <button
                  type="button"
                  className="form-input-icon"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
              <div className="auth-forgot">
                <span
                  className="auth-link"
                  style={{ fontSize: '0.8rem' }}
                  onClick={() => {}}
                >
                  Forgot your password?
                </span>
              </div>
            </div>

            <motion.button
              type="submit"
              className="btn-auth-submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>

          <div className="auth-form-footer">
            Don't have an account?{' '}
            <span className="auth-link" onClick={() => navigate('/signup')}>
              Sign up
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}