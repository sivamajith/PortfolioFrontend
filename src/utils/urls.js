// Normalize media URLs returned by the backend.
export function absUrl(u){
  if(!u) return '';
  try{
    if(u.startsWith('http') || u.startsWith('data:')) return u;
    // If backend provided a full API URL via VITE_API_URL, use its origin
    const api = import.meta.env.VITE_API_URL || '';
    if(u.startsWith('/')){
      if(api){
        // remove trailing /api if present
        const base = api.replace(/\/api\/?$/,'');
        return (base.endsWith('/')?base.slice(0,-1):base) + u;
      }
      return window.location.origin + u;
    }
    return u;
  }catch(e){
    return u;
  }
}

export default absUrl;
