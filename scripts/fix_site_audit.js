import fs from 'node:fs';
import path from 'node:path';

const LEGACY_DIR = path.join(process.cwd(), 'legacy-pages');

const REDIRECTS_MAP = {
  'projects-details.html': '/completed-projects',
  'projects-details': '/completed-projects',
  '/projects-details.html': '/completed-projects',
  '/projects-details': '/completed-projects',
  'ongoingorchid-project.html': '/project-details-orchid',
  'ongoingorchid-project': '/project-details-orchid',
  '/ongoingorchid-project.html': '/project-details-orchid',
  '/ongoingorchid-project': '/project-details-orchid',
  '140-6-mw-wind-solar-hybrid-power-project': '/140.6_MW_Capacity_Wind–Solar_Hybrid_Power_Project',
  '/140-6-mw-wind-solar-hybrid-power-project': '/140.6_MW_Capacity_Wind–Solar_Hybrid_Power_Project',
  'reliance-civil-interior-mep-fitout': '/commercial',
  '/reliance-civil-interior-mep-fitout': '/commercial',
  'Institutional-Development-VIBGYOR-Group-Hinjewadi-Pune.html': '/blog/institutional-development-vibgyor-group-hinjewadi',
  '/Institutional-Development-VIBGYOR-Group-Hinjewadi-Pune.html': '/blog/institutional-development-vibgyor-group-hinjewadi',
  'institutional-development-vibgyor-group-hinjewadi.html': '/blog/institutional-development-vibgyor-group-hinjewadi',
  '/institutional-development-vibgyor-group-hinjewadi.html': '/blog/institutional-development-vibgyor-group-hinjewadi',
  'contact.html': '/contact-us',
  '/contact.html': '/contact-us',
  'contact': '/contact-us',
  '/contact': '/contact-us',
  'privacy-policy': '/aaraa-privacy-policy',
  '/privacy-policy': '/aaraa-privacy-policy',
  'privacy-policy.html': '/aaraa-privacy-policy',
  '/privacy-policy.html': '/aaraa-privacy-policy',
  'about-us.html': '/about',
  '/about-us.html': '/about',
  'about-us': '/about',
  '/about-us': '/about',
  'about.html': '/about',
  '/about.html': '/about',
  'our-services.html': '/services',
  '/our-services.html': '/services',
  'our-services': '/services',
  '/our-services': '/services',
  'services.html': '/services',
  '/services.html': '/services',
  'careers.html': '/careers',
  '/careers.html': '/careers',
  'career.html': '/careers',
  '/career.html': '/careers',
  'leadership.html': '/about',
  '/leadership.html': '/about',
  'leadership-details.html': '/about',
  '/leadership-details.html': '/about',
  'home-2.html': '/',
  'home-3.html': '/',
  'home-4.html': '/',
  'home-5.html': '/',
  'why-choose-us.html': '/about',
  'core-values.html': '/about',
  'what-we-do.html': '/services',
  'what-we-do-detail.html': '/services',
  'working-process.html': '/about',
  'testimonials.html': '/about',
  'pricing.html': '/contact-us',
  'shop.html': '/',
  'shop-detail.html': '/',
  'index.html': '/',
  '404.html': '/',

  'epc-contractor-chennai': '/construction/epc-contractor-chennai',
  '/epc-contractor-chennai': '/construction/epc-contractor-chennai',
  'epc-contractor-chennai.html': '/construction/epc-contractor-chennai',
  '/epc-contractor-chennai.html': '/construction/epc-contractor-chennai',

  'peb-company-chennai': '/construction/peb-company-chennai',
  '/peb-company-chennai': '/construction/peb-company-chennai',
  'peb-company-chennai.html': '/construction/peb-company-chennai',
  '/peb-company-chennai.html': '/construction/peb-company-chennai',

  'solar-epc-company-chennai': '/construction/solar-epc-company-chennai',
  '/solar-epc-company-chennai': '/construction/solar-epc-company-chennai',
  'solar-epc-company-chennai.html': '/construction/solar-epc-company-chennai',
  '/solar-epc-company-chennai.html': '/construction/solar-epc-company-chennai',

  'mep-contractor-chennai': '/construction/mep-contractor-chennai',
  '/mep-contractor-chennai': '/construction/mep-contractor-chennai',
  'mep-contractor-chennai.html': '/construction/mep-contractor-chennai',
  '/mep-contractor-chennai.html': '/construction/mep-contractor-chennai',

  'steel-structure-contractor-chennai': '/construction/steel-structure-contractor-chennai',
  '/steel-structure-contractor-chennai': '/construction/steel-structure-contractor-chennai',
  'steel-structure-contractor-chennai.html': '/construction/steel-structure-contractor-chennai',
  '/steel-structure-contractor-chennai.html': '/construction/steel-structure-contractor-chennai',

  'warehouse-construction-chennai': '/construction/warehouse-construction-chennai',
  '/warehouse-construction-chennai': '/construction/warehouse-construction-chennai',
  'warehouse-construction-chennai.html': '/construction/warehouse-construction-chennai',
  '/warehouse-construction-chennai.html': '/construction/warehouse-construction-chennai',

  'industrial-construction-chennai': '/construction/industrial-construction-chennai',
  '/industrial-construction-chennai': '/construction/industrial-construction-chennai',
  'industrial-construction-chennai.html': '/construction/industrial-construction-chennai',
  '/industrial-construction-chennai.html': '/construction/industrial-construction-chennai',

  'institutional-construction-chennai': '/construction/institutional-construction-chennai',
  '/institutional-construction-chennai': '/construction/institutional-construction-chennai',
  'institutional-construction-chennai.html': '/construction/institutional-construction-chennai',
  '/institutional-construction-chennai.html': '/construction/institutional-construction-chennai',

  'infrastructure-construction-chennai': '/construction/infrastructure-construction-chennai',
  '/infrastructure-construction-chennai': '/construction/infrastructure-construction-chennai',
  'infrastructure-construction-chennai.html': '/construction/infrastructure-construction-chennai',
  '/infrastructure-construction-chennai.html': '/construction/infrastructure-construction-chennai',

  'interior-fit-out-contractor-chennai': '/construction/interior-fit-out-contractor-chennai',
  '/interior-fit-out-contractor-chennai': '/construction/interior-fit-out-contractor-chennai',
  'interior-fit-out-contractor-chennai.html': '/construction/interior-fit-out-contractor-chennai',
  '/interior-fit-out-contractor-chennai.html': '/construction/interior-fit-out-contractor-chennai',

  'renovation-contractor-chennai': '/construction/renovation-contractor-chennai',
  '/renovation-contractor-chennai': '/construction/renovation-contractor-chennai',
  'renovation-contractor-chennai.html': '/construction/renovation-contractor-chennai',
  '/renovation-contractor-chennai.html': '/construction/renovation-contractor-chennai',

  'commercial-construction-chennai': '/construction/commercial-construction-chennai',
  '/commercial-construction-chennai': '/construction/commercial-construction-chennai',
  'commercial-construction-chennai.html': '/construction/commercial-construction-chennai',
  '/commercial-construction-chennai.html': '/construction/commercial-construction-chennai',

  'renewable-energy-contractor-chennai': '/construction/renewable-energy-contractor-chennai',
  '/renewable-energy-contractor-chennai': '/construction/renewable-energy-contractor-chennai',
  'renewable-energy-contractor-chennai.html': '/construction/renewable-energy-contractor-chennai',
  '/renewable-energy-contractor-chennai.html': '/construction/renewable-energy-contractor-chennai'
};

