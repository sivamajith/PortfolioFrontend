import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Grid, Paper, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { motion } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';
import api from '../utils/api';

const ACCENT = '#FF4757';
const MotionBox = motion.create(Box);

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { isDark } = useTheme();

  const bgColor = isDark ? 'linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 100%)' : 'linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)';
  const textColor = isDark ? '#F0EDE8' : '#1a1a1a';
  const secondaryText = isDark ? '#666' : '#999';
  const inputBg = isDark ? '#141414' : '#ffffff';
  const inputBorder = isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)';
  const cardBg = isDark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.02)';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      toast.error('Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      await api.post('/contact', {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
        timestamp: new Date().toISOString()
      });
      
      toast.success('✓ Message sent! We\'ll get back to you soon');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Contact error:', error);
      toast.error(error.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: bgColor, py: 8, position: 'relative', overflow: 'hidden' }}>
      <Toaster />
      
      {/* Background animations */}
      <Box sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <MotionBox
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          sx={{ position: 'absolute', top: '10%', left: '10%', width: 300, height: 300, background: `${ACCENT}${isDark ? '08' : '04'}`, borderRadius: '50%', blur: '100px', filter: 'blur(100px)' }}
        />
        <MotionBox
          animate={{ y: [40, -40, 40] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          sx={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, background: `#4ECDC4${isDark ? '08' : '04'}`, borderRadius: '50%', filter: 'blur(100px)' }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={{ textAlign: 'center', mb: 6 }}
        >
          <MotionBox variants={itemVariants}>
            <Typography sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontFamily: 'Space Grotesk',
              fontWeight: 700,
              background: `linear-gradient(135deg, ${ACCENT}, #4ECDC4)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2
            }}>
              Get In Touch
            </Typography>
          </MotionBox>
          <MotionBox variants={itemVariants}>
            <Typography sx={{ fontSize: '1.1rem', color: secondaryText, maxWidth: 500, mx: 'auto' }}>
              Have a project in mind? Let's create something amazing together. Reach out and let's discuss your ideas.
            </Typography>
          </MotionBox>
        </MotionBox>

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={7}>
            <MotionBox
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              component={Paper}
              sx={{
                p: 4,
                background: isDark ? 'rgba(20, 20, 20, 0.8)' : 'rgba(255, 255, 255, 0.9)',
                border: `1px solid ${ACCENT}${isDark ? '20' : '15'}`,
                borderRadius: '16px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s'
              }}
            >
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      disabled={loading}
                      InputLabelProps={{ sx: { color: isDark ? '#555' : '#999' } }}
                      inputProps={{ style: { color: isDark ? '#F0EDE8' : '#1a1a1a' } }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: isDark ? '#F0EDE8' : '#1a1a1a',
                          backgroundColor: isDark ? '#0a0a0a' : 'rgba(0,0,0,.02)',
                          borderColor: `${ACCENT}30`,
                          '&:hover': { borderColor: `${ACCENT}50` },
                          '&.Mui-focused': { borderColor: ACCENT }
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      disabled={loading}
                      InputLabelProps={{ sx: { color: isDark ? '#555' : '#999' } }}
                      inputProps={{ style: { color: isDark ? '#F0EDE8' : '#1a1a1a' } }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          color: isDark ? '#F0EDE8' : '#1a1a1a',
                          backgroundColor: isDark ? '#0a0a0a' : 'rgba(0,0,0,.02)',
                          borderColor: `${ACCENT}30`,
                          '&:hover': { borderColor: `${ACCENT}50` },
                          '&.Mui-focused': { borderColor: ACCENT }
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)'
                        }
                      }}
                    />
                  </Grid>
                </Grid>

                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  disabled={loading}
                  InputLabelProps={{ sx: { color: isDark ? '#555' : '#999' } }}
                  inputProps={{ style: { color: isDark ? '#F0EDE8' : '#1a1a1a' } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: isDark ? '#F0EDE8' : '#1a1a1a',
                      backgroundColor: isDark ? '#0a0a0a' : 'rgba(0,0,0,.02)',
                      borderColor: `${ACCENT}30`,
                      '&:hover': { borderColor: `${ACCENT}50` },
                      '&.Mui-focused': { borderColor: ACCENT }
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)'
                    }
                  }}
                />

                <TextField
                  fullWidth
                  label="Message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  multiline
                  rows={5}
                  disabled={loading}
                  InputLabelProps={{ sx: { color: isDark ? '#555' : '#999' } }}
                  inputProps={{ style: { color: isDark ? '#F0EDE8' : '#1a1a1a' } }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      color: isDark ? '#F0EDE8' : '#1a1a1a',
                      backgroundColor: isDark ? '#0a0a0a' : 'rgba(0,0,0,.02)',
                      borderColor: `${ACCENT}30`,
                      '&:hover': { borderColor: `${ACCENT}50` },
                      '&.Mui-focused': { borderColor: ACCENT }
                    },
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: isDark ? 'rgba(255,255,255,.1)' : 'rgba(0,0,0,.1)'
                    }
                  }}
                />

                <MotionBox
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    endIcon={<SendIcon />}
                    sx={{
                      background: ACCENT,
                      color: '#fff',
                      fontWeight: 700,
                      py: 1.5,
                      fontSize: '1rem',
                      textTransform: 'none',
                      '&:hover': { background: ACCENT + 'dd' },
                      '&:disabled': { background: '#555', color: '#999' }
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </MotionBox>
              </form>
            </MotionBox>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={5}>
            <MotionBox
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
            >
              {/* Info Cards */}
              {[
                { icon: PhoneIcon, label: 'Phone', value: ' +91 9025155797', color: '#FF4757' },
                { icon: EmailIcon, label: 'Email', value: 'pravineshaloschool@gmail.com', color: '#4ECDC4' },
                { icon: LocationOnIcon, label: 'Location', value: 'Nagercoil, Tmail nadu', color: '#FFD166' }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <MotionBox
                    key={i}
                    variants={itemVariants}
                    component={Paper}
                    sx={{
                      p: 3,
                      background: isDark ? 'rgba(20, 20, 20, 0.6)' : 'rgba(255, 255, 255, 0.7)',
                      border: `1px solid ${item.color}${isDark ? '20' : '15'}`,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      '&:hover': {
                        background: isDark ? 'rgba(20, 20, 20, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                        border: `1px solid ${item.color}60`,
                        transform: 'translateX(8px)'
                      }
                    }}
                  >
                    <Box sx={{
                      width: 50,
                      height: 50,
                      borderRadius: '10px',
                      background: `${item.color}${isDark ? '15' : '0a'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Icon sx={{ fontSize: 24, color: item.color }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: '.8rem', color: isDark ? '#555' : '#999', textTransform: 'uppercase', letterSpacing: '.1em' }}>
                        {item.label}
                      </Typography>
                      <Typography sx={{ fontSize: '1rem', color: isDark ? '#F0EDE8' : '#1a1a1a', fontWeight: 600 }}>
                        {item.value}
                      </Typography>
                    </Box>
                  </MotionBox>
                );
              })}

              {/* Social Links */}
              <MotionBox variants={itemVariants} sx={{ mt: 4 }}>
                <Typography sx={{ fontSize: '.85rem', color: isDark ? '#555' : '#999', textTransform: 'uppercase', letterSpacing: '.1em', mb: 2 }}>
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  {[
                    { icon: LinkedInIcon, label: 'LinkedIn', color: '#0A66C2' },
                    { icon: TwitterIcon, label: 'Twitter', color: '#1DA1F2' },
                    { icon: GitHubIcon, label: 'GitHub', color: isDark ? '#999' : '#333' }
                  ].map((social, i) => {
                    const Icon = social.icon;
                    return (
                      <MotionBox
                        key={i}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconButton
                          sx={{
                            width: 48,
                            height: 48,
                            background: `${social.color}${isDark ? '15' : '0a'}`,
                            border: `1px solid ${social.color}30`,
                            color: social.color,
                            borderRadius: '10px',
                            '&:hover': {
                              background: `${social.color}${isDark ? '30' : '20'}`,
                              border: `1px solid ${social.color}60`
                            }
                          }}
                        >
                          <Icon fontSize="small" />
                        </IconButton>
                      </MotionBox>
                    );
                  })}
                </Box>
              </MotionBox>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
