export const SITE_NAME = '타로마음';
export const SITE_TAGLINE = '무료 AI 스타일 타로 리딩';
export const SITE_DESCRIPTION = '카드를 고르면 오늘의 흐름, 연애운, 재회운, 직장운, 금전운을 AI 스타일 문장으로 확인할 수 있는 무료 타로 리딩 사이트입니다.';
export const SITE_LOCALE = 'ko-KR';
export const DEFAULT_OG_IMAGE = '/og-image.png';
export const DEFAULT_LASTMOD = '2026-07-05';
export const DEFAULT_SITE_URL = 'https://tarotmind.onrender.com';

function getRawSiteUrl(): string | undefined {
  return import.meta.env.SITE_URL?.trim();
}

export function isSiteUrlConfigured(): boolean {
  const raw = getRawSiteUrl();
  return !raw || Boolean(!raw.includes('your-domain.com') && /^https?:\/\//i.test(raw));
}

export function getSiteUrl(): string {
  return (getRawSiteUrl() || DEFAULT_SITE_URL).replace(/\/$/, '');
}

export function getContactEmail(): string {
  return import.meta.env.PUBLIC_CONTACT_EMAIL ?? 'contact@tarotmind.kr';
}

export function getNaverVerification(): string | undefined {
  const raw = import.meta.env.NAVER_SITE_VERIFICATION?.trim();
  if (!raw) return undefined;
  const match = raw.match(/content=["']([^"']+)["']/i);
  return match?.[1] ?? raw;
}

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type SitePage = {
  path: string;
  title: string;
  description: string;
  lastmod?: string;
  image?: string;
  rss?: boolean;
  changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority?: number;
};
