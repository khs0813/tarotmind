import type { APIRoute } from 'astro';
import { getSiteUrl, isSiteUrlConfigured } from '../data/site';

export const GET: APIRoute = () => {
  if (!isSiteUrlConfigured()) {
    return new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  const siteUrl = getSiteUrl();
  const commonRules = `Allow: /\nDisallow: /tarot/rws/LICENSE.txt\nDisallow: /tarot/rws/MANIFEST.json\nDisallow: /tarot/rws/SHA256SUMS`;
  const body = `User-agent: Yeti\n${commonRules}\n\nUser-agent: *\n${commonRules}\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
