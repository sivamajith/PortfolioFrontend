import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Grid, Chip, Button, Avatar, Paper, IconButton } from '@mui/material';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import ProjectCard from './ProjectCard';
import { useTheme } from '../context/ThemeContext';

const CAT_COLORS = { Branding:'#FF4757','UI/UX':'#4ECDC4',Motion:'#FFD166',Print:'#95E1D3',Photography:'#F38181',Illustration:'#AA96DA' };

// ─── Projects Section ───────────────────────────────────────────────────────
export function ProjectsSection({ projects }) {
  const [filter, setFilter] = useState('All');
  const { isDark } = useTheme();
  const cats = ['All', ...Object.keys(CAT_COLORS)];
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const bgColor = isDark ? '#0C0C0C' : '#f5f5f5';
  const textColor = isDark ? '#F0EDE8' : '#1a1a1a';
  const secondaryText = isDark ? '#555' : '#999';
  const chipBgHover = isDark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)';
  const chipBorder = isDark ? '1px solid rgba(255,255,255,.07)' : '1px solid rgba(0,0,0,.08)';

  return (
    <Box id="projects" sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 8, md: 12 }, background: bgColor }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', mb: 5, flexWrap: 'wrap', gap: 3 }}>
        <Box>
          <Typography sx={{ fontSize: '.72rem', color: secondaryText, letterSpacing: '.12em', textTransform: 'uppercase', mb: 1.5 }}>Selected Work</Typography>
          <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: { xs: '2rem', md: '3rem' }, color: textColor, letterSpacing: '-.03em', lineHeight: 1.1 }}>
            Projects &<br/><Box component="span" sx={{ color: 'transparent', WebkitTextStroke: isDark ? '1px rgba(255,255,255,.2)' : '1px rgba(0,0,0,.15)' }}>Case Studies</Box>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {cats.map(c => (
            <Chip key={c} label={c} onClick={() => setFilter(c)} data-cursor sx={{
              cursor: 'none', fontWeight: 600,
              background: filter === c ? (CAT_COLORS[c] || '#FF4757') : isDark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.04)',
              color: filter === c ? '#fff' : secondaryText,
              border: filter === c ? 'none' : chipBorder,
              '&:hover': { background: filter === c ? undefined : chipBgHover, color: filter === c ? undefined : textColor },
              transition: 'all .2s',
            }} />
          ))}
        </Box>
      </Box>

      {filtered.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10 }}>
          <Typography sx={{ color: secondaryText }}>No projects yet. Add from admin panel.</Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filtered.map((p, i) => (
            <Grid item xs={12} sm={6} md={p.featured ? 8 : 4} key={p._id} sx={{ display: 'flex' }}>
              <Box sx={{ flex: 1 }}><ProjectCard project={p} index={i} /></Box>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

// ─── Services Section ────────────────────────────────────────────────────────
export function ServicesSection({ services }) {
  const { isDark } = useTheme();
  const ICONS = { '💎': '💎', '🎨': '🎨', '🎬': '🎬', '📦': '📦', '✏️': '✏️', '📸': '📸' };
  if (!services?.length) return null;

  const bgColor = isDark ? '#0e0e0e' : '#f8f8f8';
  const textColor = isDark ? '#F0EDE8' : '#1a1a1a';
  const secondaryText = isDark ? '#555' : '#999';
  const cardBg = isDark ? '#141414' : '#ffffff';
  const borderColor = isDark ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.08)';
  const highlightBg = isDark ? 'rgba(255,71,87,.06)' : 'rgba(255,71,87,.04)';

  return (
    <Box id="services" sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 8, md: 12 }, background: bgColor, borderTop: `1px solid ${borderColor}` }}>
      <Box sx={{ mb: 6 }}>
        <Typography sx={{ fontSize: '.72rem', color: secondaryText, letterSpacing: '.12em', textTransform: 'uppercase', mb: 1.5 }}>What I Offer</Typography>
        <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: { xs: '2rem', md: '3rem' }, color: textColor, letterSpacing: '-.03em', lineHeight: 1.1 }}>
          Services &<br/><Box component="span" sx={{ color: 'transparent', WebkitTextStroke: isDark ? '1px rgba(255,255,255,.2)' : '1px rgba(0,0,0,.15)' }}>Solutions</Box>
        </Typography>
      </Box>

      <Grid container spacing={2}>
        {services.map((s, i) => (
          <Grid item xs={12} sm={6} md={3} key={s._id}>
            <Box sx={{
              p: 3, borderRadius: '18px', height: '100%',
              background: s.highlighted ? (isDark ? 'rgba(255,71,87,.06)' : 'rgba(255,71,87,.04)') : cardBg,
              border: s.highlighted ? (isDark ? '1px solid rgba(255,71,87,.25)' : '1px solid rgba(255,71,87,.15)') : `1px solid ${borderColor}`,
              position: 'relative', overflow: 'hidden',
              transition: 'all .3s',
              '&:hover': { transform: 'translateY(-4px)', boxShadow: isDark ? '0 20px 60px rgba(0,0,0,.5)' : '0 20px 60px rgba(0,0,0,.1)' },
            }}>
              {s.highlighted && (
                <Box sx={{ position: 'absolute', top: 14, right: 14, px: 1.5, py: .4, background: '#FF4757', borderRadius: '100px' }}>
                  <Typography sx={{ fontSize: '.6rem', color: '#fff', fontWeight: 700, letterSpacing: '.06em' }}>POPULAR</Typography>
                </Box>
              )}
              <Typography sx={{ fontSize: '2rem', mb: 2 }}>{s.icon || '✦'}</Typography>
              <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.1rem', color: textColor, mb: 1.5 }}>{s.title}</Typography>
              <Typography sx={{ color: secondaryText, fontSize: '.875rem', lineHeight: 1.7, mb: 2.5 }}>{s.description}</Typography>
              {s.features?.length > 0 && (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: .8, mb: 2.5 }}>
                  {s.features.slice(0, 4).map((f, fi) => (
                    <Box key={fi} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 4, height: 4, borderRadius: '50%', background: s.highlighted ? '#FF4757' : isDark ? '#444' : '#ccc', flexShrink: 0 }} />
                      <Typography sx={{ fontSize: '.8rem', color: isDark ? '#777' : '#888' }}>{f}</Typography>
                    </Box>
                  ))}
                </Box>
              )}
              {s.priceFrom && (
                <Box sx={{ mt: 'auto', pt: 2, borderTop: `1px solid ${borderColor}` }}>
                  <Typography sx={{ fontSize: '.7rem', color: isDark ? '#444' : '#ccc', textTransform: 'uppercase', letterSpacing: '.08em' }}>Starting from</Typography>
                  <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.2rem', color: s.highlighted ? '#FF4757' : textColor }}>{s.priceFrom}</Typography>
                </Box>
              )}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// ─── About Section ───────────────────────────────────────────────────────────
