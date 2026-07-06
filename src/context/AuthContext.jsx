import React,{createContext,useContext,useState,useEffect} from 'react';
import api from '../utils/api';
const Ctx=createContext(null);
export function AuthProvider({children}){
  const[user,setUser]=useState(null);
  const[loading,setLoading]=useState(true);
  useEffect(()=>{ const t=localStorage.getItem('pt'),u=localStorage.getItem('pu'); if(t&&u){setUser(JSON.parse(u));api.get('/auth/verify').catch(()=>{localStorage.removeItem('pt');localStorage.removeItem('pu');setUser(null);});} setLoading(false); },[]);
  const login=async(username,password)=>{ const r=await api.post('/auth/login',{username,password}); localStorage.setItem('pt',r.data.token); localStorage.setItem('pu',JSON.stringify({username:r.data.username})); setUser({username:r.data.username}); return r.data; };
  const logout=()=>{ localStorage.removeItem('pt');localStorage.removeItem('pu');setUser(null); };
  return <Ctx.Provider value={{user,loading,login,logout}}>{children}</Ctx.Provider>;
}
export const useAuth=()=>useContext(Ctx);
