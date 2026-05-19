import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import '../styles/auth.css';
import owlMascot from '../assets/singup.png.png';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    gender: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleGender = (g) => {
    setForm({ ...form, gender: g });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await signup(form);
      navigate('/chat');
    } catch (err) {
      setError(err?.message || 'Signup failed. Please try again.');
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
        style={{ maxWidth: 960, minHeight: 640 }}
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      >
        {/* Right form side first on mobile */}
        <div className="auth-right" style={{ padding: '40px 44px', flex: '1.1' }}>
          <div className="auth-form-logo">POOKOO AI</div>

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
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-input"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="Email@gmail.com"
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
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="form-input-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">DOB</label>
              <input
                type="text"
                name="dob"
                className="form-input"
                placeholder="DOB / M80"
                value={form.dob}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Gender Selector</label>
              <div className="gender-selector">
                <button
                  type="button"
                  className={`gender-chip male ${form.gender === 'male' ? 'active' : ''}`}
                  onClick={() => handleGender('male')}
                >
                  <span></span>
                  Male
                </button>
                <button
                  type="button"
                  className={`gender-chip female ${form.gender === 'female' ? 'active' : ''}`}
                  onClick={() => handleGender('female')}
                >
                  <span></span>
                  Female
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              className="btn-auth-submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </motion.button>
          </form>

          <div className="auth-form-footer">
            Already have an account?{' '}
            <span className="auth-link" onClick={() => navigate('/login')}>
              Log in
            </span>
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 16 }}>
            Animate version-rounded palette
          </p>
        </div>

        {/* Left mascot panel */}
        <div className="auth-left" style={{ flex: 0.9 }}>
          <div className="auth-left-deco auth-left-deco-1" />
          <div className="auth-left-deco auth-left-deco-2" />

          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div style={{
              width: 180,
              height: 180,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 40% 40%, rgba(245,184,200,0.4) 0%, rgba(245,233,122,0.25) 60%, transparent 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 16px 40px rgba(245,184,200,0.25)',
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

          <div className="auth-left-title">Join POOKOO AI</div>
          <div className="auth-left-sub">Create your account and start your intelligent learning journey today.</div>
        </div>
      </motion.div>
    </div>
  );
}