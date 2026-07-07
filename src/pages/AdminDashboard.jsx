import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Grid, Paper, Button, IconButton, TextField, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, CircularProgress,
  Alert, Snackbar, Avatar, Divider, Switch, FormControlLabel,
  LinearProgress, Tooltip, Tab, Tabs,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import RefreshIcon from '@mui/icons-material/Refresh';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import HomeIcon from '@mui/icons-material/Home';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../utils/api';
import absUrl from '../utils/urls';

const ACCENT = '#FF4757';
const SECTIONS = [
  { id: 'overview',      label: 'Overview',      emoji: '📊' },
  { id: 'images',        label: 'Images',         emoji: '🖼️' },
  { id: 'videos',        label: 'Videos',         emoji: '🎬' },
  { id: 'projects',      label: 'Projects',       emoji: '📁' },
  { id: 'messages',      label: 'Messages',       emoji: '💌' },
  { id: 'services',      label: 'Services',       emoji: '💎' },
  { id: 'testimonials',  label: 'Testimonials',   emoji: '💬' },
  { id: 'awards',        label: 'Awards',         emoji: '🏆' },
  { id: 'skills',        label: 'Skills',         emoji: '🛠️' },
  { id: 'visitors',      label: 'Visitors',       emoji: '👁️' },
  { id: 'profile',       label: 'Profile',        emoji: '👤' },
];

function useToast() {
  const [t, setT] = useState({ open: false, msg: '', type: 'success' });
  return { toast: t, show: (msg, type = 'success') => setT({ open: true, msg, type }), hide: () => setT(p => ({ ...p, open: false })) };
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate         = useNavigate();
  const { toast, show, hide } = useToast();
  const [section, setSec] = useState('overview');
  const [collapsed, setCol] = useState(false);
  const [allData, setAll] = useState({ projects: [], skills: [], visitors: { visitors: [], total: 0, today: 0, thisWeek: 0, uniqueVisitors: 0 }, profile: null, services: [], testimonials: [], awards: [], messages: [] });

  // Theme variables
  const bgColor = isDark ? '#0b0b0b' : '#f5f5f5';
  const sidebarBg = isDark ? '#0f0f0f' : '#fff';
  const cardBg = isDark ? '#141414' : '#fff';
  const textColor = isDark ? '#F0EDE8' : '#1a1a1a';
  const secondaryText = isDark ? '#555' : '#999';
  const borderColor = isDark ? 'rgba(255,255,white,.06)' : 'rgba(0,0,0,.08)';
  const inputBg = isDark ? 'rgba(255,255,255,.05)' : 'rgba(0,0,0,.02)';
  const inputBorder = isDark ? 'rgba(255,255,white,.1)' : 'rgba(0,0,0,.12)';

  const refresh = async () => {
    try {
      const [pr, pj, sk, vis, sv, tm, aw, msg] = await Promise.all([
        api.get('/profile'), api.get('/projects'), api.get('/skills'),
        api.get('/visitors'), api.get('/services'), api.get('/testimonials'), api.get('/awards'), api.get('/contact'),
      ]);
      setAll({ profile: pr.data, projects: pj.data, skills: sk.data, visitors: vis.data, services: sv.data, testimonials: tm.data, awards: aw.data, messages: msg.data });
    } catch { show('Failed to load', 'error'); }
  };

  useEffect(() => { refresh(); }, []);

  const images = allData.projects.filter(p => p.mediaType === 'image');
  const videos = allData.projects.filter(p => p.mediaType === 'video');

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: bgColor }}>
      {/* Sidebar */}
      <Box sx={{ width: collapsed ? 60 : 210, flexShrink: 0, background: sidebarBg, borderRight: `1px solid ${borderColor}`, display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, transition: 'width .3s', overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', gap: 1.5, minHeight: 60 }}>
          <Box onClick={() => setCol(c => !c)} sx={{ width: 30, height: 30, background: ACCENT, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0 }}>
            <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '.75rem', color: '#fff' }}>{(allData.profile?.name || 'A').charAt(0)}</Typography>
          </Box>
          {!collapsed && <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '.9rem', color: textColor, whiteSpace: 'nowrap' }}>Admin Panel</Typography>}
        </Box>

        <Box sx={{ flex: 1, py: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          {SECTIONS.map(s => (
            <Tooltip key={s.id} title={collapsed ? s.label : ''} placement="right">
              <Box onClick={() => setSec(s.id)} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1.5, py: 1.1, mx: 1, borderRadius: '10px', cursor: 'pointer', mb: .25, background: section === s.id ? `${ACCENT}12` : 'transparent', color: section === s.id ? ACCENT : secondaryText, '&:hover': { background: isDark ? 'rgba(255,255,255,.04)' : 'rgba(0,0,0,.04)', color: '#888' }, transition: 'all .2s' }}>
                <Box sx={{ fontSize: 16, flexShrink: 0 }}>{s.emoji}</Box>
                {!collapsed && <Typography sx={{ fontSize: '.82rem', fontWeight: 500, whiteSpace: 'nowrap' }}>{s.label}</Typography>}
              </Box>
            </Tooltip>
          ))}
        </Box>

        <Box sx={{ p: 1.5, borderTop: '1px solid rgba(255,255,255,.05)' }}>
          {[{ icon: '🌐', label: 'View Site', action: () => window.open('/', '_blank') }, { icon: '🚪', label: 'Logout', action: () => { logout(); navigate('/backstage'); }, danger: true }].map(b => (
            <Tooltip key={b.label} title={collapsed ? b.label : ''} placement="right">
              <Box onClick={b.action} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1.5, py: 1, borderRadius: '10px', cursor: 'pointer', mb: .3, color: b.danger ? '#ff6060' : secondaryText, '&:hover': { background: b.danger ? 'rgba(255,60,60,.05)' : isDark ? 'rgba(255,255,white,.03)' : 'rgba(0,0,0,.03)', color: b.danger ? '#ff8080' : '#888' } }}>
                <Box sx={{ fontSize: 15, flexShrink: 0 }}>{b.icon}</Box>
                {!collapsed && <Typography sx={{ fontSize: '.8rem', whiteSpace: 'nowrap' }}>{b.label}</Typography>}
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ flex: 1, ml: collapsed ? '60px' : '210px', transition: 'margin .3s', minHeight: '100vh' }}>
        {/* Topbar */}
        <Box sx={{ px: 3, py: 2, borderBottom: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: bgColor, position: 'sticky', top: 0, zIndex: 50 }}>
          <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '1.05rem', color: textColor, textTransform: 'capitalize' }}>
            {SECTIONS.find(s => s.id === section)?.emoji} {SECTIONS.find(s => s.id === section)?.label}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <IconButton onClick={refresh} sx={{ color: secondaryText, '&:hover': { color: isDark ? '#888' : '#666' } }}><RefreshIcon sx={{ fontSize: 18 }} /></IconButton>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: ACCENT, boxShadow: `0 0 6px ${ACCENT}` }} />
              <Typography sx={{ fontSize: '.78rem', color: secondaryText }}>{user?.username}</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ p: 3 }}>
          {section === 'overview'     && <Overview data={allData} setSec={setSec} />}
          {section === 'images'       && <MediaMgr type="image"  items={images}              onRefresh={refresh} show={show} />}
          {section === 'videos'       && <MediaMgr type="video"  items={videos}              onRefresh={refresh} show={show} />}
          {section === 'projects'     && <ProjectsMgr           items={allData.projects}     onRefresh={refresh} show={show} />}
          {section === 'messages'     && <MessagesMgr           items={allData.messages}     onRefresh={refresh} show={show} />}
          {section === 'services'     && <ServicesMgr            items={allData.services}    onRefresh={refresh} show={show} />}
          {section === 'testimonials' && <TestimonialsMgr        items={allData.testimonials}onRefresh={refresh} show={show} />}
          {section === 'awards'       && <AwardsMgr              items={allData.awards}      onRefresh={refresh} show={show} />}
          {section === 'skills'       && <SkillsMgr              items={allData.skills}      onRefresh={refresh} show={show} />}
          {section === 'visitors'     && <VisitorsMgr            data={allData.visitors}     onRefresh={refresh} show={show} />}
          {section === 'profile'      && <ProfileMgr             profile={allData.profile}   setProfile={p => setAll(a => ({ ...a, profile: p }))} show={show} />}
        </Box>
      </Box>

      <Snackbar open={toast.open} autoHideDuration={3500} onClose={hide} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={toast.type} onClose={hide} sx={{ background: toast.type === 'success' ? `${ACCENT}12` : 'rgba(255,60,60,.1)', border: `1px solid ${toast.type === 'success' ? ACCENT + '30' : 'rgba(255,60,60,.25)'}`, color: toast.type === 'success' ? ACCENT : '#ff8080', '& .MuiAlert-icon': { color: toast.type === 'success' ? ACCENT : '#ff6060' } }}>
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}

