import { defineConfig } from 'astro/config';

const DEFAULT_SITE_URL = 'https://tarocue.co.kr';
const LEGACY_RENDER_SITE_URL = 'https://tarotmind.onrender.com';
const configuredSite = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL)?.trim().replace(/\/$/, '');
const site = configuredSite && configuredSite !== LEGACY_RENDER_SITE_URL ? configuredSite : DEFAULT_SITE_URL;

export default defineConfig({
  site,
  output: 'static'
});
