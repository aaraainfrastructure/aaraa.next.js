import path from 'node:path';

// Decode HTML entities
const decode = (v = '') => v
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>');

function attr(tag, name) {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, 'i'));
  return m ? decode(m[1]) : '';
}

export function parseBlogPost(html, sourcePath) {
  // 1. Extract Title
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  let title = h1Match ? h1Match[1].replace(/<[^>]*>/g, '').trim() : 'AARAA Infrastructure Blog';
  title = decode(title);

  // 2. Extract Category
  // Look for the category badge
  const catMatch = html.match(/<span[^>]*class="[^"]*bg-primary\/10[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
  const category = catMatch ? catMatch[1].replace(/<[^>]*>/g, '').trim() : 'Infrastructure';

  // 3. Extract Subtitle
  const subMatch = html.match(/<p class="[^"]*text-secondary mb-8[^"]*">([\s\S]*?)<\/p>/i) || 
                   html.match(/<p class="[^"]*font-headline-md text-headline-md text-secondary[^"]*">([\s\S]*?)<\/p>/i) ||
                   html.match(/<p class="font-headline-md text-headline-md text-secondary[^"]*">([\s\S]*?)<\/p>/i);
  const subtitle = subMatch ? decode(subMatch[1].replace(/<[^>]*>/g, '').trim()) : '';

  // 4. Extract Meta Information
  const dateMatch = html.match(/Published[\s\S]*?<p class="[^"]*font-semibold[^"]*">([\s\S]*?)<\/p>/i) ||
                    html.match(/Date<\/div>[\s\S]*?<div[^>]*>([\s\S]*?)<\/div>/i);
  const date = dateMatch ? dateMatch[1].replace(/<[^>]*>/g, '').trim() : 'July 2026';

  const readTimeMatch = html.match(/Read Time[\s\S]*?<p class="[^"]*font-semibold[^"]*">([\s\S]*?)<\/p>/i);
  const readTime = readTimeMatch ? readTimeMatch[1].trim() : '4 min read';

  const locationMatch = html.match(/Location[\s\S]*?<p class="[^"]*font-semibold[^"]*">([\s\S]*?)<\/p>/i) ||
                        html.match(/Venue<\/div>[\s\S]*?<div[^>]*>([\s\S]*?)<\/div>/i);
  const location = locationMatch ? locationMatch[1].replace(/<[^>]*>/g, '').trim() : 'Chennai, India';

  // 5. Extract Hero Image
  // Find first big image
  const heroImageMatch = html.match(/<div class="[^"]*h-\[400px\][^"]*">[\s\S]*?<img[^>]*src="([^"]*)"/i) ||
                         html.match(/<img class="[^"]*object-cover[^"]*" src="([^"]*)"[^>]*alt="[^"]*"/i);
  let heroImage = heroImageMatch ? heroImageMatch[1] : '/image/blog/blog2.jpg';
  if (heroImage.startsWith('..')) {
    heroImage = heroImage.substring(2);
  }
  if (!heroImage.startsWith('/')) {
    heroImage = '/' + heroImage;
  }

  // 6. Extract Article HTML
  const startTag = '<article class="lg:col-span-6 space-y-16">';
  const endTag = '</article>';
  const startIndex = html.indexOf(startTag);
  const endIndex = html.indexOf(endTag, startIndex);
  let articleHtml = '';
  if (startIndex !== -1 && endIndex !== -1) {
    articleHtml = html.substring(startIndex + startTag.length, endIndex);
  } else {
    // Fallback search
    const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
    articleHtml = articleMatch ? articleMatch[1] : '';
  }

  // 7. Extract Quote
  const quoteMatch = html.match(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i);
  const quoteText = quoteMatch ? quoteMatch[1].replace(/<[^>]*>/g, '').trim() : '';
  const citeMatch = html.match(/<cite[^>]*>([\s\S]*?)<\/cite>/i);
  const quoteCite = citeMatch ? citeMatch[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() : '';

  // 8. Extract Gallery Images
  const imgRegex = /<img\b[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi;
  let imgMatch;
  const galleryImages = [];
  while ((imgMatch = imgRegex.exec(articleHtml)) !== null) {
    let src = imgMatch[1];
    if (src.startsWith('..')) src = src.substring(2);
    if (!src.startsWith('/')) src = '/' + src;
    
    // Ignore sidebar, author, turnstile or common logos
    if (!src.includes('logo') && !src.includes('brand') && !src.includes('avatar') && !src.includes('turnstile') && !src.includes('blog-post-') && !src.includes('raje')) {
      galleryImages.push({
        src,
        alt: imgMatch[2] || 'Gallery Image'
      });
    }
  }

  // 9. Extract Table of Contents
  const tocLinks = [];
  const tocRegex = /<a class="[^"]*" href="#([^"]*)">([\s\S]*?)<\/a>/gi;
  let tocMatch;
  while ((tocMatch = tocRegex.exec(html)) !== null) {
    const text = tocMatch[2].replace(/<[^>]*>/g, '').trim();
    if (text && !text.includes('Recent Stories') && !text.includes('Explore')) {
      tocLinks.push({
        id: tocMatch[1],
        title: text
      });
    }
  }

  // 10. Extract Video (if any iframe or video tag)
  const videoMatch = html.match(/<iframe[^>]*src="([^"]*)"[^>]*>/i);
  const videoSrc = videoMatch ? videoMatch[1] : (html.match(/<source[^>]*src="([^"]*)"/i)?.[1] || html.match(/<video[^>]*src="([^"]*)"/i)?.[1] || null);

  return {
    sourcePath,
    title,
    category,
    subtitle,
    date,
    readTime,
    location,
    heroImage,
    quoteText,
    quoteCite,
    galleryImages,
    tocLinks,
    videoSrc,
    articleHtml
  };
}
