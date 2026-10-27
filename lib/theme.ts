export const THEME_KEY = "ezyev-theme";

export const INTRO_KEY = "ezyev-intro";

/*
  Runs in <head> before paint:
  - marks JS as available so scroll reveals can start hidden
  - applies a saved dark theme so it never flashes light first
  - plays the branded intro once per session (skipped for reduced motion)
*/
export const themeInitScript = `(function(){var d=document.documentElement;d.classList.add('js');try{if(localStorage.getItem('${THEME_KEY}')==='dark')d.dataset.theme='dark'}catch(e){}try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches&&!sessionStorage.getItem('${INTRO_KEY}')){d.classList.add('intro');sessionStorage.setItem('${INTRO_KEY}','1')}}catch(e){}})()`;
