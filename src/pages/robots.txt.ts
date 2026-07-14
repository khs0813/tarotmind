import type { APIRoute } from 'astro';
import { buildSiteUrl, isSiteUrlConfigured } from '../data/site';

export const GET: APIRoute = () => {
  if (!isSiteUrlConfigured()) {
    return new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  const body = `User-agent: Yeti\nAllow: /\n\nUser-agent: Googlebot\nAllow: /\n\nUser-agent: *\nAllow: /\n\nSitemap: ${buildSiteUrl('/sitemap.xml')}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
