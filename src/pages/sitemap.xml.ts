import type { APIRoute } from 'astro';
import { getAllPages } from '../data/pages';
import { DEFAULT_OG_IMAGE, SITE_NAME, getSiteUrl, isSiteUrlConfigured } from '../data/site';

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export const GET: APIRoute = () => {
  if (!isSiteUrlConfigured()) {
    return new Response('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" />\n', {
      headers: { 'Content-Type': 'application/xml; charset=utf-8' }
    });
  }
  const siteUrl = getSiteUrl();
  const imageLoc = escapeXml(new URL(DEFAULT_OG_IMAGE, `${siteUrl}/`).toString());
  const imageTitle = escapeXml(`${SITE_NAME} 대표 이미지`);
  const urls = getAllPages().map((page) => {
    const loc = escapeXml(new URL(page.path, `${siteUrl}/`).toString());
    const lastmod = page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : '';
    const changefreq = page.changefreq ? `\n    <changefreq>${page.changefreq}</changefreq>` : '';
    const priority = typeof page.priority === 'number' ? `\n    <priority>${page.priority.toFixed(1)}</priority>` : '';
    const image = `\n    <image:image>\n      <image:loc>${imageLoc}</image:loc>\n      <image:title>${imageTitle}</image:title>\n    </image:image>`;
    return `  <url>\n    <loc>${loc}</loc>${lastmod}${changefreq}${priority}${image}\n  </url>`;
  }).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
};