export function AboutSection({ profile, skills, awards }) {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: .1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const grouped = {};
  (skills || []).forEach(s => { if (!grouped[s.category]) grouped[s.category] = []; grouped[s.category].push(s); });

  const bgColor = isDark ? '#0C0C0C' : '#f5f5f5';
  const textColor = isDark ? '#F0EDE8' : '#1a1a1a';
  const secondaryText = isDark ? '#555' : '#999';
  const borderColor = isDark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.08)';
  const cardBg = isDark ? '#141414' : '#ffffff';

  return (
    <Box id="about" ref={ref} sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 8, md: 12 }, background: bgColor, borderTop: `1px solid ${borderColor}` }}>
      <Grid container spacing={{ xs: 4, md: 8 }} alignItems="flex-start">
        {/* Photo */}
        <Grid item xs={12} md={5} sx={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(-30px)', transition: 'all .8s ease' }}>
          <Box sx={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', aspectRatio: '4/5', background: cardBg, border: `1px solid ${borderColor}` }}>
            {profile?.photoUrl
              ? <Box component="img" src={profile.photoUrl} alt={profile.name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDark ? 'linear-gradient(135deg,#1a1a1a,#111)' : 'linear-gradient(135deg,#e0e0e0,#d0d0d0)', fontFamily: 'Space Grotesk', fontSize: '4rem', color: isDark ? '#2a2a2a' : '#bbb', fontWeight: 700 }}>{(profile?.name || 'P').charAt(0)}</Box>
            }
            <Box sx={{ position: 'absolute', inset: 0, background: isDark ? 'linear-gradient(to top,rgba(12,12,12,.8) 0%,transparent 50%)' : 'linear-gradient(to top,rgba(245,245,245,.5) 0%,transparent 50%)' }} />
            <Box sx={{ position: 'absolute', bottom: 20, left: 20 }}>
              <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.3rem', color: textColor }}>{profile?.name || 'Your Name'}</Typography>
              <Typography sx={{ fontSize: '.82rem', color: '#FF4757', mt: .3 }}>{profile?.title || 'Graphic Designer'}</Typography>
            </Box>
            {/* Awards badge */}
            {awards?.length > 0 && (
              <Box sx={{ position: 'absolute', top: 16, right: 16, px: 1.5, py: .7, background: isDark ? 'rgba(255,71,87,.1)' : 'rgba(255,71,87,.08)', border: '1px solid rgba(255,71,87,.25)', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: .7, backdropFilter: 'blur(8px)' }}>
                <Typography sx={{ fontSize: '1rem' }}>🏆</Typography>
                <Typography sx={{ fontSize: '.7rem', color: '#FF4757', fontWeight: 700 }}>{awards.length} Award{awards.length !== 1 ? 's' : ''}</Typography>
              </Box>
            )}
          </Box>
        </Grid>

        {/* Text */}
        <Grid item xs={12} md={7} sx={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(30px)', transition: 'all .8s ease .1s' }}>
          <Typography sx={{ fontSize: '.72rem', color: secondaryText, letterSpacing: '.12em', textTransform: 'uppercase', mb: 2 }}>About Me</Typography>
          <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: { xs: '2rem', md: '2.8rem' }, color: textColor, mb: 3, letterSpacing: '-.03em', lineHeight: 1.1 }}>
            Meet {profile?.name?.split(' ')[0] || 'Designer'}
          </Typography>
          <Typography sx={{ color: isDark ? '#777' : '#888', lineHeight: 1.85, fontSize: '.95rem', mb: 4, borderLeft: '2px solid rgba(255,71,87,.3)', pl: 2 }}>
            {profile?.bio || "I'm a passionate graphic designer creating visual experiences that communicate, inspire, and resonate with audiences."}
          </Typography>

          {/* Skills grouped */}
          {Object.entries(grouped).map(([cat, items]) => (
            <Box key={cat} sx={{ mb: 2.5 }}>
              <Typography sx={{ fontSize: '.68rem', color: isDark ? '#444' : '#bbb', letterSpacing: '.1em', textTransform: 'uppercase', mb: 1.2, fontWeight: 600 }}>{cat}</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: .8 }}>
                {items.map(s => (
                  <Chip key={s._id} label={s.name} size="small" sx={{ background: isDark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.04)', color: isDark ? '#aaa' : '#888', border: isDark ? '1px solid rgba(255,255,255,.08)' : '1px solid rgba(0,0,0,.08)', fontSize: '.76rem', cursor: 'default', '&:hover': { background: isDark ? 'rgba(255,71,87,.08)' : 'rgba(255,71,87,.05)', color: '#FF4757', border: isDark ? '1px solid rgba(255,71,87,.2)' : '1px solid rgba(255,71,87,.15)' }, transition: 'all .2s' }} />
                ))}
              </Box>
            </Box>
          ))}

          {/* Awards list */}
          {awards?.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography sx={{ fontSize: '.68rem', color: isDark ? '#444' : '#bbb', letterSpacing: '.1em', textTransform: 'uppercase', mb: 2 }}>Recognition</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {awards.slice(0, 3).map(a => (
                  <Box key={a._id} sx={{ display: 'flex', gap: 2, alignItems: 'center', p: 1.5, border: `1px solid ${borderColor}`, borderRadius: '12px', background: isDark ? 'rgba(255,71,87,.02)' : 'rgba(255,71,87,.01)' }}>
                    <Typography sx={{ fontSize: '1.2rem' }}>🏆</Typography>
                    <Box>
                      <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '.9rem', color: textColor }}>{a.title}</Typography>
                      <Typography sx={{ fontSize: '.75rem', color: isDark ? '#555' : '#999' }}>{a.organization} {a.year && `· ${a.year}`}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

// ─── Testimonials Section ────────────────────────────────────────────────────
export function TestimonialsSection({ testimonials }) {
  const { isDark } = useTheme();
  const [idx, setIdx] = useState(0);
  if (!testimonials?.length) return null;
  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx(i => (i + 1) % testimonials.length);
  const t = testimonials[idx];

  const bgColor = isDark ? '#0e0e0e' : '#f8f8f8';
  const textColor = isDark ? '#F0EDE8' : '#1a1a1a';
  const secondaryText = isDark ? '#555' : '#999';
  const cardBg = isDark ? '#141414' : '#ffffff';
  const borderColor = isDark ? 'rgba(255,255,255,.08)' : 'rgba(0,0,0,.08)';

  return (
    <Box sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 8, md: 12 }, background: bgColor, borderTop: `1px solid ${borderColor}` }}>
      <Box sx={{ mb: 6 }}>
        <Typography sx={{ fontSize: '.72rem', color: secondaryText, letterSpacing: '.12em', textTransform: 'uppercase', mb: 1.5 }}>Client Love</Typography>
        <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: { xs: '2rem', md: '3rem' }, color: textColor, letterSpacing: '-.03em' }}>
          Testimonials
        </Typography>
      </Box>

      <Box sx={{ maxWidth: 800, mx: 'auto', position: 'relative' }}>
        <Box sx={{ p: { xs: 3, md: 5 }, border: `1px solid ${borderColor}`, borderRadius: '20px', background: cardBg, minHeight: 240 }}>
          <Box sx={{ display: 'flex', gap: .4, mb: 3 }}>
            {[...Array(t.rating || 5)].map((_, i) => <StarIcon key={i} sx={{ fontSize: 16, color: '#FFD166' }} />)}
          </Box>
          <Typography sx={{ fontSize: { xs: '1rem', md: '1.15rem' }, color: textColor, lineHeight: 1.75, fontStyle: 'italic', mb: 4 }}>
            "{t.quote}"
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={t.photoUrl} sx={{ width: 44, height: 44, background: '#FF4757', fontFamily: 'Space Grotesk', fontWeight: 700 }}>
              {t.name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: textColor, fontSize: '.95rem' }}>{t.name}</Typography>
              <Typography sx={{ fontSize: '.8rem', color: isDark ? '#555' : '#999' }}>{t.role}{t.company ? ` · ${t.company}` : ''}</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
          <Typography sx={{ fontSize: '.8rem', color: isDark ? '#444' : '#bbb' }}>{idx + 1} / {testimonials.length}</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton onClick={prev} data-cursor sx={{ border: isDark ? '1px solid rgba(255,255,255,.1)' : '1px solid rgba(0,0,0,.1)', color: isDark ? '#888' : '#bbb', '&:hover': { color: textColor, borderColor: isDark ? 'rgba(255,255,white,.25)' : 'rgba(0,0,0,.25)' } }}><ArrowBackIcon sx={{ fontSize: 18 }} /></IconButton>
            <IconButton onClick={next} data-cursor sx={{ border: isDark ? '1px solid rgba(255,255,white,.1)' : '1px solid rgba(0,0,0,.1)', color: isDark ? '#888' : '#bbb', '&:hover': { color: textColor, borderColor: isDark ? 'rgba(255,255,white,.25)' : 'rgba(0,0,0,.25)' } }}><ArrowForwardIcon sx={{ fontSize: 18 }} /></IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// ─── Contact Section ─────────────────────────────────────────────────────────
