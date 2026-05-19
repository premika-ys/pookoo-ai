import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import owlMascot from '../assets/logo.png.png';

const panelVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.96, y: 16, transition: { duration: 0.2 } },
};

const blobStyle = (top, left, size, color) => ({
  position: 'absolute',
  top, left,
  width: size, height: size,
  borderRadius: '50%',
  background: color,
  filter: 'blur(52px)',
  opacity: 0.55,
  pointerEvents: 'none',
  zIndex: 0,
});

export default function SettingsPanel({ onClose }) {
  const { user, setUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    userId: user?.userId || user?.email || '',
    university: user?.university || '',
  });
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Adjust endpoint to match your backend if needed
    //   await api.put('/auth/profile', form);
    await Promise.resolve();
      if (setUser) setUser(prev => ({ ...prev, ...form }));
      setSaved(true);
      setEditing(false);
    } catch {
      // Even if API fails, update local state
      if (setUser) setUser(prev => ({ ...prev, ...form }));
      setSaved(true);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const initials = form.name
    ? form.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U';

  return (
    <motion.div
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
        pointerEvents: 'none',
      }}
    >
      {/* Pastel blobs behind card */}
      <div style={blobStyle('10%', '8%', '180px', 'rgba(168,213,162,0.7)')} />
      <div style={blobStyle('55%', '5%', '140px', 'rgba(245,184,200,0.7)')} />
      <div style={blobStyle('20%', '60%', '160px', 'rgba(200,184,245,0.6)')} />
      <div style={blobStyle('60%', '55%', '120px', 'rgba(245,197,144,0.65)')} />
      <div style={blobStyle('5%', '40%', '100px', 'rgba(245,233,122,0.5)')} />

      {/* Card */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          pointerEvents: 'all',
          background: 'rgba(255, 255, 240, 0.96)',
          backdropFilter: 'blur(18px)',
          borderRadius: '28px',
          boxShadow: '0 8px 48px rgba(0,0,0,0.10)',
          border: '1px solid rgba(200,200,160,0.4)',
          padding: '40px 48px 36px',
          width: '100%',
          maxWidth: '400px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
        }}
      >
        {/* Title */}
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          fontWeight: 800,
          color: 'var(--text-secondary)',
          marginBottom: 4,
          letterSpacing: '0.01em',
        }}>
          Account Settings
        </h2>

        {/* Avatar */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 88,
            height: 88,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #E8F8E4 0%, #FFF9C0 50%, #FFE8F0 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3.2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
            border: '3px solid rgba(255,255,255,0.8)',
            overflow: 'hidden',
          }}>
            {/* Try to show image asset, fallback to emoji/initials */}
            {/* <span style={{ lineHeight: 1 }}>🦉</span> */}
            <img
  src={owlMascot}
  alt="Owl"
  style={{
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  }}
/>
          </div>
          <button
            onClick={() => setEditing(true)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontFamily: 'var(--font-main)',
              textDecoration: 'underline',
              opacity: 0.75,
            }}
          >
            Edit Profile
          </button>
        </div>

        {/* Fields */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[
            { label: 'Name', name: 'name', placeholder: 'Your name' },
            { label: 'Email', name: 'email', placeholder: 'email@gmail.com', type: 'email' },
            { label: 'User ID', name: 'userId', placeholder: 'User ID' },
            { label: 'University', name: 'university', placeholder: 'University' },
          ].map(field => (
            <div key={field.name}>
              <label style={{
                display: 'block',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                marginBottom: 4,
                paddingLeft: 2,
              }}>
                {field.label}
              </label>
              <input
                type={field.type || 'text'}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                disabled={!editing && field.name !== 'university'}
                onFocus={() => setEditing(true)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: editing ? '#FFFFFF' : 'rgba(240,240,220,0.7)',
                  border: '1.5px solid',
                  borderColor: editing ? 'var(--accent-green-dark)' : 'rgba(200,200,160,0.5)',
                  borderRadius: '12px',
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-main)',
                  outline: 'none',
                  transition: 'all 0.2s',
                  boxSizing: 'border-box',
                  cursor: editing ? 'text' : 'pointer',
                }}
              />
            </div>
          ))}
        </div>

        {/* Save button */}
        <motion.button
          onClick={handleSave}
          disabled={saving}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            marginTop: 4,
            padding: '11px 40px',
            background: saved
              ? 'linear-gradient(135deg, #A8D5A2 0%, #7BBF74 100%)'
              : 'linear-gradient(135deg, rgba(220,220,180,0.9) 0%, rgba(200,200,150,0.9) 100%)',
            border: 'none',
            borderRadius: '99px',
            fontSize: '0.9rem',
            fontWeight: 700,
            color: saved ? '#fff' : 'var(--text-secondary)',
            cursor: saving ? 'wait' : 'pointer',
            fontFamily: 'var(--font-main)',
            boxShadow: saved
              ? '0 4px 16px rgba(123,191,116,0.35)'
              : '0 2px 8px rgba(0,0,0,0.07)',
            transition: 'all 0.25s',
          }}
        >
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </motion.button>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 16, right: 18,
            background: 'none', border: 'none',
            fontSize: '1.1rem', color: 'var(--text-muted)',
            cursor: 'pointer', borderRadius: '8px',
            padding: '4px 7px',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => e.target.style.background = 'var(--bg-input)'}
          onMouseLeave={e => e.target.style.background = 'none'}
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
}