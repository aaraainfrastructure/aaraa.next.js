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
  // Find first big image or blog image
  const heroImageMatch = html.match(/<div class="[^"]*h-\[\d+px\][^"]*">[\s\S]*?<img[^>]*src="([^"]*)"/i) ||
                         html.match(/<img [^>]*src="([^"]*\/image\/blog\/[^"]*)"/i) ||
                         html.match(/<img class="[^"]*object-cover[^"]*" src="([^"]*)"[^>]*alt="[^"]*"/i);
  let heroImage = heroImageMatch ? heroImageMatch[1] : '';
  if (heroImage.startsWith('..')) {
    heroImage = heroImage.substring(2);
  }
  if (heroImage && !heroImage.startsWith('/')) {
    heroImage = '/' + heroImage;
  }
  if (!heroImage) {
    heroImage = '/logo.png';
  }

  // 6. Extract Article HTML
  const articleMatch = html.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i);
  let articleHtml = articleMatch ? articleMatch[1] : '';

  // Strip any residual <aside> tags from articleHtml to prevent un-styled TOC links in prose text
  articleHtml = articleHtml.replace(/<aside\b[^>]*>[\s\S]*?<\/aside>/gi, '');

  // 7. Extract Quote
  const quoteMatch = html.match(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/i);
  const quoteText = quoteMatch ? quoteMatch[1].replace(/<[^>]*>/g, '').trim() : '';
  const citeMatch = html.match(/<cite[^>]*>([\s\S]*?)<\/cite>/i);
  const quoteCite = citeMatch ? citeMatch[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim() : '';

  // 8. Extract Gallery Images (from articleHtml or whole html)
  const searchHtmlForImages = articleHtml || html;
  const imgRegex = /<img\b[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi;
  let imgMatch;
  const galleryImages = [];
  while ((imgMatch = imgRegex.exec(searchHtmlForImages)) !== null) {
    let src = imgMatch[1];
    if (src.startsWith('..')) src = src.substring(2);
    if (!src.startsWith('/')) src = '/' + src;
    
    // Ignore hero image, sidebar, author, turnstile or common logos
    if (!src.includes('logo') && !src.includes('brand') && !src.includes('avatar') && !src.includes('turnstile') && !src.includes('blog-post-') && !src.includes('raje') && src !== heroImage) {
      galleryImages.push({
        src,
        alt: imgMatch[2] || 'Gallery Image'
      });
    }
  }

  // Clean up standalone gallery <img> tags from articleHtml so they don't render twice in prose
  galleryImages.forEach(gImg => {
    const escapedSrc = gImg.src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const removeImgRegex = new RegExp(`<img\\b[^>]*src=["'](?:\\.\\.)?${escapedSrc}["'][^>]*>`, 'gi');
    articleHtml = articleHtml.replace(removeImgRegex, '');
  });

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

  if (videoSrc) {
    let cleanVideoSrc = videoSrc;
    if (cleanVideoSrc.startsWith('..')) cleanVideoSrc = cleanVideoSrc.substring(2);
    if (!cleanVideoSrc.startsWith('/')) cleanVideoSrc = '/' + cleanVideoSrc;

    if (!galleryImages.some(item => item.src === cleanVideoSrc)) {
      galleryImages.push({
        type: 'video',
        src: cleanVideoSrc,
        alt: 'Onam Celebration Video Highlights'
      });
    }
  }

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