export function ContactSection({ profile }) {
  const { isDark } = useTheme();
  const bgColor = isDark ? '#0C0C0C' : '#f5f5f5';
  const textColor = isDark ? '#F0EDE8' : '#1a1a1a';
  const secondaryText = isDark ? '#444' : '#bbb';
  const borderColor = isDark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.08)';
  const buttonBgHover = isDark ? '#ff6473' : '#ff5a6a';
  const buttonBorderColor = isDark ? 'rgba(255,255,255,.15)' : 'rgba(0,0,0,.15)';

  return (
    <Box id="contact" sx={{ px: { xs: 2.5, md: 6 }, py: { xs: 10, md: 16 }, background: bgColor, borderTop: `1px solid ${borderColor}`, position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
      <Box sx={{ position: 'absolute', inset: 0, filter: 'blur(100px)', opacity: .1, pointerEvents: 'none' }}>
        <Box sx={{ position: 'absolute', top: '20%', left: '15%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,71,87,.9) 0%,transparent 70%)', animation: 'blob1 22s infinite ease-in-out' }} />
        <Box sx={{ position: 'absolute', top: '30%', right: '15%', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,71,87,.6) 0%,transparent 70%)', animation: 'blob2 28s infinite ease-in-out' }} />
      </Box>

      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 680, mx: 'auto' }}>
        {profile?.availableForWork && (
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: .75, border: '1px solid rgba(255,71,87,.3)', borderRadius: '100px', mb: 4 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#FF4757', animation: 'pulse 2s infinite' }} />
            <Typography sx={{ fontSize: '.78rem', color: '#FF4757', fontWeight: 600 }}>Available For Projects</Typography>
          </Box>
        )}

        <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: { xs: '2rem', sm: '2.8rem', md: '3.8rem' }, color: textColor, lineHeight: 1.15, letterSpacing: '-.03em', mb: 4 }}>
          Let's create something{' '}
          <Box component="span" sx={{ color: 'transparent', WebkitTextStroke: isDark ? '1px rgba(255,71,87,.6)' : '1px rgba(255,71,87,.4)' }}>extraordinary</Box>
          {' '}together
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', mb: 5 }}>
          <Button variant="contained" href={profile?.email ? `mailto:${profile.email}` : '#'} endIcon={<NorthEastIcon />} sx={{ background: '#FF4757', px: 4, py: 1.5, fontSize: '.95rem', fontWeight: 700, '&:hover': { background: buttonBgHover, transform: 'translateY(-2px)', boxShadow: `0 12px 40px rgba(255,71,87,.${isDark ? '4' : '2'})` }, transition: 'all .3s' }}>
            Start a Project
          </Button>
          {profile?.resumeUrl && (
            <Button variant="outlined" href={profile.resumeUrl} target="_blank" sx={{ borderColor: buttonBorderColor, color: isDark ? '#888' : '#999', px: 4, py: 1.5, '&:hover': { borderColor: isDark ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.35)', color: textColor } }}>
              Download CV
            </Button>
          )}
        </Box>

        {profile?.email && <Typography sx={{ color: isDark ? '#444' : '#bbb', fontSize: '.9rem', mb: 4 }}>{profile.email}</Typography>}

        <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center' }}>
          {[['behance','Be'],['dribbble','Dr'],['instagram','Ig'],['linkedin','Li'],['github','GH'],['twitter','X']].filter(([k]) => profile?.[k]).map(([k, l]) => (
            <Box key={k} component="a" href={profile[k]} target="_blank" rel="noopener noreferrer" sx={{ fontSize: '.82rem', color: isDark ? '#444' : '#bbb', textDecoration: 'none', fontWeight: 700, letterSpacing: '.05em', '&:hover': { color: textColor }, transition: 'color .2s' }}>{l}</Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
export function Footer({ profile }) {
  const { isDark } = useTheme();
  const footerBg = isDark ? '#080808' : '#f0f0f0';
  const borderColor = isDark ? '1px solid rgba(255,255,white,.05)' : '1px solid rgba(0,0,0,.08)';
  const textColor = isDark ? '#F0EDE8' : '#1a1a1a';
  const secondaryText = isDark ? '#444' : '#888';
  const tertiaryText = isDark ? '#555' : '#999';
  const linkHoverColor = isDark ? '#F0EDE8' : '#1a1a1a';

  const go = id => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  return (
    <Box component="footer" sx={{ background: footerBg, borderTop: borderColor, px: { xs: 3, md: 6 }, pt: 7, pb: 4 }}>
      <Grid container spacing={4} sx={{ mb: 5 }}>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <Box sx={{ width: 34, height: 34, background: '#FF4757', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography sx={{ fontSize: '.85rem', fontWeight: 700, color: '#fff', fontFamily: 'Space Grotesk' }}>{(profile?.name || 'P').charAt(0)}</Typography>
            </Box>
            <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1rem', color: textColor }}>{profile?.name || 'Portfolio'}</Typography>
          </Box>
          <Typography sx={{ color: secondaryText, fontSize: '.87rem', lineHeight: 1.7, mb: 3, maxWidth: 280 }}>{profile?.title || 'Graphic Designer'} — crafting visual experiences that leave lasting impressions.</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[['behance','Be'],['dribbble','Dr'],['instagram','Ig'],['linkedin','Li']].filter(([k]) => profile?.[k]).map(([k, l]) => (
              <Box key={k} component="a" href={profile[k]} target="_blank" rel="noopener noreferrer" sx={{ width: 36, height: 36, borderRadius: '9px', border: isDark ? '1px solid rgba(255,255,white,.08)' : '1px solid rgba(0,0,0,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.72rem', color: tertiaryText, fontWeight: 700, textDecoration: 'none', transition: 'all .2s', '&:hover': { color: linkHoverColor, borderColor: isDark ? 'rgba(255,255,white,.2)' : 'rgba(0,0,0,.2)', background: isDark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.04)' } }}>{l}</Box>
            ))}
          </Box>
        </Grid>
        {[
          { title: 'Navigate', links: [{ l: 'Work', id: '#projects' }, { l: 'Services', id: '#services' }, { l: 'About', id: '#about' }, { l: 'Contact', id: '#contact' }] },
          { title: 'Contact', links: profile?.email ? [{ l: profile.email, href: `mailto:${profile.email}` }, { l: profile.location || 'Chennai, India' }] : [] },
        ].map(col => (
          <Grid item xs={6} md={2} key={col.title}>
            <Typography sx={{ fontSize: '.67rem', color: isDark ? '#333' : '#999', letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 600, mb: 2 }}>{col.title}</Typography>
            {col.links.map((l, i) => (
              <Typography key={i} component={l.href ? 'a' : 'span'} href={l.href} onClick={l.id ? () => go(l.id) : undefined} sx={{ display: 'block', fontSize: '.87rem', color: secondaryText, textDecoration: 'none', mb: 1, cursor: l.id ? 'none' : 'default', '&:hover': l.id || l.href ? { color: linkHoverColor } : {}, transition: 'color .2s' }}>{l.l}</Typography>
            ))}
          </Grid>
        ))}
        <Grid item xs={12} md={4}>
          <Box onClick={() => go('#contact')} data-cursor sx={{ p: 2.5, border: isDark ? '1px solid rgba(255,71,87,.07)' : '1px solid rgba(255,71,87,.15)', borderRadius: '16px', cursor: 'none', background: isDark ? 'rgba(255,71,87,.02)' : 'rgba(255,71,87,.01)', transition: 'all .3s', '&:hover': { background: isDark ? 'rgba(255,71,87,.06)' : 'rgba(255,71,87,.04)', borderColor: isDark ? 'rgba(255,71,87,.2)' : 'rgba(255,71,87,.3)', transform: 'translateY(-2px)' } }}>
            <NorthEastIcon sx={{ color: '#FF4757', mb: 1.5 }} />
            <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: textColor, fontSize: '.9rem', lineHeight: 1.4, mb: .5 }}>Ready to start a project?</Typography>
            <Typography sx={{ fontSize: '.8rem', color: isDark ? '#555' : '#999' }}>Let's talk about your vision</Typography>
          </Box>
        </Grid>
      </Grid>
      <Box sx={{ borderTop: isDark ? '1px solid rgba(255,255,white,.04)' : '1px solid rgba(0,0,0,.08)', pt: 3, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
        <Typography sx={{ fontSize: '.78rem', color: isDark ? '#2a2a2a' : '#999' }}>© {new Date().getFullYear()} {profile?.name || 'Portfolio'}. All rights reserved.</Typography>
        <Typography sx={{ fontSize: '.78rem', color: isDark ? '#1a1a1a' : '#999' }}>React · Node.js · MongoDB · Cloudinary</Typography>
      </Box>
    </Box>
  );
}
