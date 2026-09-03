'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

export default function LegacyDocument({page}){
  const pathname = usePathname();

  useEffect(() => {
    document.body.className = page.bodyClass || '';
    const mounted = [];
    const activeIntervals = new Set();
    const activeTimeouts = new Set();
    const activeWindowListeners = [];
    const activeDocListeners = [];
    let cancelled = false;

    // Preserve original timer and listener methods
    const originalSetInterval = window.setInterval;
    const originalClearInterval = window.clearInterval;
    const originalSetTimeout = window.setTimeout;
    const originalClearTimeout = window.clearTimeout;
    const originalWinAddEvt = window.addEventListener;
    const originalWinRemEvt = window.removeEventListener;
    const originalDocAddEvt = document.addEventListener;
    const originalDocRemEvt = document.removeEventListener;

    // Track and guard setInterval
    window.setInterval = function(fn, delay, ...args) {
      const wrappedFn = (...fnArgs) => {
        if (cancelled) return;
        try {
          if (typeof fn === 'function') fn(...fnArgs);
          else if (typeof fn === 'string') new Function(fn)();
        } catch (err) {
          if (err instanceof TypeError && (err.message.includes('null') || err.message.includes('undefined'))) {
            console.warn('[LegacyScript Guard] Prevented unhandled null DOM access in setInterval callback:', err.message);
            return;
          }
          throw err;
        }
      };
      const id = originalSetInterval.call(window, wrappedFn, delay, ...args);
      activeIntervals.add(id);
      return id;
    };

    window.clearInterval = function(id) {
      activeIntervals.delete(id);
      return originalClearInterval.call(window, id);
    };

    // Track and guard setTimeout
    window.setTimeout = function(fn, delay, ...args) {
      let id;
      const wrappedFn = (...fnArgs) => {
        if (id) activeTimeouts.delete(id);
        if (cancelled) return;
        try {
          if (typeof fn === 'function') fn(...fnArgs);
          else if (typeof fn === 'string') new Function(fn)();
        } catch (err) {
          if (err instanceof TypeError && (err.message.includes('null') || err.message.includes('undefined'))) {
            console.warn('[LegacyScript Guard] Prevented unhandled null DOM access in setTimeout callback:', err.message);
            return;
          }
          throw err;
        }
      };
      id = originalSetTimeout.call(window, wrappedFn, delay, ...args);
      activeTimeouts.add(id);
      return id;
    };

    window.clearTimeout = function(id) {
      activeTimeouts.delete(id);
      return originalClearTimeout.call(window, id);
    };

    // Track and guard window event listeners
    window.addEventListener = function(type, listener, options) {
      const safeListener = (evt) => {
        if (cancelled) return;
        try {
          if (typeof listener === 'function') listener(evt);
          else if (listener && typeof listener.handleEvent === 'function') listener.handleEvent(evt);
        } catch (err) {
          if (err instanceof TypeError && (err.message.includes('null') || err.message.includes('undefined'))) {
            console.warn(`[LegacyScript Guard] Prevented unhandled null DOM access in window.${type} listener:`, err.message);
            return;
          }
          throw err;
        }
      };
      activeWindowListeners.push({ type, original: listener, safe: safeListener, options });
      return originalWinAddEvt.call(window, type, safeListener, options);
    };

    window.removeEventListener = function(type, listener, options) {
      const idx = activeWindowListeners.findIndex(l => l.type === type && l.original === listener);
      if (idx > -1) {
        const item = activeWindowListeners.splice(idx, 1)[0];
        return originalWinRemEvt.call(window, type, item.safe, options);
      }
      return originalWinRemEvt.call(window, type, listener, options);
    };

    // Track and guard document event listeners
    document.addEventListener = function(type, listener, options) {
      const safeListener = (evt) => {
        if (cancelled) return;
        try {
          if (typeof listener === 'function') listener(evt);
          else if (listener && typeof listener.handleEvent === 'function') listener.handleEvent(evt);
        } catch (err) {
          if (err instanceof TypeError && (err.message.includes('null') || err.message.includes('undefined'))) {
            console.warn(`[LegacyScript Guard] Prevented unhandled null DOM access in document.${type} listener:`, err.message);
            return;
          }
          throw err;
        }
      };
      activeDocListeners.push({ type, original: listener, safe: safeListener, options });
      return originalDocAddEvt.call(document, type, safeListener, options);
    };

    document.removeEventListener = function(type, listener, options) {
      const idx = activeDocListeners.findIndex(l => l.type === type && l.original === listener);
      if (idx > -1) {
        const item = activeDocListeners.splice(idx, 1)[0];
        return originalDocRemEvt.call(document, type, item.safe, options);
      }
      return originalDocRemEvt.call(document, type, listener, options);
    };

    (async () => {
      // Blocking scripts preloading
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

      // Clean up all timers and intervals created by legacy scripts on route unmount
      activeIntervals.forEach(id => originalClearInterval.call(window, id));
      activeTimeouts.forEach(id => originalClearTimeout.call(window, id));
      activeIntervals.clear();
      activeTimeouts.clear();

      // Clean up all event listeners attached by legacy scripts on route unmount
      activeWindowListeners.forEach(l => originalWinRemEvt.call(window, l.type, l.safe, l.options));
      activeWindowListeners.length = 0;
      activeDocListeners.forEach(l => originalDocRemEvt.call(document, l.type, l.safe, l.options));
      activeDocListeners.length = 0;

      // Restore native window & document methods
      window.setInterval = originalSetInterval;
      window.clearInterval = originalClearInterval;
      window.setTimeout = originalSetTimeout;
      window.clearTimeout = originalClearTimeout;
      window.addEventListener = originalWinAddEvt;
      window.removeEventListener = originalWinRemEvt;
      document.addEventListener = originalDocAddEvt;
      document.removeEventListener = originalDocRemEvt;

      mounted.forEach(n => n.remove());
      document.body.className = '';
    };
  }, [pathname, page]);

  return <div data-legacy-route={page.sourcePath} dangerouslySetInnerHTML={{__html: page.body}}/>;
}
