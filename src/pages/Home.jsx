import React, { useEffect, useState } from 'react';
import { Box, CircularProgress } from '@mui/material';
import api from '../utils/api';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import HeroSectionNew from '../components/HeroSectionNew';
import {
  ProjectsSection,
  ServicesSection,
  AboutSection,
  TestimonialsSection,
  ContactSection,
  Footer,
} from '../components/Sections';

export default function Home() {
  const { isDark } = useTheme();
  const [data, setData] = useState({ profile: null, projects: [], skills: [], services: [], testimonials: [], awards: [] });
  const [loading, setLoading] = useState(true);

  const bgColor = isDark ? '#0C0C0C' : '#f5f5f5';

  useEffect(() => {
    const load = async () => {
      try {
        const [pr, pj, sk, sv, tm, aw] = await Promise.all([
          api.get('/profile'),
          api.get('/projects'),
          api.get('/skills'),
          api.get('/services'),
          api.get('/testimonials'),
          api.get('/awards'),
        ]);
        setData({
          profile:      pr.data,
          projects:     pj.data,
          skills:       sk.data,
          services:     sv.data,
          testimonials: tm.data,
          awards:       aw.data,
        });
        if (pr.data?.name) document.title = `${pr.data.name} — Portfolio`;
      } catch (e) {
        console.error('Load error:', e);
      } finally {
        setLoading(false);
      }
    };
    load();
    // Track visitor
    api.post('/visitors/track', { page: '/', referrer: document.referrer }).catch(() => {});
  }, []);

  if (loading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: bgColor }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ color: '#FF4757' }} size={30} thickness={2} />
        </Box>
      </Box>
    );
  }

  const { profile, projects, skills, services, testimonials, awards } = data;

  return (
    <Box sx={{ background: bgColor, minHeight: '100vh' }}>
      <Navbar profile={profile} />
      <HeroSectionNew profile={profile} projects={projects} />
      <ProjectsSection projects={projects} />
      <ServicesSection services={services} />
      <AboutSection profile={profile} skills={skills} awards={awards} />
      <TestimonialsSection testimonials={testimonials} />
      <ContactSection profile={profile} />
      <Footer profile={profile} />
    </Box>
  );
}
