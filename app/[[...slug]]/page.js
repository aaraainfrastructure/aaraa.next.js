import {notFound} from 'next/navigation';
import fs from 'node:fs/promises';
import path from 'node:path';
import LegacyDocument from '@/components/LegacyDocument';
import BlogPostDetail from '@/components/BlogPostDetail';
import {loadLegacyPage} from '@/lib/legacy-page';
import {parseBlogPost} from '@/lib/blog-parser';

export async function generateMetadata({params}){
  const {slug=[]}=await params;
  const p=await loadLegacyPage(slug);
  if(!p)return{};
  
  const pathName = slug.join('/');
  let ogImage = '/logo.png';
  
  if (p.sourcePath && (p.sourcePath.startsWith('blog-post-') || p.sourcePath.startsWith('potluck-celebration-'))) {
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

  return {
    title: { absolute: p.title },
    description: p.description || undefined,
    alternates: p.canonical ? { canonical: p.canonical } : undefined,
    openGraph: {
      title: p.title,
      description: p.description || undefined,
      url: `https://aaraainfrastructure.com/${pathName}`,
      siteName: 'AARAA Infrastructure',
      images: [
        {
          url: ogImage.startsWith('http') ? ogImage : `https://aaraainfrastructure.com${ogImage.startsWith('/') ? '' : '/'}${ogImage}`,
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
      images: [ogImage.startsWith('http') ? ogImage : `https://aaraainfrastructure.com${ogImage.startsWith('/') ? '' : '/'}${ogImage}`],
    }
  };
}

export default async function Page({params}){
  const {slug=[]}=await params;
  const p=await loadLegacyPage(slug);
  if(!p)notFound();

  // Intercept blog posts and render the redesigned premium layout
  if (p.sourcePath && (p.sourcePath.startsWith('blog-post-') || p.sourcePath.startsWith('potluck-celebration-'))) {
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
