import { getPublishedJobs } from '@/lib/careers-store';
import { BASE_URL } from '@/lib/careers-seo';

export async function GET() {
  const jobs = await getPublishedJobs();

  const staticCareerUrls = [
    '/careers',
    '/careers/jobs',
    '/careers/freshers',
    '/careers/internships'
  ];

  const now = new Date().toISOString().split('T')[0];

  const urlsXml = [
    ...staticCareerUrls.map(url => `
      <url>
        <loc>${BASE_URL}${url}</loc>
        <lastmod>${now}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>`),
    ...jobs.map(job => `
      <url>
        <loc>${BASE_URL}/careers/jobs/${job.slug}</loc>
        <lastmod>${job.published_at || now}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>`)
  ].join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate'
    }
  });
}
