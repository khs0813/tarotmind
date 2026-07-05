import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL?.trim().replace(/\/$/, '');

export default defineConfig({
  ...(site ? { site } : {}),
  output: 'static'
});
