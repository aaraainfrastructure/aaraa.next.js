import fs from 'node:fs/promises';
import path from 'node:path';
const ROOT=path.join(process.cwd(),'legacy-pages');
const decode=(v='')=>v.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&lt;/g,'<').replace(/&gt;/g,'>');
function attr(tag,name){const m=tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`,'i'));return m?decode(m[1]):''}

function resolveRelative(sourcePath, href) {
  if (!href) return href;
  if (href.startsWith('/') || href.startsWith('http://') || href.startsWith('https://') || href.startsWith('//') || href.startsWith('data:') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
    return href;
  }
  const cleanHref = href.replace(/\\/g, '/');
  let finalHref = cleanHref;
  if (cleanHref.startsWith('..css/')) {
    finalHref = '../css/' + cleanHref.substring(6);
  } else if (cleanHref.startsWith('..js/')) {
    finalHref = '../js/' + cleanHref.substring(5);
  } else if (cleanHref.startsWith('..image/')) {
    finalHref = '../image/' + cleanHref.substring(8);
  }
  const fileDir = path.dirname(sourcePath).replace(/\\/g, '/');
  const resolved = path.posix.resolve('/' + (fileDir === '.' ? '' : fileDir), finalHref);
  return resolved;
}

function resolveBodyUrls(bodyHtml, sourcePath) {
  return bodyHtml.replace(/\b(src|href)\s*=\s*(["'])([^>]*?)\2/gi, (match, attrName, quote, value) => {
    if (value.startsWith('/') || value.startsWith('http://') || value.startsWith('https://') || value.startsWith('//') || value.startsWith('#') || value.startsWith('mailto:') || value.startsWith('tel:') || value.startsWith('javascript:')) {
      return match;
    }
    const resolved = resolveRelative(sourcePath, value);
    return `${attrName}=${quote}${resolved}${quote}`;
  });
}

function candidates(parts=[]){const raw=parts.map(decodeURIComponent).join('/');if(raw.includes('..')||raw.includes('\\')||raw.includes('\0'))return[];if(!raw)return['index.html'];const s=raw.replace(/^\/+|\/+$/g,'');return s.endsWith('.html')?[s]:[`${s}.html`,`${s}/index.html`]}
export async function loadLegacyPage(parts=[]){for(const rel of candidates(parts)){const file=path.resolve(ROOT,rel);if(!file.startsWith(path.resolve(ROOT)+path.sep))continue;try{return parse(await fs.readFile(file,'utf8'),rel)}catch(e){if(e?.code!=='ENOENT')throw e}}return null}
function parse(html,sourcePath){
  const head=html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1]||'';
  let body=html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]||html;
  const bodyAttrs=html.match(/<body([^>]*)>/i)?.[1]||'';
  
  const stylesheets=[...head.matchAll(/<link\b[^>]*rel=["'][^"']*stylesheet[^"']*["'][^>]*>/gi)]
    .map(x=>({href:resolveRelative(sourcePath, attr(x[0],'href')),media:attr(x[0],'media')||undefined}))
    .filter(x=>x.href);
    
  const inlineStyles=[...head.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)].map(x=>x[1]);
  
  const scripts=[];
  const collect=m=>m.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi,(_,a,code)=>{
    const tag=`<script ${a}>`;
    const rawSrc=attr(tag,'src');
    scripts.push({
      src:rawSrc ? resolveRelative(sourcePath, rawSrc) : null,
      type:attr(tag,'type')||null,
      async:/\basync\b/i.test(a),
      defer:/\bdefer\b/i.test(a),
      code:code||''
    });
    return''
  });
  
  collect(head);
  body=collect(body);
  body=resolveBodyUrls(body, sourcePath);
  
  const title=decode(head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim()||'AARAA Infrastructure');
  const mt=head.match(/<meta\b[^>]*name=["']description["'][^>]*>/i)?.[0]||'';
  const ct=head.match(/<link\b[^>]*rel=["']canonical["'][^>]*>/i)?.[0]||'';
  return {
    sourcePath,
    title,
    description:attr(mt,'content'),
    canonical:attr(ct,'href'),
    bodyClass:attr(`<body ${bodyAttrs}>`,'class'),
    body,
    stylesheets,
    inlineStyles,
    scripts
  };
}
