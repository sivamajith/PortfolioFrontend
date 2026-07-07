// utils/api.js
import axios from 'axios';
const api = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true 
});

// Helpful warning in production when VITE_API_URL wasn't provided
try {
  if (import.meta.env.MODE === 'production' && !import.meta.env.VITE_API_URL) {
    console.warn('⚠️ VITE_API_URL is not set for production — API requests will use relative \'/api\' and likely fail. Set VITE_API_URL in your hosting env (Vercel).');
  }
} catch (e) {}

api.interceptors.request.use(c => { 
  const t = localStorage.getItem('pt'); 
  if (t) {
    c.headers.Authorization = `Bearer ${t}`;
    console.log('🔐 Token added to request');
  } else {
    console.warn('⚠️ No token in localStorage');
  }
  return c; 
});

api.interceptors.response.use(
  r => r, 
  e => { 
    // Log extra context to help debugging network/CORS issues
    try { console.error('API error:', e?.config?.url || '<unknown url>', e?.response?.status, e?.message); } catch (err) {}
    if (e.response?.status === 401) {
      console.error('❌ Auth failed, clearing storage');
      localStorage.removeItem('pt'); 
      localStorage.removeItem('pu'); 
    }
    return Promise.reject(e);
  }
);

export default api;
