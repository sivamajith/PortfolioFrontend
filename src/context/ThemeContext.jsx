import React, { createContext, useState, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme, CssBaseline } from '@mui/material';

const ThemeContext = createContext();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FF4757' },
    secondary: { main: '#4ECDC4' },
    background: { default: '#0b0b0b', paper: '#1a1a1a' },
    text: { primary: '#F0EDE8', secondary: '#888' }
  },
  typography: { fontFamily: 'Space Grotesk, sans-serif' },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0b0b0b',
          color: '#F0EDE8',
          transition: 'all 0.3s ease',
        },
        html: {
          scrollBehavior: 'smooth',
        }
      }
    }
  }
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#FF4757' },
    secondary: { main: '#4ECDC4' },
    background: { default: '#f5f5f5', paper: '#ffffff' },
    text: { primary: '#1a1a1a', secondary: '#666' }
  },
  typography: { fontFamily: 'Space Grotesk, sans-serif' },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#f5f5f5',
          color: '#1a1a1a',
          transition: 'all 0.3s ease',
        },
        html: {
          scrollBehavior: 'smooth',
        }
      }
    }
  }
});

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme-mode');
    return saved !== null ? saved === 'dark' : true;
  });

  useEffect(() => {
    localStorage.setItem('theme-mode', isDark ? 'dark' : 'light');
    // Apply theme class to document
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Add global styles for smooth transitions
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * {
        transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
      }
      [data-theme="dark"] {
        color-scheme: dark;
      }
      [data-theme="light"] {
        color-scheme: light;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const toggleTheme = () => setIsDark(p => !p);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <MUIThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used inside ThemeProvider');
  return context;
}
