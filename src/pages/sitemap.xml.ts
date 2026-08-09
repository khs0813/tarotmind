import type { APIRoute } from 'astro';
import { getAllPages } from '../data/pages';
import { DEFAULT_OG_IMAGE, SITE_COPY, buildSiteUrl, getAlternateUrls, isSiteUrlConfigured } from '../data/site';

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
  const urls = getAllPages().map((page) => {
    const loc = escapeXml(buildSiteUrl(page.path));
    const alternates = getAlternateUrls(page.path);
    const imageLoc = escapeXml(buildSiteUrl(page.image ?? DEFAULT_OG_IMAGE));
    const imageTitle = escapeXml(page.locale === 'en' ? SITE_COPY.en.imageAlt : SITE_COPY.ko.imageAlt);
    const lastmod = page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : '';
    const changefreq = page.changefreq ? `\n    <changefreq>${page.changefreq}</changefreq>` : '';
    const priority = typeof page.priority === 'number' ? `\n    <priority>${page.priority.toFixed(1)}</priority>` : '';
    const alternateLinks = `\n    <xhtml:link rel="alternate" hreflang="ko-KR" href="${escapeXml(alternates.ko)}" />\n    <xhtml:link rel="alternate" hreflang="en-US" href="${escapeXml(alternates.en)}" />\n    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(alternates.en)}" />`;
    const image = `\n    <image:image>\n      <image:loc>${imageLoc}</image:loc>\n      <image:title>${imageTitle}</image:title>\n    </image:image>`;
    return `  <url>\n    <loc>${loc}</loc>${alternateLinks}${lastmod}${changefreq}${priority}${image}\n  </url>`;
  }).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
};
