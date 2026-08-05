'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

export default function LegacyDocument({page}){
  const pathname = usePathname();

  useEffect(() => {
    document.body.className = page.bodyClass || '';
    const mounted = [];
    let cancelled = false;

    (async () => {
      // Blocking scripts (no async/defer/module) are normally fetched one at a
      // time, waiting for each to load+execute before starting the next
      // network request. Preloading them all in parallel first removes that
      // network waterfall while keeping execution strictly in document order
      // below (so jQuery-plugin-style ordering dependencies still hold).
      const blockingSrcs = page.scripts
        .filter(item => item.src && !item.async && !item.defer && item.type !== 'module')
        .map(item => item.src);
      const uniqueSrcs = [...new Set(blockingSrcs)];

      await Promise.all(uniqueSrcs.map(src => new Promise(resolve => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'script';
        link.href = src;
        link.onload = resolve;
        link.onerror = resolve;
        document.head.appendChild(link);
        mounted.push(link);
      })));
      if (cancelled) return;

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

      for (const item of scripts) {
        if (cancelled) break;
        const s = document.createElement('script');
        if (item.type) s.type = item.type;
        if (item.src) s.src = item.src;
        if (item.async) s.async = true;
        if (item.defer) s.defer = true;
        if (!item.src) s.text = item.code;
        document.body.appendChild(s);
        mounted.push(s);
        if (item.src && !item.async && !item.defer && item.type !== 'module') {
          await new Promise(r => { s.onload = r; s.onerror = r; });
        }
      }
      window.dispatchEvent(new Event('load'));
      document.dispatchEvent(new Event('DOMContentLoaded'));
    })();

    return () => {
      cancelled = true;
      mounted.forEach(n => n.remove());
      document.body.className = '';
    };
  }, [pathname, page]);

  return <div data-legacy-route={page.sourcePath} dangerouslySetInnerHTML={{__html: page.body}}/>;
}
