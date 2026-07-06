import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: { default: '#0C0C0C', paper: '#141414' },
    primary: { main: '#FF4757', contrastText: '#fff' },
    secondary: { main: '#F0EDE8' },
    text: { primary: '#F0EDE8', secondary: '#666' },
    divider: 'rgba(255,255,255,0.06)',
  },
  typography: {
    fontFamily: '"Outfit", sans-serif',
    h1: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, letterSpacing: '-0.03em' },
    h2: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, letterSpacing: '-0.025em' },
    h3: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 700, letterSpacing: '-0.02em' },
    h4: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    h5: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Space Grotesk", sans-serif', fontWeight: 600 },
    button: { fontFamily: '"Outfit", sans-serif', fontWeight: 600, letterSpacing: '0.04em' },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: '100px', padding: '10px 26px', fontWeight: 600, cursor: 'none' },
        containedPrimary: { background: '#FF4757', color: '#fff', '&:hover': { background: '#ff6473' } },
      },
    },
    MuiChip: { styleOverrides: { root: { borderRadius: '100px', fontFamily: '"Outfit", sans-serif', fontWeight: 500 } } },
    MuiPaper: { styleOverrides: { root: { backgroundImage: 'none', background: '#141414', border: '1px solid rgba(255,255,255,0.06)' } } },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px', background: 'rgba(255,255,255,0.03)',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
            '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
            '&.Mui-focused fieldset': { borderColor: '#FF4757' },
          },
        },
      },
    },
    MuiDialog: { 
      styleOverrides: { 
        paper: { 
          background: '#141414', 
          border: '1px solid rgba(255,255,255,0.08)',
          '& video': {
            width: '100%',
            height: 'auto',
            display: 'block',
            background: '#000',
          }
        } 
      } 
    },
  },
});

export default theme;
