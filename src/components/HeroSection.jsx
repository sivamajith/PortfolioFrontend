import React, { useEffect, useState, Suspense } from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import DownloadIcon from '@mui/icons-material/Download';
import { useTheme } from '../context/ThemeContext';

const CATEGORY_COLORS = { Branding: '#FF4757', 'UI/UX': '#4ECDC4', Motion: '#FFD166', Print: '#95E1D3', Photography: '#F38181', Illustration: '#AA96DA' };

export default function HeroSection({ profile, projects }) {
  const [v, setV] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => { 
    setTimeout(() => setV(true), 80); 
    // Add animations to document
    const style = document.createElement('style');
    style.textContent = `
      @keyframes blob1 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
      }
      @keyframes blob2 {
        0%, 100% { transform: translate(0, 0) scale(1); }
        33% { transform: translate(-30px, 50px) scale(0.9); }
        66% { transform: translate(20px, -20px) scale(1.1); }
      }
      @keyframes ticker {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const go = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  const tickers = profile?.tickerItems?.length ? profile.tickerItems : ['Branding', 'UI/UX', 'Motion Design', 'Typography', 'Visual Identity', 'Print Design', 'Photography', 'Illustration'];
  const doubled = [...tickers, ...tickers, ...tickers, ...tickers];

  // Show top 3 featured or latest projects as floating cards
  const featured = projects?.slice(0, 3) || [];

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden', background: '#0C0C0C', pt: { xs: 12, md: 10 }, pb: 10 }}>

      {/* Background noise texture */}
      <Box sx={{ position: 'absolute', inset: 0, opacity: .025, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px', pointerEvents: 'none' }} />

      {/* Glow spots */}
      <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: '10%', left: '-5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,71,87,.08) 0%, transparent 70%)', filter: 'blur(60px)', animation: 'blob1 22s infinite ease-in-out' }} />
        <Box sx={{ position: 'absolute', bottom: '10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,71,87,.06) 0%, transparent 70%)', filter: 'blur(80px)', animation: 'blob2 28s infinite ease-in-out' }} />
      </Box>

      {/* Main content */}
      <Grid container sx={{ maxWidth: 1300, mx: 'auto', px: { xs: 3, md: 6 }, zIndex: 1, position: 'relative' }} alignItems="center" spacing={{ xs: 6, md: 4 }}>

        {/* LEFT */}
        <Grid item xs={12} md={6}>
          {/* Available badge */}
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.5, py: .6, border: '1px solid rgba(255,71,87,.2)', borderRadius: '100px', mb: 3, opacity: v ? 1 : 0, transform: v ? 'translateY(0)' : 'translateY(16px)', transition: 'all .7s ease' }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#FF4757', animation: 'pulse 2s infinite' }} />
            <Typography sx={{ fontSize: '.75rem', color: '#FF4757', fontWeight: 600, letterSpacing: '.06em' }}>
              {profile?.heroTagline || 'Visual Storyteller'}
            </Typography>
          </Box>

          {/* Big title */}
          <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: { xs: '3.5rem', sm: '5rem', md: '6rem', lg: '7rem' }, lineHeight: .92, letterSpacing: '-.04em', color: '#F0EDE8', mb: 3, opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(50px)', transition: 'all .85s ease .1s' }}>
            {(profile?.title || 'GRAPHIC DESIGNER').toUpperCase()}
          </Typography>

          <Typography sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, color: '#666', lineHeight: 1.75, mb: 5, maxWidth: 480, opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(30px)', transition: 'all .85s ease .2s' }}>
            {profile?.subtitle || 'Creating visual experiences that communicate, inspire, and leave a lasting impression.'}
          </Typography>

          {/* CTAs */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 6, opacity: v ? 1 : 0, transition: 'all .85s ease .3s' }}>
            <Button variant="contained" endIcon={<NorthEastIcon />} onClick={() => go('#projects')} sx={{ background: '#FF4757', px: 4, py: 1.5, fontSize: '.95rem', fontWeight: 700, '&:hover': { background: '#ff6473', transform: 'translateY(-2px)', boxShadow: '0 12px 40px rgba(255,71,87,.35)' }, transition: 'all .3s' }}>
              View Work
            </Button>
            {profile?.resumeUrl ? (
              <Button variant="outlined" href={profile.resumeUrl} target="_blank" startIcon={<DownloadIcon />} sx={{ borderColor: 'rgba(255,255,255,.15)', color: '#888', px: 3.5, py: 1.5, '&:hover': { borderColor: 'rgba(255,255,255,.35)', color: '#F0EDE8' } }}>
                Download CV
              </Button>
            ) : (
              <Button variant="outlined" onClick={() => go('#contact')} sx={{ borderColor: 'rgba(255,255,255,.15)', color: '#888', px: 3.5, py: 1.5, '&:hover': { borderColor: 'rgba(255,255,255,.35)', color: '#F0EDE8' } }}>
                Let's Talk
              </Button>
            )}
          </Box>

          {/* Stats */}
          <Box sx={{ display: 'flex', gap: 4, opacity: v ? 1 : 0, transition: 'all .85s ease .4s' }}>
            {[{ v: profile?.yearsExp || '3+', l: 'Years' }, { v: profile?.projectsCount || '50+', l: 'Projects' }, { v: profile?.brandsCount || '20+', l: 'Brands' }].map(s => (
              <Box key={s.l}>
                <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '2rem', color: '#F0EDE8', lineHeight: 1 }}>{s.v}</Typography>
                <Typography sx={{ fontSize: '.72rem', color: '#444', mt: .4, letterSpacing: '.1em', textTransform: 'uppercase' }}>{s.l}</Typography>
              </Box>
            ))}
          </Box>
        </Grid>

        {/* RIGHT - Profile image + floating project cards */}
        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', alignItems: 'center', opacity: v ? 1 : 0, transition: 'all 1s ease .25s' }}>
          <Box sx={{ position: 'relative', width: 420, height: 500 }}>
            {/* Main photo */}
            <Box sx={{ width: '75%', height: '90%', ml: 'auto', borderRadius: '20px', overflow: 'hidden', background: '#1a1a1a', border: '1px solid rgba(255,255,255,.07)', position: 'relative' }}>
              {profile?.photoUrl ? (
                <Box component="img" src={profile.photoUrl} alt={profile.name} sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              ) : (
                <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#1c1c1c,#111)', fontSize: '5rem', fontFamily: 'Space Grotesk', fontWeight: 700, color: '#2a2a2a' }}>
                  {(profile?.name || 'P').charAt(0)}
                </Box>
              )}
              <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,12,12,.7) 0%, transparent 50%)' }} />
              <Box sx={{ position: 'absolute', bottom: 16, left: 16 }}>
                <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.1rem', color: '#F0EDE8' }}>{profile?.name || 'Your Name'}</Typography>
                <Typography sx={{ fontSize: '.8rem', color: '#FF4757' }}>{profile?.title || 'Graphic Designer'}</Typography>
              </Box>
            </Box>



            {/* Category tags floating */}
            <Box sx={{ position: 'absolute', top: 100, left: -20, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {(profile?.specializations?.slice(0, 3) || ['Branding', 'UI/UX', 'Motion']).map((s, i) => (
                <Box key={s} sx={{ px: 1.5, py: .6, background: '#141414', border: '1px solid rgba(255,255,255,.08)', borderRadius: '100px', animation: `float ${4 + i}s ease-in-out ${i * .5}s infinite` }}>
                  <Typography sx={{ fontSize: '.7rem', color: CATEGORY_COLORS[s] || '#888', fontWeight: 600 }}>{s}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Ticker */}
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, borderTop: '1px solid rgba(255,255,255,.05)', py: 1.2, overflow: 'hidden', background: 'rgba(255,255,255,.015)' }}>
        <Box sx={{ display: 'flex', width: 'max-content', animation: 'ticker 35s linear infinite', '&:hover': { animationPlayState: 'paused' } }}>
          {doubled.map((item, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, mx: 3 }}>
              <Box sx={{ width: 5, height: 5, borderRadius: '50%', background: i % 4 === 0 ? '#FF4757' : 'rgba(255,255,255,.15)', flexShrink: 0 }} />
              <Typography sx={{ fontSize: '.72rem', color: '#333', fontWeight: 500, letterSpacing: '.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{item}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
