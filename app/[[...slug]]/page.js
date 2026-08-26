import {notFound, redirect} from 'next/navigation';
import fs from 'node:fs/promises';
import path from 'node:path';
import LegacyDocument from '@/components/LegacyDocument';
import BlogPostDetail from '@/components/BlogPostDetail';
import {loadLegacyPage} from '@/lib/legacy-page';
import {parseBlogPost} from '@/lib/blog-parser';

const JUNK_FILES = new Set([
  'gpt.html',
  'chat.html',
  'admin-dashboard.html',
  'career_old.html',
  'careesr.html',
  '25m.html'
]);

function isJunkOrUtility(sourcePath = '') {
  const norm = sourcePath.replace(/\\/g, '/');
  if (JUNK_FILES.has(norm)) return true;
  if (norm.startsWith('gemini-code-') || norm.startsWith('ai_studio_code')) return true;
  if (norm.startsWith('e-mail-sign/') || norm.startsWith('aaraa-forms/') || norm.startsWith('forms/')) return true;
  return false;
}

export async function generateStaticParams() {
  const ROOT = path.join(process.cwd(), 'legacy-pages');
  const params = [];

  async function walkDir(dir) {
    let entries = [];
    try {
      entries = await fs.readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walkDir(fullPath);
      } else if (entry.name.endsWith('.html')) {
        const rel = path.relative(ROOT, fullPath).replace(/\\/g, '/');
        if (isJunkOrUtility(rel)) continue;
        
        let clean = rel.replace(/\.html$/, '');
        if (clean.endsWith('/index')) clean = clean.replace(/\/index$/, '');
        if (clean === 'index') continue; // Root homepage is handled by Next.js app/page or index

        params.push({ slug: clean.split('/') });
      }
    }
  }

  await walkDir(ROOT);
  return params;
}

export async function generateMetadata({params}){
  const {slug=[]}=await params;
  
  // If slug has .html extension, redirect to clean slug
  const fullSlugStr = slug.join('/');
  if (fullSlugStr.endsWith('.html')) {
    const cleanSlugStr = fullSlugStr.replace(/\.html$/, '');
    redirect(`/${cleanSlugStr}`);
  }

  const p=await loadLegacyPage(slug);
  if(!p)return{};
  
  if (isJunkOrUtility(p.sourcePath)) {
    return {
      robots: { index: false, follow: false }
    };
  }

  const pathName = slug.join('/');
  let ogImage = '/logo.png';
  
  if (p.sourcePath && (p.sourcePath.startsWith('blog-post-') || p.sourcePath.startsWith('potluck-celebration-') || p.sourcePath.startsWith('blog/'))) {
    try {
      const ROOT = path.join(process.cwd(), 'legacy-pages');
      const file = path.resolve(ROOT, p.sourcePath);
      const rawHtml = await fs.readFile(file, 'utf8');
      const blogData = parseBlogPost(rawHtml, p.sourcePath);
      if (blogData.heroImage) {
        ogImage = blogData.heroImage;
      }
    } catch (err) {
      console.error("Failed to parse blog post image for metadata", err);
    }
  }

  // Ensure clean canonical URL without .html and with proper domain
  let canonicalUrl = p.canonical;
  if (!canonicalUrl || canonicalUrl.endsWith('.html') || !canonicalUrl.startsWith('https://www.aaraainfrastructure.com')) {
    const cleanPath = pathName.replace(/\.html$/, '');
    canonicalUrl = `https://www.aaraainfrastructure.com${cleanPath ? '/' + cleanPath : ''}`;
  }

  const fullOgImage = ogImage.startsWith('http') ? ogImage : `https://www.aaraainfrastructure.com${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

  return {
    title: { absolute: p.title },
    description: p.description || undefined,
    alternates: { canonical: canonicalUrl },
    robots: { index: true, follow: true },
    openGraph: {
      title: p.title,
      description: p.description || undefined,
      url: canonicalUrl,
      siteName: 'AARAA Infrastructure',
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: p.title,
        }
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: p.title,
      description: p.description || undefined,
      images: [fullOgImage],
    }
  };
}

export default async function Page({params}){
  const {slug=[]}=await params;
  
  const fullSlugStr = slug.join('/');
  if (fullSlugStr.endsWith('.html')) {
    const cleanSlugStr = fullSlugStr.replace(/\.html$/, '');
    redirect(`/${cleanSlugStr}`);
  }

  const p=await loadLegacyPage(slug);
  if(!p)notFound();

  if (isJunkOrUtility(p.sourcePath)) {
    notFound();
  }

  // Intercept blog posts and render the redesigned premium layout
  if (p.sourcePath && (p.sourcePath.startsWith('blog-post-') || p.sourcePath.startsWith('potluck-celebration-') || p.sourcePath.startsWith('blog/'))) {
    try {
      const ROOT = path.join(process.cwd(), 'legacy-pages');
      const file = path.resolve(ROOT, p.sourcePath);
      const rawHtml = await fs.readFile(file, 'utf8');
      const blogData = parseBlogPost(rawHtml, p.sourcePath);
      
      return (
        <>
          <link rel="stylesheet" href="/css/blog-premium.css" />
          <BlogPostDetail page={blogData} />
        </>
      );
    } catch (err) {
      console.error("Failed to render premium blog layout, falling back to legacy", err);
    }
  }

  return (
    <>
      {p.stylesheets.map((s,i)=><link key={`${s.href}-${i}`} rel="stylesheet" href={s.href} media={s.media}/>)}
      {p.inlineStyles.map((css,i)=><style key={i} dangerouslySetInnerHTML={{__html:css}}/>)}
      <LegacyDocument page={p}/>
    </>
  );
}

