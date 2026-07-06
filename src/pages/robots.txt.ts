import type { APIRoute } from 'astro';
import { getSiteUrl, isSiteUrlConfigured } from '../data/site';

export const GET: APIRoute = () => {
  if (!isSiteUrlConfigured()) {
    return new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  const siteUrl = getSiteUrl();
  const body = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
