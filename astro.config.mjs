import { defineConfig } from 'astro/config';

const site = (process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL)?.trim().replace(/\/$/, '');

export default defineConfig({
  ...(site ? { site } : {}),
  output: 'static'
});
