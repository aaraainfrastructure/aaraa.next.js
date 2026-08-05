'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
export default function LegacyDocument({page}){
  const pathname=usePathname();
  useEffect(()=>{
    document.body.className=page.bodyClass||'';
    const mounted=[];
    let cancelled=false;
    (async()=>{
      // Ensure window.tailwind is defined to prevent ReferenceError when executing inline config
      window.tailwind = window.tailwind || {};

      const scripts = [...page.scripts];
      // Find the Tailwind configuration script
      const configIndex = scripts.findIndex(item => !item.src && item.code && item.code.includes('tailwind.config'));
      if (configIndex > -1) {
        const configItem = scripts.splice(configIndex, 1)[0];
        // Run the configuration script first
        scripts.unshift(configItem);
      }

      for(const item of scripts){
        if(cancelled)break;
        const s=document.createElement('script');
        if(item.type)s.type=item.type;
        if(item.src)s.src=item.src;
        if(item.async)s.async=true;
        if(item.defer)s.defer=true;
        if(!item.src)s.text=item.code;
        document.body.appendChild(s);
        mounted.push(s);
        if(item.src&&!item.async&&!item.defer&&item.type!=='module')await new Promise(r=>{s.onload=r;s.onerror=r})
      }
      window.dispatchEvent(new Event('load'));
      document.dispatchEvent(new Event('DOMContentLoaded'))
    })();
    return()=>{
      cancelled=true;
      mounted.forEach(n=>n.remove());
      document.body.className=''
    }
  },[pathname,page]);
  return <div data-legacy-route={page.sourcePath} dangerouslySetInnerHTML={{__html:page.body}}/>
}