/* ── Overview ─────────────────────────────────────────── */
function Overview({ data, setSec }) {
  const { projects, skills, visitors, services, testimonials, awards } = data;
  const stats = [
    { label: 'Total Projects', value: projects.length, color: ACCENT, sub: `${projects.filter(p=>p.mediaType==='video').length} videos`, go: 'images' },
    { label: 'Total Visitors', value: visitors.total||0, color: '#4ECDC4', sub: `${visitors.today||0} today`, go: 'visitors' },
    { label: 'Unique IPs',     value: visitors.uniqueVisitors||0, color: '#FFD166', sub: `${visitors.thisWeek||0} this week` },
    { label: 'Services',       value: services.length, color: '#95E1D3', sub: `${testimonials.length} testimonials`, go: 'services' },
  ];
  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map(s => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <Paper onClick={s.go ? () => setSec(s.go) : undefined} sx={{ p: 2.5, cursor: s.go ? 'pointer' : 'default', '&:hover': s.go ? { border: '1px solid rgba(255,255,255,.1)', transform: 'translateY(-2px)' } : {}, transition: 'all .2s' }}>
              <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '2.2rem', color: '#F0EDE8', lineHeight: 1 }}>{s.value}</Typography>
              <Typography sx={{ fontSize: '.78rem', color: '#555', mt: .5 }}>{s.label}</Typography>
              <Typography sx={{ fontSize: '.7rem', color: s.color, mt: .3 }}>{s.sub}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2.5 }}>
            <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#F0EDE8', mb: 2, fontSize: '.9rem' }}>Recent Visitors</Typography>
            {visitors.visitors?.slice(0, 7).map((v, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: .9, borderBottom: i < 6 ? '1px solid rgba(255,255,255,.03)' : 'none' }}>
                <Box sx={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />
                <Typography sx={{ fontSize: '.78rem', color: '#888', flex: 1 }}>{v.ip}</Typography>
                <Chip label={v.browser || '?'} size="small" sx={{ fontSize: '.62rem', height: 18, background: 'rgba(255,255,255,.03)', color: '#555', border: '1px solid rgba(255,255,255,.06)' }} />
                <Typography sx={{ fontSize: '.7rem', color: '#444' }}>{new Date(v.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography>
              </Box>
            ))}
            {!visitors.visitors?.length && <Typography sx={{ color: '#444', fontSize: '.85rem', textAlign: 'center', py: 2 }}>No visitors yet</Typography>}
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2.5 }}>
            <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#F0EDE8', mb: 2, fontSize: '.9rem' }}>Content Summary</Typography>
            {[
              { l: 'Image Projects', v: projects.filter(p=>p.mediaType==='image').length, c: ACCENT },
              { l: 'Video Projects', v: projects.filter(p=>p.mediaType==='video').length, c: '#4ECDC4' },
              { l: 'Featured Works', v: projects.filter(p=>p.featured).length, c: '#FFD166' },
              { l: 'Skills Listed',  v: skills.length, c: '#95E1D3' },
              { l: 'Awards/Certs',   v: awards.length, c: '#AA96DA' },
            ].map(item => (
              <Box key={item.l} sx={{ mb: 1.8 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: .5 }}>
                  <Typography sx={{ fontSize: '.75rem', color: '#666' }}>{item.l}</Typography>
                  <Typography sx={{ fontSize: '.75rem', color: '#888' }}>{item.v}</Typography>
                </Box>
                <LinearProgress variant="determinate" value={Math.min((item.v / Math.max(projects.length || 1, 1)) * 100, 100)} sx={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,.04)', '& .MuiLinearProgress-bar': { background: item.c } }} />
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

/* ── Media Manager (Images + Videos) ─────────────────── */
function MediaMgr({ type, items, onRefresh, show }) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [uploading, setUpl] = useState(false);
  const [upPct, setUpPct] = useState(0);
  const fileRef = useRef(null);
  const isVideo = type === 'video';
  const accent = isVideo ? '#4ECDC4' : ACCENT;

  const CATS = ['Branding', 'UI/UX', 'Motion', 'Print', 'Photography', 'Illustration', 'Other'];

  const blank = { title: '', description: '', fullDescription: '', category: CATS[0], mediaUrl: '', publicId: '', thumbnailUrl: '', colorPalette: '', tools: '', tags: '', client: '', year: new Date().getFullYear().toString(), featured: false, link: '' };
  const [form, setForm] = useState(blank);
  const f = k => ({ value: form[k] || '', onChange: e => setForm(p => ({ ...p, [k]: e.target.value })), InputLabelProps: { sx: { color: '#555' } }, inputProps: { style: { color: '#F0EDE8' } }, fullWidth: true });

  const openAdd  = () => { setForm(blank); setEdit(null); setOpen(true); };
  const openEdit = p  => { setForm({ ...p, colorPalette: (p.colorPalette||[]).join(', '), tools: (p.tools||[]).join(', '), tags: (p.tags||[]).join(', ') }); setEdit(p); setOpen(true); };

  const upload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    setUpl(true); setUpPct(5);
    try {
      const fd = new FormData(); fd.append('file', file);
      // Don't set Content-Type header - axios will set it automatically with boundary
      const r = await api.post('/upload', fd, { onUploadProgress: ev => setUpPct(Math.round(ev.loaded / ev.total * 88)) });
      setUpPct(100);
      setForm(p => ({ ...p, mediaUrl: r.data.url, publicId: r.data.publicId || '', thumbnailUrl: r.data.thumbnailUrl || '' }));
      show('Uploaded to Cloudinary ✓');
    } catch (e) { 
      console.error('Upload error:', e);
      show(e.response?.data?.message || e.message || 'Upload failed', 'error'); 
    }
    finally { setUpl(false); setTimeout(() => setUpPct(0), 800); }
  };

  const save = async () => {
    if (!form.title.trim()) { show('Title required', 'error'); return; }
    if (!form.mediaUrl.trim()) { show('Upload a file first', 'error'); return; }
    try {
      const payload = { ...form, mediaType: type, colorPalette: form.colorPalette.split(',').map(x=>x.trim()).filter(Boolean), tools: form.tools.split(',').map(x=>x.trim()).filter(Boolean), tags: form.tags.split(',').map(x=>x.trim()).filter(Boolean) };
      if (edit) await api.put(`/projects/${edit._id}`, payload);
      else      await api.post('/projects', payload);
      show(edit ? 'Updated ✓' : 'Added ✓'); setOpen(false); onRefresh();
    } catch (e) { show(e.response?.data?.message || 'Save failed', 'error'); }
  };

  const del = async p => {
    if (!window.confirm(`Delete "${p.title}"?`)) return;
    try { 
      console.log('🗑️ Deleting project:', p._id);
      const res = await api.delete(`/projects/${p._id}`); 
      console.log('✅ Delete response:', res.data);
      show('Deleted ✓'); 
      onRefresh(); 
    }
    catch (e) { 
      console.error('❌ Delete error:', e.response?.data?.message || e.message);
      show(e.response?.data?.message || 'Delete failed', 'error'); 
    }
  };

  const toggleFeat = async p => {
    try { 
      console.log('⭐ Toggling featured for:', p._id);
      await api.put(`/projects/${p._id}`, { ...p, featured: !p.featured }); 
      show((!p.featured ? 'Featured' : 'Unfeatured') + ' ✓'); 
      onRefresh(); 
    }
    catch (e) { 
      console.error('❌ Toggle failed:', e.response?.data?.message || e.message);
      show('Toggle failed', 'error'); 
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#F0EDE8', fontSize: '1.05rem' }}>{isVideo ? 'Video' : 'Image'} Projects</Typography>
          <Typography sx={{ fontSize: '.78rem', color: '#555' }}>{items.length} item{items.length !== 1 ? 's' : ''}</Typography>
        </Box>
        <Button startIcon={<AddIcon />} variant="contained" onClick={openAdd} sx={{ background: accent, color: isVideo ? '#0b0b0b' : '#fff', fontWeight: 700, '&:hover': { background: accent + 'cc' } }}>
          Add {isVideo ? 'Video' : 'Image'}
        </Button>
      </Box>

      {!items.length ? (
        <Paper sx={{ p: 6, textAlign: 'center' }}>
          <Typography sx={{ fontSize: '2.5rem', mb: 1.5 }}>{isVideo ? '🎬' : '🖼️'}</Typography>
          <Typography sx={{ color: '#555', mb: 2 }}>No {type} projects yet</Typography>
          <Button onClick={openAdd} startIcon={<AddIcon />} sx={{ color: accent }}>Add first {type}</Button>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {items.map(p => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={p._id}>
              <Paper sx={{ overflow: 'hidden', '&:hover .actions': { opacity: 1 } }}>
                <Box sx={{ position: 'relative', aspectRatio: '16/10', background: isVideo ? 'linear-gradient(135deg,#1a1a1a 0%,#0a0a0a 100%)' : '#0f0f0f', overflow: 'hidden' }}>
                  {isVideo
                    ? p.thumbnailUrl
                      ? <Box component="img" src={absUrl(p.thumbnailUrl)} alt={p.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                      : <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, flexDirection: 'column', color: '#444' }}>
                          <Box sx={{ fontSize: '2.5rem' }}>🎬</Box>
                          <Typography sx={{ fontSize: '.75rem', color: '#555' }}>No thumbnail</Typography>
                        </Box>
                    : <Box component="img" src={absUrl(p.mediaUrl)} alt={p.title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  }
                  {p.featured && <Box sx={{ position: 'absolute', top: 7, left: 7, px: 1.2, py: .3, background: `${ACCENT}20`, border: `1px solid ${ACCENT}40`, borderRadius: '100px' }}><Typography sx={{ fontSize: '.6rem', color: ACCENT, fontWeight: 700 }}>FEATURED</Typography></Box>}
                  <Box className="actions" sx={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, opacity: 0, transition: 'opacity .25s' }}>
                    <IconButton onClick={() => openEdit(p)} sx={{ background: 'rgba(255,255,255,.1)', color: '#F0EDE8', '&:hover': { background: accent, color: '#fff' } }}><EditIcon sx={{ fontSize: 17 }} /></IconButton>
                    <IconButton onClick={() => toggleFeat(p)} sx={{ background: 'rgba(255,255,255,.1)', color: '#F0EDE8' }}>{p.featured ? <StarIcon sx={{ fontSize: 17, color: '#FFD166' }} /> : <StarBorderIcon sx={{ fontSize: 17 }} />}</IconButton>
                    <IconButton onClick={() => del(p)} sx={{ background: 'rgba(255,255,255,.1)', color: '#F0EDE8', '&:hover': { background: 'rgba(255,60,60,.4)', color: '#ff8080' } }}><DeleteIcon sx={{ fontSize: 17 }} /></IconButton>
                  </Box>
                </Box>
                <Box sx={{ p: 1.5 }}>
                  <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '.83rem', color: '#F0EDE8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: .3 }}>
                    <Typography sx={{ fontSize: '.7rem', color: '#555' }}>{p.category}</Typography>
                    {p.colorPalette?.length > 0 && (
                      <Box sx={{ display: 'flex', gap: .4 }}>{p.colorPalette.slice(0,3).map((c,i)=><Box key={i} sx={{width:10,height:10,borderRadius:'50%',background:c,border:'1px solid rgba(255,255,255,.15)'}}/>)}</Box>
                    )}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#F0EDE8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {edit ? 'Edit Project' : `Add ${isVideo ? 'Video' : 'Image'}`}
          <IconButton onClick={() => setOpen(false)} sx={{ color: '#555' }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2 }}>
          {/* Upload zone */}
          <Box onClick={() => fileRef.current?.click()} sx={{ border: `2px dashed ${form.mediaUrl ? accent + '60' : 'rgba(255,255,255,.08)'}`, borderRadius: '12px', p: 3, textAlign: 'center', cursor: 'pointer', background: form.mediaUrl ? `${accent}05` : 'transparent', '&:hover': { borderColor: accent + '50', background: `${accent}05` }, transition: 'all .2s' }}>
            <input ref={fileRef} type="file" hidden accept={isVideo ? 'video/*' : 'image/*'} onChange={upload} />
            {uploading ? (
              <Box><CircularProgress size={26} sx={{ color: accent, mb: 1 }} /><LinearProgress variant="determinate" value={upPct} sx={{ mt: 1, height: 3, borderRadius: 2, background: 'rgba(255,255,255,.05)', '& .MuiLinearProgress-bar': { background: accent } }} /><Typography sx={{ fontSize: '.75rem', color: '#555', mt: 1 }}>Uploading... {upPct}%</Typography></Box>
            ) : form.mediaUrl ? (
              <Box>{isVideo ? <Box sx={{ fontSize: '2.5rem', mb: 1 }}>🎬</Box> : <Box component="img" src={absUrl(form.mediaUrl)} sx={{ maxHeight: 100, maxWidth: '100%', borderRadius: '8px', objectFit: 'contain', mb: 1 }} />}<Typography sx={{ fontSize: '.75rem', color: accent }}>✓ Uploaded · Click to replace</Typography></Box>
            ) : (
              <Box><CloudUploadIcon sx={{ fontSize: 36, color: '#444', mb: 1 }} /><Typography sx={{ fontSize: '.88rem', color: '#666', mb: .5 }}>Click to upload {isVideo ? 'video' : 'image'}</Typography><Typography sx={{ fontSize: '.72rem', color: '#444' }}>Cloudinary · Max 200MB</Typography></Box>
            )}
          </Box>

          <TextField label="Title *" {...f('title')} />
          <TextField label="Short Description" {...f('description')} />
          <TextField label="Full Description (for case study)" {...f('fullDescription')} multiline rows={2} />

          <Grid container spacing={1.5}>
            <Grid item xs={6}>
              <TextField select label="Category" {...f('category')} SelectProps={{ native: true }} inputProps={{ ...f('category').inputProps, style: { color: '#F0EDE8' } }}>
                {['Branding','UI/UX','Motion','Print','Photography','Illustration','Other'].map(c => <option key={c} value={c} style={{ background: '#141414' }}>{c}</option>)}
              </TextField>
            </Grid>
            <Grid item xs={3}><TextField label="Client" {...f('client')} /></Grid>
            <Grid item xs={3}><TextField label="Year" {...f('year')} /></Grid>
          </Grid>

          <Grid container spacing={1.5}>
            <Grid item xs={6}><TextField label="Tools (comma sep.)" {...f('tools')} placeholder="Figma, Ps, Ai" /></Grid>
            <Grid item xs={6}><TextField label="Color Palette (hex)" {...f('colorPalette')} placeholder="#FF4757, #1a1a1a" /></Grid>
          </Grid>
          <TextField label="Tags (comma separated)" {...f('tags')} />

          <FormControlLabel control={<Switch checked={!!form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} sx={{ '& .MuiSwitch-thumb': { background: accent } }} />} label={<Typography sx={{ fontSize: '.83rem', color: '#888' }}>Featured (takes larger grid space)</Typography>} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: '#555' }}>Cancel</Button>
          <Button onClick={save} variant="contained" disabled={uploading} sx={{ background: accent, color: isVideo ? '#0b0b0b' : '#fff', fontWeight: 700 }}>{edit ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

/* ── Services Manager ─────────────────────────────────── */
function ServicesMgr({ items, onRefresh, show }) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const blank = { title: '', description: '', icon: '', features: '', priceFrom: '', highlighted: false };
  const [form, setForm] = useState(blank);
  const f = k => ({ value: form[k] || '', onChange: e => setForm(p => ({ ...p, [k]: e.target.value })), InputLabelProps: { sx: { color: '#555' } }, inputProps: { style: { color: '#F0EDE8' } }, fullWidth: true });

  const openAdd  = () => { setForm(blank); setEdit(null); setOpen(true); };
  const openEdit = s  => { setForm({ ...s, features: (s.features || []).join(', ') }); setEdit(s); setOpen(true); };

  const save = async () => {
    if (!form.title.trim()) { show('Title required', 'error'); return; }
    const payload = { ...form, features: form.features.split(',').map(x => x.trim()).filter(Boolean) };
    try {
      if (edit) await api.put(`/services/${edit._id}`, payload);
      else      await api.post('/services', payload);
      show(edit ? 'Updated ✓' : 'Added ✓'); setOpen(false); onRefresh();
    } catch { show('Save failed', 'error'); }
  };

  const del = async s => {
    if (!window.confirm(`Delete "${s.title}"?`)) return;
    try { 
      console.log('🗑️ Deleting service:', s._id);
      await api.delete(`/services/${s._id}`); 
      show('Deleted ✓'); 
      onRefresh(); 
    }
    catch (e) { 
      console.error('❌ Delete failed:', e.response?.data?.message || e.message);
      show(e.response?.data?.message || 'Delete failed', 'error'); 
    }
  };

  const seed = async () => { try { await api.post('/services/seed'); show('Default services added ✓'); onRefresh(); } catch { show('Already exists', 'error'); } };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#F0EDE8', fontSize: '1.05rem' }}>Services ({items.length})</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {!items.length && <Button variant="outlined" onClick={seed} sx={{ borderColor: 'rgba(255,255,255,.1)', color: '#888' }}>Seed Defaults</Button>}
          <Button startIcon={<AddIcon />} variant="contained" onClick={openAdd} sx={{ background: ACCENT, color: '#fff', fontWeight: 700 }}>Add Service</Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {items.map(s => (
          <Grid item xs={12} sm={6} md={3} key={s._id}>
            <Paper sx={{ p: 2.5, position: 'relative', border: s.highlighted ? `1px solid ${ACCENT}30` : undefined }}>
              {s.highlighted && <Box sx={{ position: 'absolute', top: 10, right: 10, px: 1.2, py: .3, background: `${ACCENT}15`, borderRadius: '100px' }}><Typography sx={{ fontSize: '.6rem', color: ACCENT, fontWeight: 700 }}>POPULAR</Typography></Box>}
              <Typography sx={{ fontSize: '1.8rem', mb: 1.5 }}>{s.icon || '✦'}</Typography>
              <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '.95rem', color: '#F0EDE8', mb: 1 }}>{s.title}</Typography>
              <Typography sx={{ fontSize: '.8rem', color: '#666', mb: 1.5, lineHeight: 1.6 }}>{s.description}</Typography>
              {s.priceFrom && <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: s.highlighted ? ACCENT : '#F0EDE8', fontSize: '1rem' }}>From {s.priceFrom}</Typography>}
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <IconButton size="small" onClick={() => openEdit(s)} sx={{ color: '#555', '&:hover': { color: '#F0EDE8' } }}><EditIcon sx={{ fontSize: 16 }} /></IconButton>
                <IconButton size="small" onClick={() => del(s)} sx={{ color: '#555', '&:hover': { color: '#ff6060' } }}><DeleteIcon sx={{ fontSize: 16 }} /></IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {!items.length && <Paper sx={{ p: 6, textAlign: 'center', mt: 2 }}><Typography sx={{ color: '#555' }}>No services yet</Typography></Paper>}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#F0EDE8', display: 'flex', justifyContent: 'space-between' }}>{edit ? 'Edit' : 'Add'} Service<IconButton onClick={() => setOpen(false)} sx={{ color: '#555' }}><CloseIcon /></IconButton></DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2 }}>
          <Grid container spacing={1.5}><Grid item xs={8}><TextField label="Title *" {...f('title')} /></Grid><Grid item xs={4}><TextField label="Icon (emoji)" {...f('icon')} /></Grid></Grid>
          <TextField label="Description" {...f('description')} multiline rows={2} />
          <TextField label="Features (comma separated)" {...f('features')} placeholder="Logo Design, Brand Guidelines, ..." />
          <TextField label="Starting Price" {...f('priceFrom')} placeholder="$500" />
          <FormControlLabel control={<Switch checked={!!form.highlighted} onChange={e => setForm(p => ({ ...p, highlighted: e.target.checked }))} sx={{ '& .MuiSwitch-thumb': { background: ACCENT } }} />} label={<Typography sx={{ fontSize: '.83rem', color: '#888' }}>Highlight this service (Popular badge)</Typography>} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: '#555' }}>Cancel</Button>
          <Button onClick={save} variant="contained" sx={{ background: ACCENT, color: '#fff', fontWeight: 700 }}>{edit ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

/* ── Testimonials Manager ─────────────────────────────── */
function TestimonialsMgr({ items, onRefresh, show }) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const blank = { name: '', role: '', company: '', quote: '', photoUrl: '', rating: 5 };
  const [form, setForm] = useState(blank);
  const f = k => ({ value: form[k] !== undefined ? form[k] : '', onChange: e => setForm(p => ({ ...p, [k]: e.target.value })), InputLabelProps: { sx: { color: '#555' } }, inputProps: { style: { color: '#F0EDE8' } }, fullWidth: true });

  const openAdd  = () => { setForm(blank); setEdit(null); setOpen(true); };
  const openEdit = t  => { setForm(t); setEdit(t); setOpen(true); };

  const save = async () => {
    if (!form.name.trim() || !form.quote.trim()) { show('Name and quote required', 'error'); return; }
    try {
      if (edit) await api.put(`/testimonials/${edit._id}`, form);
      else      await api.post('/testimonials', form);
      show(edit ? 'Updated ✓' : 'Added ✓'); setOpen(false); onRefresh();
    } catch { show('Save failed', 'error'); }
  };

  const del = async t => {
    if (!window.confirm(`Delete "${t.name}"?`)) return;
    try { 
      console.log('🗑️ Deleting testimonial:', t._id);
      await api.delete(`/testimonials/${t._id}`); 
      show('Deleted ✓'); 
      onRefresh(); 
    }
    catch (e) { 
      console.error('❌ Delete failed:', e.response?.data?.message || e.message);
      show(e.response?.data?.message || 'Delete failed', 'error'); 
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#F0EDE8', fontSize: '1.05rem' }}>Testimonials ({items.length})</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={openAdd} sx={{ background: ACCENT, color: '#fff', fontWeight: 700 }}>Add Testimonial</Button>
      </Box>
      <Grid container spacing={2}>
        {items.map(t => (
          <Grid item xs={12} md={6} key={t._id}>
            <Paper sx={{ p: 2.5 }}>
              <Box sx={{ display: 'flex', gap: .4, mb: 1.5 }}>{[...Array(t.rating||5)].map((_,i)=><Box key={i} sx={{fontSize:'.85rem',color:'#FFD166'}}>★</Box>)}</Box>
              <Typography sx={{ color: '#888', fontSize: '.88rem', lineHeight: 1.7, mb: 2, fontStyle: 'italic' }}>"{t.quote}"</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar src={t.photoUrl} sx={{ width: 36, height: 36, background: ACCENT, fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '.9rem' }}>{t.name?.charAt(0)}</Avatar>
                  <Box><Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '.85rem', color: '#F0EDE8' }}>{t.name}</Typography><Typography sx={{ fontSize: '.73rem', color: '#555' }}>{t.role}{t.company ? ` · ${t.company}` : ''}</Typography></Box>
                </Box>
                <Box sx={{ display: 'flex', gap: .5 }}>
                  <IconButton size="small" onClick={() => openEdit(t)} sx={{ color: '#555', '&:hover': { color: '#F0EDE8' } }}><EditIcon sx={{ fontSize: 15 }} /></IconButton>
                  <IconButton size="small" onClick={() => del(t)} sx={{ color: '#555', '&:hover': { color: '#ff6060' } }}><DeleteIcon sx={{ fontSize: 15 }} /></IconButton>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {!items.length && <Paper sx={{ p: 6, textAlign: 'center' }}><Typography sx={{ color: '#555' }}>No testimonials yet</Typography></Paper>}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#F0EDE8', display: 'flex', justifyContent: 'space-between' }}>{edit ? 'Edit' : 'Add'} Testimonial<IconButton onClick={() => setOpen(false)} sx={{ color: '#555' }}><CloseIcon /></IconButton></DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2 }}>
          <TextField label="Client Name *" {...f('name')} />
          <Grid container spacing={1.5}><Grid item xs={6}><TextField label="Role" {...f('role')} /></Grid><Grid item xs={6}><TextField label="Company" {...f('company')} /></Grid></Grid>
          <TextField label="Quote *" {...f('quote')} multiline rows={3} />
          <TextField label="Photo URL" {...f('photoUrl')} />
          <TextField label="Rating (1-5)" type="number" {...f('rating')} inputProps={{ ...f('rating').inputProps, min: 1, max: 5 }} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: '#555' }}>Cancel</Button>
          <Button onClick={save} variant="contained" sx={{ background: ACCENT, color: '#fff', fontWeight: 700 }}>{edit ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

/* ── Awards Manager ───────────────────────────────────── */
function AwardsMgr({ items, onRefresh, show }) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const blank = { title: '', organization: '', year: '', description: '', link: '' };
  const [form, setForm] = useState(blank);
  const f = k => ({ value: form[k] || '', onChange: e => setForm(p => ({ ...p, [k]: e.target.value })), InputLabelProps: { sx: { color: '#555' } }, inputProps: { style: { color: '#F0EDE8' } }, fullWidth: true });

  const openAdd  = () => { setForm(blank); setEdit(null); setOpen(true); };
  const openEdit = a  => { setForm(a); setEdit(a); setOpen(true); };
  const save = async () => {
    if (!form.title.trim()) { show('Title required', 'error'); return; }
    try {
      if (edit) await api.put(`/awards/${edit._id}`, form);
      else      await api.post('/awards', form);
      show(edit ? 'Updated ✓' : 'Added ✓'); setOpen(false); onRefresh();
    } catch { show('Failed', 'error'); }
  };
  const del = async a => {
    if (!window.confirm(`Delete "${a.title}"?`)) return;
    try { 
      console.log('🗑️ Deleting award:', a._id);
      await api.delete(`/awards/${a._id}`); 
      show('Deleted ✓'); 
      onRefresh(); 
    }
    catch (e) { 
      console.error('❌ Delete failed:', e.response?.data?.message || e.message);
      show(e.response?.data?.message || 'Delete failed', 'error'); 
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#F0EDE8', fontSize: '1.05rem' }}>Awards & Recognition ({items.length})</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={openAdd} sx={{ background: ACCENT, color: '#fff', fontWeight: 700 }}>Add Award</Button>
      </Box>
      <Grid container spacing={2}>
        {items.map(a => (
          <Grid item xs={12} sm={6} md={4} key={a._id}>
            <Paper sx={{ p: 2.5, display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Typography sx={{ fontSize: '1.8rem' }}>🏆</Typography>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#F0EDE8', fontSize: '.95rem' }}>{a.title}</Typography>
                <Typography sx={{ fontSize: '.78rem', color: '#555', mt: .3 }}>{a.organization}{a.year ? ` · ${a.year}` : ''}</Typography>
                {a.description && <Typography sx={{ fontSize: '.78rem', color: '#666', mt: .8, lineHeight: 1.6 }}>{a.description}</Typography>}
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: .5 }}>
                <IconButton size="small" onClick={() => openEdit(a)} sx={{ color: '#555', '&:hover': { color: '#F0EDE8' } }}><EditIcon sx={{ fontSize: 15 }} /></IconButton>
                <IconButton size="small" onClick={() => del(a)} sx={{ color: '#555', '&:hover': { color: '#ff6060' } }}><DeleteIcon sx={{ fontSize: 15 }} /></IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      {!items.length && <Paper sx={{ p: 6, textAlign: 'center' }}><Typography sx={{ color: '#555' }}>No awards yet</Typography></Paper>}

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#F0EDE8', display: 'flex', justifyContent: 'space-between' }}>{edit ? 'Edit' : 'Add'} Award<IconButton onClick={() => setOpen(false)} sx={{ color: '#555' }}><CloseIcon /></IconButton></DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, pt: 2 }}>
          <TextField label="Award Title *" {...f('title')} />
          <Grid container spacing={1.5}><Grid item xs={8}><TextField label="Organization" {...f('organization')} /></Grid><Grid item xs={4}><TextField label="Year" {...f('year')} /></Grid></Grid>
          <TextField label="Description" {...f('description')} multiline rows={2} />
          <TextField label="Link (optional)" {...f('link')} />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setOpen(false)} sx={{ color: '#555' }}>Cancel</Button>
          <Button onClick={save} variant="contained" sx={{ background: ACCENT, color: '#fff', fontWeight: 700 }}>{edit ? 'Update' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

/* ── Skills Manager ───────────────────────────────────── */
function SkillsMgr({ items, onRefresh, show }) {
  const [name, setName] = useState('');
  const [cat, setCat]   = useState('Design Tools');
  const [adding, setAdding] = useState(false);
  const CATS = ['Design Tools', 'Motion', 'UI/UX', 'Photography', 'Expertise', 'Productivity', 'Other'];
  const grouped = {};
  items.forEach(s => { if (!grouped[s.category]) grouped[s.category] = []; grouped[s.category].push(s); });

  const add = async () => {
    if (!name.trim()) return;
    setAdding(true);
    try { await api.post('/skills', { name: name.trim(), category: cat }); setName(''); show('Skill added ✓'); onRefresh(); }
    catch { show('Failed', 'error'); }
    finally { setAdding(false); }
  };
  const del = async id => { try { console.log('🗑️ Deleting skill:', id); await api.delete(`/skills/${id}`); show('Removed'); onRefresh(); } catch (e) { console.error('❌ Delete failed:', e.response?.data?.message || e.message); show(e.response?.data?.message || 'Failed', 'error'); } };
  const seed = async () => { try { await api.post('/skills/seed'); show('Default skills added ✓'); onRefresh(); } catch { show('Already exists', 'error'); } };

  return (
    <Box>
      <Paper sx={{ p: 2.5, mb: 3 }}>
        <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#F0EDE8', mb: 2, fontSize: '.9rem' }}>Add Skill</Typography>
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <TextField label="Skill name" size="small" value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === 'Enter' && add()} sx={{ flex: 1, minWidth: 150 }} InputLabelProps={{ sx: { color: '#555' } }} inputProps={{ style: { color: '#F0EDE8' } }} />
          <TextField select label="Category" size="small" value={cat} onChange={e => setCat(e.target.value)} SelectProps={{ native: true }} sx={{ minWidth: 150 }} InputLabelProps={{ sx: { color: '#555' } }} inputProps={{ style: { color: '#F0EDE8' } }}>
            {CATS.map(c => <option key={c} value={c} style={{ background: '#141414' }}>{c}</option>)}
          </TextField>
          <Button variant="contained" onClick={add} disabled={adding || !name.trim()} sx={{ background: ACCENT, color: '#fff', fontWeight: 700 }}>{adding ? <CircularProgress size={18} /> : 'Add'}</Button>
          {!items.length && <Button variant="outlined" onClick={seed} sx={{ borderColor: 'rgba(255,255,255,.1)', color: '#888' }}>Seed Defaults</Button>}
        </Box>
      </Paper>

      {Object.entries(grouped).map(([cat, catItems]) => (
        <Box key={cat} sx={{ mb: 3 }}>
          <Typography sx={{ fontSize: '.68rem', color: '#444', letterSpacing: '.1em', textTransform: 'uppercase', mb: 1.5, fontWeight: 600 }}>{cat} ({catItems.length})</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {catItems.map(s => (
              <Chip key={s._id} label={s.name} onDelete={() => del(s._id)} deleteIcon={<CloseIcon sx={{ fontSize: '14px !important' }} />} sx={{ background: 'rgba(255,255,255,.04)', color: '#bbb', border: '1px solid rgba(255,255,255,.08)', '& .MuiChip-deleteIcon': { color: '#444', '&:hover': { color: '#ff6060' } } }} />
            ))}
          </Box>
        </Box>
      ))}
      {!items.length && <Paper sx={{ p: 6, textAlign: 'center' }}><Typography sx={{ color: '#555' }}>No skills yet</Typography></Paper>}
    </Box>
  );
}

/* ── Visitors Manager ─────────────────────────────────── */
function VisitorsMgr({ data, onRefresh, show }) {
  const clear = async () => { if (!window.confirm('Clear all visitor data?')) return; try { console.log('🗑️ Clearing visitor data'); await api.delete('/visitors/clear'); show('Cleared \u2713'); onRefresh(); } catch (e) { console.error('❌ Clear failed:', e.response?.data?.message || e.message); show(e.response?.data?.message || 'Failed', 'error'); } };
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          {[{ l: 'Total', v: data.total||0, c: ACCENT }, { l: 'Today', v: data.today||0, c: '#4ECDC4' }, { l: 'This Week', v: data.thisWeek||0, c: '#FFD166' }, { l: 'Unique', v: data.uniqueVisitors||0, c: '#AA96DA' }].map(s => (
            <Paper key={s.l} sx={{ px: 2.5, py: 1.5, textAlign: 'center', minWidth: 90 }}>
              <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '1.6rem', color: s.c, lineHeight: 1 }}>{s.v}</Typography>
              <Typography sx={{ fontSize: '.7rem', color: '#555', mt: .3 }}>{s.l}</Typography>
            </Paper>
          ))}
        </Box>
        <Button variant="outlined" onClick={clear} sx={{ borderColor: 'rgba(255,60,60,.3)', color: '#ff6060', '&:hover': { background: 'rgba(255,60,60,.05)' } }}>Clear All</Button>
      </Box>
      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table size="small" stickyHeader>
            <TableHead>
              <TableRow sx={{ '& th': { background: '#0f0f0f', color: '#444', fontSize: '.68rem', letterSpacing: '.08em', textTransform: 'uppercase', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,.06)' } }}>
                {['#','IP Address','Browser','OS','Page','Time'].map(h => <TableCell key={h}>{h}</TableCell>)}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.visitors?.map((v, i) => (
                <TableRow key={v._id || i} sx={{ '& td': { color: '#777', fontSize: '.78rem', borderBottom: '1px solid rgba(255,255,255,.03)' }, '&:hover': { background: 'rgba(255,255,255,.02)' } }}>
                  <TableCell sx={{ color: '#333 !important' }}>{i + 1}</TableCell>
                  <TableCell><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Box sx={{ width: 5, height: 5, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />{v.ip}</Box></TableCell>
                  <TableCell><Chip label={v.browser || '?'} size="small" sx={{ fontSize: '.62rem', height: 18, background: 'rgba(255,255,255,.04)', color: '#555', border: '1px solid rgba(255,255,255,.06)' }} /></TableCell>
                  <TableCell>{v.os || '?'}</TableCell>
                  <TableCell>{v.page || '/'}</TableCell>
                  <TableCell>{new Date(v.timestamp).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {!data.visitors?.length && <Box sx={{ p: 6, textAlign: 'center' }}><Typography sx={{ color: '#444' }}>No visitors yet</Typography></Box>}
      </Paper>
    </Box>
  );
}

/* ── Profile Manager ──────────────────────────────────── */
function ProfileMgr({ profile, setProfile, show }) {
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [photoUpl, setPhotoUpl] = useState(false);
  const photoRef = useRef(null);

  useEffect(() => { if (profile) setForm({ ...profile }); }, [profile]);

  const f = k => ({ value: form[k] || '', onChange: e => setForm(p => ({ ...p, [k]: e.target.value })), InputLabelProps: { sx: { color: '#555' } }, inputProps: { style: { color: '#F0EDE8' } }, fullWidth: true });

  const uploadPhoto = async e => {
    const file = e.target.files[0]; if (!file) return;
    setPhotoUpl(true);
    try { const fd = new FormData(); fd.append('file', file); const r = await api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } }); setForm(p => ({ ...p, photoUrl: r.data.url, photoPublicId: r.data.publicId || '' })); show('Photo uploaded ✓'); }
    catch { show('Upload failed', 'error'); }
    finally { setPhotoUpl(false); }
  };

  const save = async () => {
    setSaving(true);
    try {
      const tickerItems = typeof form.tickerItems === 'string' ? form.tickerItems.split(',').map(t => t.trim()).filter(Boolean) : form.tickerItems;
      const specializations = typeof form.specializations === 'string' ? form.specializations.split(',').map(t => t.trim()).filter(Boolean) : form.specializations;
      const r = await api.put('/profile', { ...form, tickerItems, specializations });
      setProfile(r.data); show('Profile saved ✓');
    } catch { show('Save failed', 'error'); }
    finally { setSaving(false); }
  };

  const tickerStr = Array.isArray(form.tickerItems) ? form.tickerItems.join(', ') : (form.tickerItems || '');
  const specStr   = Array.isArray(form.specializations) ? form.specializations.join(', ') : (form.specializations || '');

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Box onClick={() => photoRef.current?.click()} sx={{ width: 110, height: 110, borderRadius: '50%', mx: 'auto', mb: 2, cursor: 'pointer', position: 'relative', overflow: 'hidden', border: '2px solid rgba(255,255,255,.08)', background: '#0f0f0f', '&:hover .ph-ov': { opacity: 1 } }}>
            {form.photoUrl ? <Box component="img" src={form.photoUrl} alt="" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Avatar sx={{ width: '100%', height: '100%', background: '#1a1a1a', fontSize: '2.5rem', borderRadius: 0 }}>{(form.name || 'P').charAt(0)}</Avatar>}
            <Box className="ph-ov" sx={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity .2s' }}>{photoUpl ? <CircularProgress size={24} sx={{ color: ACCENT }} /> : <CloudUploadIcon sx={{ color: ACCENT }} />}</Box>
          </Box>
          <input ref={photoRef} type="file" hidden accept="image/*" onChange={uploadPhoto} />
          <Typography sx={{ fontSize: '.78rem', color: '#555', mb: 2 }}>Click to change photo</Typography>
          <Divider sx={{ borderColor: 'rgba(255,255,255,.06)', mb: 2 }} />
          <FormControlLabel control={<Switch checked={!!form.availableForWork} onChange={e => setForm(p => ({ ...p, availableForWork: e.target.checked }))} sx={{ '& .MuiSwitch-thumb': { background: ACCENT } }} />} label={<Typography sx={{ fontSize: '.83rem', color: '#888' }}>Available for projects</Typography>} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={8}>
        <Paper sx={{ p: 3 }}>
          <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#F0EDE8', mb: 3, fontSize: '.95rem' }}>Personal Info</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><TextField label="Full Name" {...f('name')} /></Grid>
            <Grid item xs={12} sm={6}><TextField label="Job Title" {...f('title')} placeholder="Graphic Designer" /></Grid>
            <Grid item xs={12}><TextField label="Hero Tagline" {...f('heroTagline')} placeholder="Visual Storyteller" /></Grid>
            <Grid item xs={12}><TextField label="Subtitle (Hero)" {...f('subtitle')} /></Grid>
            <Grid item xs={12}><TextField label="Bio" {...f('bio')} multiline rows={3} /></Grid>
            <Grid item xs={12} sm={4}><TextField label="Years Exp." {...f('yearsExp')} placeholder="3+" /></Grid>
            <Grid item xs={12} sm={4}><TextField label="Projects Count" {...f('projectsCount')} placeholder="50+" /></Grid>
            <Grid item xs={12} sm={4}><TextField label="Brands Count" {...f('brandsCount')} placeholder="20+" /></Grid>
            <Grid item xs={12} sm={6}><TextField label="Email" type="email" {...f('email')} /></Grid>
            <Grid item xs={12} sm={6}><TextField label="Location" {...f('location')} /></Grid>
          </Grid>

          <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,.06)' }} />
          <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#F0EDE8', mb: 2, fontSize: '.95rem' }}>Social & Links</Typography>
          <Grid container spacing={2}>
            {[['behance','Behance'],['dribbble','Dribbble'],['instagram','Instagram'],['linkedin','LinkedIn'],['github','GitHub'],['twitter','Twitter/X'],['resumeUrl','Resume PDF URL']].map(([k,l]) => (
              <Grid item xs={12} sm={6} key={k}><TextField label={l} {...f(k)} /></Grid>
            ))}
          </Grid>

          <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,.06)' }} />
          <Grid container spacing={2}>
            <Grid item xs={12}><TextField label="Specializations (comma sep.)" fullWidth value={specStr} onChange={e => setForm(p => ({ ...p, specializations: e.target.value }))} helperText="e.g. Branding, UI/UX, Motion — shown as floating tags on hero" InputLabelProps={{ sx: { color: '#555' } }} inputProps={{ style: { color: '#F0EDE8' } }} FormHelperTextProps={{ sx: { color: '#444' } }} /></Grid>
            <Grid item xs={12}><TextField label="Hero Ticker Items (comma sep.)" fullWidth value={tickerStr} onChange={e => setForm(p => ({ ...p, tickerItems: e.target.value }))} helperText="Scrolling text at the bottom of hero" InputLabelProps={{ sx: { color: '#555' } }} inputProps={{ style: { color: '#F0EDE8' } }} FormHelperTextProps={{ sx: { color: '#444' } }} /></Grid>
          </Grid>

          <Button variant="contained" onClick={save} disabled={saving} sx={{ mt: 3, background: ACCENT, color: '#fff', fontWeight: 700, px: 4 }}>
            {saving ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Save Profile'}
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
}

/* ── Projects Manager ────────────────────────────────── */
function ProjectsMgr({ items, onRefresh, show }) {
  const stats = [
    { label: 'All Projects', value: items.length, color: ACCENT },
    { label: 'Videos', value: items.filter(p => p.mediaType === 'video').length, color: '#4ECDC4' },
    { label: 'Images', value: items.filter(p => p.mediaType === 'image').length, color: '#FFD166' },
    { label: 'Featured', value: items.filter(p => p.featured).length, color: '#95E1D3' },
  ];

  return (
    <Box>
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {stats.map(s => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <Paper sx={{ p: 2.5, textAlign: 'center' }}>
              <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 800, fontSize: '2rem', color: s.color }}>{s.value}</Typography>
              <Typography sx={{ fontSize: '.8rem', color: '#555', mt: .5 }}>{s.label}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 2.5, overflowX: 'auto' }}>
        <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#F0EDE8', mb: 2, fontSize: '.9rem' }}>All Projects</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: 'rgba(255,255,255,.02)' }}>
                <TableCell sx={{ color: '#666', fontSize: '.8rem', fontWeight: 600 }}>Title</TableCell>
                <TableCell sx={{ color: '#666', fontSize: '.8rem', fontWeight: 600 }}>Type</TableCell>
                <TableCell sx={{ color: '#666', fontSize: '.8rem', fontWeight: 600 }}>Featured</TableCell>
                <TableCell sx={{ color: '#666', fontSize: '.8rem', fontWeight: 600, textAlign: 'right' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((p, i) => (
                <TableRow key={p._id || i} sx={{ borderBottom: '1px solid rgba(255,255,255,.05)' }}>
                  <TableCell sx={{ fontSize: '.85rem', color: '#F0EDE8' }}>{p.title}</TableCell>
                  <TableCell sx={{ fontSize: '.8rem', color: '#888' }}><Chip label={p.mediaType} size="small" sx={{ fontSize: '.7rem', height: 20, background: 'rgba(255,255,255,.05)', color: '#666' }} /></TableCell>
                  <TableCell sx={{ fontSize: '.8rem', color: p.featured ? ACCENT : '#555' }}>{p.featured ? '⭐ Yes' : 'No'}</TableCell>
                  <TableCell sx={{ textAlign: 'right', gap: 1, display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton size="small" sx={{ color: '#666', '&:hover': { color: ACCENT } }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" sx={{ color: '#666', '&:hover': { color: '#ff6060' } }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {!items.length && <Typography sx={{ color: '#444', textAlign: 'center', py: 6 }}>No projects yet</Typography>}
      </Paper>
    </Box>
  );
}

/* ── Messages Manager ────────────────────────────────── */
function MessagesMgr({ items, onRefresh, show }) {
  const [detail, setDetail] = useState(null);
  const unread = items.filter(m => !m.read).length;

  const markRead = async (id) => {
    try {
      await api.put(`/contact/${id}/read`);
      onRefresh();
      show('Marked as read');
    } catch {
      show('Failed to update', 'error');
    }
  };

  const deleteMsg = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.delete(`/contact/${id}`);
      onRefresh();
      show('Message deleted');
      setDetail(null);
    } catch {
      show('Failed to delete', 'error');
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 2.5, mb: 3, background: `${ACCENT}08`, border: `1px solid ${ACCENT}20` }}>
        <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: ACCENT }}>📧 {unread} Unread Messages</Typography>
      </Paper>

      <Paper sx={{ p: 2.5 }}>
        <Typography sx={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#F0EDE8', mb: 2, fontSize: '.9rem' }}>All Messages</Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {items.map((msg) => (
            <Box key={msg.id} sx={{ p: 2, background: !msg.read ? `${ACCENT}08` : 'rgba(255,255,255,.02)', borderRadius: '8px', border: `1px solid ${!msg.read ? ACCENT + '30' : 'rgba(255,255,255,.05)'}`, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer', '&:hover': { background: !msg.read ? `${ACCENT}12` : 'rgba(255,255,255,.04)' } }} onClick={() => setDetail(msg)}>
              {!msg.read && <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: ACCENT, flexShrink: 0 }} />}
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '.85rem', fontWeight: 600, color: '#F0EDE8' }}>{msg.name}</Typography>
                <Typography sx={{ fontSize: '.75rem', color: '#666', mt: .3 }}>{msg.subject}</Typography>
                <Typography sx={{ fontSize: '.7rem', color: '#444', mt: .2 }}>{new Date(msg.timestamp).toLocaleString()}</Typography>
              </Box>
              <Typography sx={{ fontSize: '.75rem', color: '#555' }}>{msg.email}</Typography>
            </Box>
          ))}
        </Box>
        {!items.length && <Typography sx={{ color: '#444', textAlign: 'center', py: 6 }}>No messages yet</Typography>}
      </Paper>

      <Dialog open={!!detail} onClose={() => setDetail(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle sx={{ fontFamily: 'Space Grotesk', fontWeight: 700, color: '#F0EDE8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Message from {detail?.name}
          <IconButton onClick={() => setDetail(null)} sx={{ color: '#555' }}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '.8rem', color: '#666', mb: .5 }}>From:</Typography>
            <Typography sx={{ fontSize: '.85rem', color: '#F0EDE8' }}>{detail?.name} ({detail?.email})</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '.8rem', color: '#666', mb: .5 }}>Subject:</Typography>
            <Typography sx={{ fontSize: '.85rem', color: '#F0EDE8' }}>{detail?.subject}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '.8rem', color: '#666', mb: .5 }}>Received:</Typography>
            <Typography sx={{ fontSize: '.75rem', color: '#888' }}>{new Date(detail?.timestamp).toLocaleString()}</Typography>
          </Box>
          <Box sx={{ background: 'rgba(255,255,255,.02)', p: 2, borderRadius: '8px', border: '1px solid rgba(255,255,255,.05)' }}>
            <Typography sx={{ fontSize: '.85rem', color: '#F0EDE8', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{detail?.message}</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
          <Button onClick={() => setDetail(null)} sx={{ color: '#555' }}>Close</Button>
          {detail && !detail.read && <Button onClick={() => { markRead(detail.id); setDetail(null); }} variant="outlined" sx={{ borderColor: '#666', color: '#888' }}>Mark as Read</Button>}
          <Button onClick={() => deleteMsg(detail?.id)} variant="contained" sx={{ background: '#ff6060', color: '#fff', fontWeight: 700 }}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
