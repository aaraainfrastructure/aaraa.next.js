import fs from 'node:fs';
import path from 'node:path';

const LEGACY_DIR = path.join(process.cwd(), 'legacy-pages');

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
let canonicalFixCount = 0;
let linkFixCount = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;

  // 1. Fix Canonical tags to use clean extensionless URLs matching sitemap.xml
  content = content.replace(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/gi, (match, href) => {
    let cleanHref = href.trim();
    if (cleanHref.endsWith('.html')) {
      cleanHref = cleanHref.substring(0, cleanHref.length - 5);
      modified = true;
      canonicalFixCount++;
    }
    return `<link rel="canonical" href="${cleanHref}"`;
  });

  // 2. Fix Broken Link References
  const linkReplacements = [
    { from: /href=["']\/?projects-details\.html["']/gi, to: 'href="/completed-projects.html"' },
    { from: /href=["']\/?ongoingorchid-project\.html["']/gi, to: 'href="/project-details-orchid.html"' },
    { from: /href=["']\/?ongoingorchid-project["']/gi, to: 'href="/project-details-orchid.html"' },
    { from: /href=["']\/?140-6-mw-wind-solar-hybrid-power-project["']/gi, to: 'href="/140.6_MW_Capacity_Wind–Solar_Hybrid_Power_Project.html"' },
    { from: /href=["']\/?reliance-civil-interior-mep-fitout["']/gi, to: 'href="/commercial.html"' },
    { from: /href=["']\/?Institutional-Development-VIBGYOR-Group-Hinjewadi-Pune\.html["']/gi, to: 'href="/blog/institutional-development-vibgyor-group-hinjewadi"' },
    { from: /href=["']\/?institutional-development-vibgyor-group-hinjewadi\.html["']/gi, to: 'href="/blog/institutional-development-vibgyor-group-hinjewadi"' },
    { from: /href=["']\/?contact\.html["']/gi, to: 'href="/contact-us.html"' },
    { from: /href=["']\/?about-us\.html["']/gi, to: 'href="/about.html"' },
    { from: /href=["']\/?careers\.html["']/gi, to: 'href="/career.html"' },
    { from: /href=["']\/?our-services\.html["']/gi, to: 'href="/services.html"' },
    { from: /href=["']\/?leadership\.html["']/gi, to: 'href="/about.html"' },
    { from: /href=["']\/?leadership-details\.html["']/gi, to: 'href="/about.html"' },
    { from: /href=["']\/privacy-policy["']/gi, to: 'href="/aaraa-privacy-policy.html"' },
    
    // Demo/template links in blog-details
    { from: /href=["']\/?home-[2-5]\.html["']/gi, to: 'href="/"' },
    { from: /href=["']\/?why-choose-us\.html["']/gi, to: 'href="/about.html"' },
    { from: /href=["']\/?core-values\.html["']/gi, to: 'href="/about.html"' },
    { from: /href=["']\/?what-we-do\.html["']/gi, to: 'href="/services.html"' },
    { from: /href=["']\/?what-we-do-detail\.html["']/gi, to: 'href="/services.html"' },
    { from: /href=["']\/?working-process\.html["']/gi, to: 'href="/about.html"' },
    { from: /href=["']\/?testimonials\.html["']/gi, to: 'href="/about.html"' },
    { from: /href=["']\/?pricing\.html["']/gi, to: 'href="/contact-us.html"' },
    { from: /href=["']\/?shop\.html["']/gi, to: 'href="/"' },
    { from: /href=["']\/?shop-detail\.html["']/gi, to: 'href="/"' },
    { from: /href=["']\/?404\.html["']/gi, to: 'href="/"' },

    // Construction Links fix
    { from: /href=["']\/epc-contractor-chennai["']/gi, to: 'href="/construction/epc-contractor-chennai.html"' },
    { from: /href=["']\/peb-company-chennai["']/gi, to: 'href="/construction/peb-company-chennai.html"' },
    { from: /href=["']\/solar-epc-company-chennai["']/gi, to: 'href="/construction/solar-epc-company-chennai.html"' },
    { from: /href=["']\/mep-contractor-chennai["']/gi, to: 'href="/construction/mep-contractor-chennai.html"' },
    { from: /href=["']\/steel-structure-contractor-chennai["']/gi, to: 'href="/construction/steel-structure-contractor-chennai.html"' },
    { from: /href=["']\/warehouse-construction-chennai["']/gi, to: 'href="/construction/warehouse-construction-chennai.html"' },
    { from: /href=["']\/industrial-construction-chennai["']/gi, to: 'href="/construction/industrial-construction-chennai.html"' },
    { from: /href=["']\/institutional-construction-chennai["']/gi, to: 'href="/construction/institutional-construction-chennai.html"' },
    { from: /href=["']\/infrastructure-construction-chennai["']/gi, to: 'href="/construction/infrastructure-construction-chennai.html"' },
    { from: /href=["']\/interior-fit-out-contractor-chennai["']/gi, to: 'href="/construction/interior-fit-out-contractor-chennai.html"' },
    { from: /href=["']\/renovation-contractor-chennai["']/gi, to: 'href="/construction/renovation-contractor-chennai.html"' },
    { from: /href=["']\/commercial-construction-chennai["']/gi, to: 'href="/construction/commercial-construction-chennai.html"' },
    { from: /href=["']\/renewable-energy-contractor-chennai["']/gi, to: 'href="/construction/renewable-energy-contractor-chennai.html"' }
  ];

  linkReplacements.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
      modified = true;
      linkFixCount++;
    }
  });

  // 3. Fix Image Paths
  const imgReplacements = [
    { from: /src=["']images\/whatsapp-icon\.svg["']/gi, to: 'src="/images/whatsapp-icon.svg"' },
    { from: /src=["']logo\.png["']/gi, to: 'src="/logo.png"' }
  ];

  imgReplacements.forEach(({ from, to }) => {
    if (from.test(content)) {
      content = content.replace(from, to);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(file, content, 'utf8');
  }
});

console.log(`Updated canonical tags in ${canonicalFixCount} occurrences.`);
console.log(`Updated broken link references in ${linkFixCount} occurrences.`);
