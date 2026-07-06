// utils/api.js
import axios from 'axios';
const api = axios.create({ 
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true 
});

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
    if (e.response?.status === 401) {
      console.error('❌ Auth failed, clearing storage');
      localStorage.removeItem('pt'); 
      localStorage.removeItem('pu'); 
    } 
    return Promise.reject(e); 
  }
);

export default api;
