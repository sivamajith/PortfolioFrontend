import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export default function Navbar({ profile }) {
  const [scrolled, setScrolled] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const p = (window.scrollY / totalHeight) * 100;

      setProgress(p);
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    if (id === '/contact') {
      navigate('/contact');
    } else {
      document.querySelector(id)?.scrollIntoView({
        behavior: 'smooth',
      });
    }

    setDrawer(false);
  };

  const LINKS = [
    { label: 'Work', id: '#projects' },
    { label: 'Services', id: '#services' },
    { label: 'About', id: '#about' },
    { label: 'Contact', id: '/contact' },
  ];

  const navBg = isDark
    ? 'rgba(12,12,12,.9)'
    : 'rgba(245,245,245,.9)';

  const navBorder = isDark
    ? 'rgba(255,255,255,.05)'
    : 'rgba(0,0,0,.08)';

  const textColor = isDark ? '#F0EDE8' : '#1a1a1a';

  const secondaryText = isDark ? '#777' : '#666';

  return (
    <>
      {/* Progress Bar */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '2px',
          width: `${progress}%`,
          background: 'linear-gradient(90deg,#FF4757,#ff8a94)',
          zIndex: 9999,
          transition: 'width .1s',
        }}
      />

      {/* Navbar */}
      <Box
        component="nav"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,

          px: { xs: 2.5, md: 5 },
          py: 2,

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',

          transition: 'all .4s',

          background: scrolled ? navBg : 'transparent',

          backdropFilter: scrolled ? 'blur(24px)' : 'none',

          borderBottom: scrolled
            ? `1px solid ${navBorder}`
            : 'none',
        }}
      >
        {/* Logo */}
        <Box
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
          }}
        >
          <Box
            sx={{
              width: 32,
              height: 32,
              background: '#FF4757',
              borderRadius: '8px',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Space Grotesk',
                fontWeight: 700,
                fontSize: '.85rem',
                color: '#fff',
              }}
            >
              {(profile?.name || 'P').charAt(0)}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: 'Space Grotesk',
              fontWeight: 700,
              fontSize: '1rem',
              color: textColor,
              letterSpacing: '-.02em',
            }}
          >
            {profile?.name || 'Portfolio'}
          </Typography>
        </Box>

        {/* Desktop Menu */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          {LINKS.map((l) => (
            <Button
              key={l.label}
              onClick={() => go(l.id)}
              sx={{
                color: secondaryText,
                fontSize: '.875rem',
                fontWeight: 500,
                px: 2,
                borderRadius: '100px',

                '&:hover': {
                  color: textColor,
                  background: isDark
                    ? 'rgba(255,255,255,.05)'
                    : 'rgba(0,0,0,.05)',
                },

                transition: 'all .2s',
              }}
            >
              {l.label}
            </Button>
          ))}

          {/* Available Badge */}
          {profile?.availableForWork && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                ml: 1,
                px: 2,
                py: 0.75,

                border: '1px solid rgba(255,71,87,.3)',
                borderRadius: '100px',
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#FF4757',
                }}
              />

              <Typography
                sx={{
                  fontSize: '.72rem',
                  color: '#FF4757',
                  fontWeight: 600,
                }}
              >
                Available
              </Typography>
            </Box>
          )}

          {/* Theme Toggle */}
          <IconButton
            onClick={toggleTheme}
            sx={{
              ml: 2,
              color: secondaryText,

              '&:hover': {
                color: textColor,
                background: isDark
                  ? 'rgba(255,255,255,.05)'
                  : 'rgba(0,0,0,.05)',
              },

              borderRadius: '100px',
            }}
          >
            {isDark ? (
              <LightModeIcon sx={{ fontSize: 20 }} />
            ) : (
              <DarkModeIcon sx={{ fontSize: 20 }} />
            )}
          </IconButton>
        </Box>

        {/* Mobile Menu */}
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
            gap: 1,
          }}
        >
          <IconButton
            onClick={toggleTheme}
            sx={{ color: textColor }}
          >
            {isDark ? (
              <LightModeIcon sx={{ fontSize: 20 }} />
            ) : (
              <DarkModeIcon sx={{ fontSize: 20 }} />
            )}
          </IconButton>

          <IconButton
            onClick={() => setDrawer(true)}
            sx={{ color: textColor }}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawer}
        onClose={() => setDrawer(false)}
        PaperProps={{
          sx: {
            width: 260,
            background: isDark ? '#0f0f0f' : '#ffffff',
            borderLeft: `1px solid ${navBorder}`,
            pt: 2,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            px: 2,
            pb: 2,
          }}
        >
          <IconButton
            onClick={() => setDrawer(false)}
            sx={{ color: secondaryText }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ px: 2 }}>
          {LINKS.map((l) => (
            <ListItem
              key={l.label}
              onClick={() => go(l.id)}
              sx={{
                cursor: 'pointer',
                borderRadius: '10px',
                mb: 0.5,
                py: 1.5,
                color: secondaryText,

                '&:hover': {
                  background: isDark
                    ? 'rgba(255,255,255,.05)'
                    : 'rgba(0,0,0,.05)',

                  color: textColor,
                },
              }}
            >
              {l.label}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}