const IMAGE_REPLACEMENTS = [
  { from: /images\/projects\/blue-star-industrial\.webp/gi, to: '/image/project-item/inner_banner.png' },
  { from: /images\/projects\/swro-perur\.webp/gi, to: '/image/project-item/inner_banner.png' },
  { from: /images\/projects\/vibgyor-school\.webp/gi, to: '/image/blog/blog-vibgyor.png' },
  { from: /\.\.\/blog\/images\/blog-hero\.webp/gi, to: '/image/project-item/inner_banner.png' },
  { from: /images\/projects\/solar-epc-kudligi\.webp/gi, to: '/image/project-item/kudligi_solar/140.6_MW_Capacity_Wind–Solar_Hybrid_Power_Project1.png' },
  { from: /images\/projects\/solar-power-tuticorin\.webp/gi, to: '/image/blog/blog-tuticorin.png' },
  { from: /images\/projects\/vibgyor-hinjewadi\.webp/gi, to: '/image/blog/blog-vibgyor.png' },
  { from: /image\/avatar\/avata-2\.jpg/gi, to: '/image/page-title/about.webp' },
  { from: /images\/projects\/solar-tuticorin\.webp/gi, to: '/image/blog/blog-tuticorin.png' },
  { from: /images\/projects\/wind-solar-kudligi\.webp/gi, to: '/image/project-item/kudligi_solar/140.6_MW_Capacity_Wind–Solar_Hybrid_Power_Project1.png' },
  { from: /images\/projects\/reliance-fitout\.webp/gi, to: '/image/project-item/inner_banner.png' },
  { from: /\.\.\/image\/project-item\/kudligi_solar\/140\.6_MW_Capacity_Wind(?!–Solar)/gi, to: '/image/project-item/kudligi_solar/140.6_MW_Capacity_Wind–Solar_Hybrid_Power_Project1.png' },
  { from: /images\/kudligi_solar\/140\.6_MW_Capacity_Wind(?!–Solar)/gi, to: '/image/project-item/kudligi_solar/140.6_MW_Capacity_Wind–Solar_Hybrid_Power_Project1.png' },
  { from: /image\/section\/section-about-p-testimonials\.png/gi, to: '/image/page-title/about.webp' },
  { from: /blog\/images\/projects\/vibgyor-school\.webp/gi, to: '/image/blog/blog-vibgyor.png' },
  { from: /blog\/images\/projects\/vibgyor-[1-9]\.jpg/gi, to: '/image/blog/blog-vibgyor.png' },
  { from: /blog\/images\/kudligi_solar\//gi, to: '/image/project-item/kudligi_solar/' },
  { from: /blog\/\/image\//gi, to: '/image/' },
  { from: /src=["']\s+\/image\//gi, to: 'src="/image/' }
];

const UTILITY_PAGES = new Set([
  'admin-dashboard.html',
  'ai_studio_code (11).html',
  'blog-post.html',
  'e-mail-sign/alekhya.html',
  'e-mail-sign/nk.html',
  'e-mail-sign/test/AARAA_ZOHO_SAFE_REBUILT.html',
  'e-mail-sign/test/aaraa_email_signature.html',
  'e-mail-sign/test/email_signature.html',
  'e-mail-sign/test/signature_GSAP.html',
  'raje_signature.html',
  'shanmugam_signature.html',
  'raje.html',
  'marquee.html',
  'mar.html',
  '25m.html'
]);

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getAllHtmlFiles(LEGACY_DIR);
let updatedFilesCount = 0;

htmlFiles.forEach(file => {
  const relPath = path.relative(LEGACY_DIR, file).replace(/\\/g, '/');
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // 1. Fix Canonical tags: ensure extensionless & clean HTTPS URL
  content = content.replace(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/gi, (match, href) => {
    let cleanHref = href.trim();
    if (cleanHref.endsWith('.html')) {
      cleanHref = cleanHref.substring(0, cleanHref.length - 5);
    }
    if (REDIRECTS_MAP[cleanHref]) {
      cleanHref = REDIRECTS_MAP[cleanHref];
    }
    if (!cleanHref.startsWith('http')) {
      cleanHref = `https://www.aaraainfrastructure.com${cleanHref.startsWith('/') ? '' : '/'}${cleanHref}`;
    } else if (cleanHref.startsWith('http://')) {
      cleanHref = cleanHref.replace('http://', 'https://');
    }
    modified = true;
    return `<link rel="canonical" href="${cleanHref}"`;
  });

  // 2. Fix Internal Links: rewrite href="..." to clean targets
  content = content.replace(/href=["']([^"']*)["']/gi, (match, href) => {
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:')) {
      return match;
    }
    let target = href.trim();
    let fragment = '';
    if (target.includes('#')) {
      const parts = target.split('#');
      target = parts[0];
      fragment = '#' + parts.slice(1).join('#');
    }

    if (REDIRECTS_MAP[target]) {
      modified = true;
      return `href="${REDIRECTS_MAP[target]}${fragment}"`;
    }

    if (target.endsWith('.html')) {
      const clean = target.substring(0, target.length - 5);
      if (clean === 'index' || clean === '/index') {
        modified = true;
        return `href="/${fragment}"`;
      }
      modified = true;
      const finalTarget = REDIRECTS_MAP[clean] || (clean.startsWith('/') ? clean : '/' + clean);
      return `href="${finalTarget}${fragment}"`;
    }

    return match;
  });

  // 3. Fix Image Src Replacements
  IMAGE_REPLACEMENTS.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
      modified = true;
    }
  });

  // 4. Utility / Junk pages - add noindex meta tag if indexable
  if (UTILITY_PAGES.has(relPath)) {
    if (!/noindex/i.test(content)) {
      content = content.replace(/<head[^>]*>/i, '$&\n  <meta name="robots" content="noindex, nofollow">');
      modified = true;
    }
  }

  // 5. Check if H1 missing on indexable pages
  if (!UTILITY_PAGES.has(relPath) && !/<h1[\s>]/i.test(content)) {
    const titleMatch = content.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const titleText = titleMatch ? titleMatch[1].replace(/ - AARAA.*$/i, '').trim() : 'AARAA Infrastructure';
    if (/<body[^>]*>/i.test(content)) {
      content = content.replace(/<body([^>]*)>/i, `<body$1>\n<h1 class="sr-only">${titleText}</h1>`);
      modified = true;
    }
  }

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
    updatedFilesCount++;
  }
});

console.log(`Successfully processed ${htmlFiles.length} files. Updated ${updatedFilesCount} HTML files.`);
