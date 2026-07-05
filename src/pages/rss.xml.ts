import type { APIRoute } from 'astro';
import { getRssPages } from '../data/pages';
import { DEFAULT_LASTMOD, getSiteUrl, isSiteUrlConfigured, SITE_NAME, SITE_DESCRIPTION } from '../data/site';

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
    return new Response('<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0"><channel><title>RSS disabled</title></channel></rss>\n', {
      headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
    });
  }
  const siteUrl = getSiteUrl();
  const rssUrl = new URL('/rss.xml', `${siteUrl}/`).toString();
  const lastBuildDate = new Date(`${DEFAULT_LASTMOD}T00:00:00Z`).toUTCString();
  const items = getRssPages().map((page) => {
    const url = new URL(page.path, `${siteUrl}/`).toString();
    const pubDate = new Date(`${page.lastmod ?? DEFAULT_LASTMOD}T00:00:00Z`).toUTCString();
    return `    <item>\n      <title>${escapeXml(page.title)}</title>\n      <link>${escapeXml(url)}</link>\n      <guid isPermaLink="true">${escapeXml(url)}</guid>\n      <description>${escapeXml(page.description)}</description>\n      <pubDate>${pubDate}</pubDate>\n    </item>`;
  }).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>${escapeXml(`${SITE_NAME} RSS`)}</title>\n    <link>${escapeXml(siteUrl)}</link>\n    <atom:link href="${escapeXml(rssUrl)}" rel="self" type="application/rss+xml" />\n    <description>${escapeXml(SITE_DESCRIPTION)}</description>\n    <language>ko-KR</language>\n    <lastBuildDate>${lastBuildDate}</lastBuildDate>\n    <ttl>1440</ttl>\n${items}\n  </channel>\n</rss>\n`, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' }
  });
};
