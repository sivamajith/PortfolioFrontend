import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, Alert, CircularProgress, IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function AdminLogin() {
  const [form, setForm]     = useState({ username: '', password: '' });
  const [show, setShow]     = useState(false);
  const [loading, setLoad]  = useState(false);
  const [error, setError]   = useState('');
  const { login, user }     = useAuth();
  const { isDark }          = useTheme();
  const navigate            = useNavigate();

  const bgColor = isDark ? '#0C0C0C' : '#f5f5f5';
  const cardBg = isDark ? '#141414' : '#ffffff';
  const textColor = isDark ? '#F0EDE8' : '#1a1a1a';
  const secondaryText = isDark ? '#555' : '#999';
  const borderColor = isDark ? 'rgba(255,255,255,.07)' : 'rgba(0,0,0,.08)';
  const inputBg = isDark ? '#0a0a0a' : 'rgba(0,0,0,.02)';
  const inputBorder = isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)';

  useEffect(() => { if (user) navigate('/backstage/dashboard'); }, [user, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) { setError('Fill both fields'); return; }
    setLoad(true); setError('');
    try {
      await login(form.username.trim(), form.password);
      navigate('/backstage/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally { setLoad(false); }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: bgColor, position: 'relative', overflow: 'hidden' }}>
      {/* Glow */}
      <Box sx={{ position: 'absolute', top: '30%', left: '35%', width: 400, height: 400, borderRadius: '50%', background: isDark ? 'radial-gradient(circle,rgba(255,71,87,.08) 0%,transparent 70%)' : 'radial-gradient(circle,rgba(255,71,87,.04) 0%,transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <Box sx={{ width: '100%', maxWidth: 400, mx: 2.5, background: cardBg, border: `1px solid ${borderColor}`, borderRadius: '20px', p: { xs: 3, sm: 4.5 }, position: 'relative', zIndex: 1 }}>
        <Box sx={{ width: 52, height: 52, background: '#FF4757', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
          <Typography sx={{ fontSize: '1.4rem' }}>🔐</Typography>
        </Box>
        <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.3rem', color: textColor, mb: .5 }}>Admin Access</Typography>
        <Typography sx={{ color: secondaryText, fontSize: '.875rem', mb: 3.5 }}>This page is not publicly linked</Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2.5, background: isDark ? 'rgba(255,71,87,.08)' : 'rgba(255,71,87,.04)', border: '1px solid rgba(255,71,87,.2)', color: '#ff8a94', '& .MuiAlert-icon': { color: '#FF4757' } }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={submit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          <TextField label="Username" fullWidth value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} disabled={loading} InputLabelProps={{ sx: { color: secondaryText } }} inputProps={{ style: { color: textColor } }} sx={{ '& .MuiOutlinedInput-root': { backgroundColor: inputBg, '& fieldset': { borderColor: inputBorder }, '&:hover fieldset': { borderColor: '#FF4757' }, '&.Mui-focused fieldset': { borderColor: '#FF4757' } } }} />
          <TextField
            label="Password" type={show ? 'text' : 'password'} fullWidth
            value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            disabled={loading}
            InputLabelProps={{ sx: { color: secondaryText } }} inputProps={{ style: { color: textColor } }}
            InputProps={{ endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShow(s => !s)} sx={{ color: secondaryText }}>{show ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton></InputAdornment> }}
            sx={{ '& .MuiOutlinedInput-root': { backgroundColor: inputBg, '& fieldset': { borderColor: inputBorder }, '&:hover fieldset': { borderColor: '#FF4757' }, '&.Mui-focused fieldset': { borderColor: '#FF4757' } } }}
          />
          <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{ py: 1.5, mt: .5, background: '#FF4757', fontWeight: 700, fontSize: '.95rem', color: '#fff', '&:hover': { background: '#ff6473' }, '&:disabled': { background: isDark ? '#2a2a2a' : '#ddd', color: isDark ? '#555' : '#999' } }}>
            {loading ? <CircularProgress size={22} sx={{ color: isDark ? '#555' : '#999' }} /> : 'Login →'}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
