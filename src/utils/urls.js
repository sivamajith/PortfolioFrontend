// Normalize media URLs returned by the backend.
export function absUrl(u){
  if(!u) return '';
  try{
    if(u.startsWith('data:')) return u;
    if(u.startsWith('http')){
      // Upgrade http to https when page is served over https to avoid mixed-content
      try{
        if(window && window.location && window.location.protocol === 'https:' && u.startsWith('http://')){
          return u.replace(/^http:\/\//, 'https://');
        }
      }catch(e){ }
      return u;
    }

    const backendBase = (import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || '')
      .replace(/\/api\/?$/,'')
      .replace(/\/$/, '');

    if(u.startsWith('/')){
      if(backendBase){
        return backendBase + u;
      }
      return window.location.origin + u;
    }
    return u;
  }catch(e){
    return u;
  }
}

export default absUrl;
