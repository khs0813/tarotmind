export const SITE_NAME = '타로마음';
export const SITE_TAGLINE = '무료 AI 스타일 타로 리딩';
export const SITE_DESCRIPTION = '타로마음에서 오늘의 타로, 연애 타로, 재회 타로, 직장운, 금전운을 무료로 확인하세요. 서버 저장 없이 브라우저에서 가볍게 이용할 수 있는 AI 스타일 타로 리딩입니다.';
export const SITE_LOCALE = 'ko-KR';
export const DEFAULT_OG_IMAGE = '/og-image.png';
export const DEFAULT_LASTMOD = '2026-07-14';
export const DEFAULT_SITE_URL = 'https://tarotmind.onrender.com';

function getRawSiteUrl(): string | undefined {
  return import.meta.env.SITE_URL?.trim() || import.meta.env.NEXT_PUBLIC_SITE_URL?.trim();
}

export function isSiteUrlConfigured(): boolean {
  const raw = getRawSiteUrl();
  return !raw || Boolean(!raw.includes('your-domain.com') && /^https?:\/\//i.test(raw));
}

export function getSiteUrl(): string {
  return (getRawSiteUrl() || DEFAULT_SITE_URL).replace(/\/$/, '');
}

export function normalizePath(path: string): string {
  if (!path || path === '/') return '/';
  const withLeadingSlash = path.startsWith('/') ? path : `/${path}`;
  const [pathname, suffix = ''] = withLeadingSlash.split(/([?#].*)/, 2);
  if (/\.[a-z0-9]+$/i.test(pathname)) return `${pathname}${suffix}`;
  return `${pathname.replace(/\/?$/, '/')}${suffix}`;
}

export function buildSiteUrl(path = '/'): string {
  return new URL(normalizePath(path), `${getSiteUrl()}/`).toString();
}

export function safeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function dedupeRepeatedLabel(value: string): string {
  const normalized = value.trim().replace(/\s+/g, ' ');
  const words = normalized.split(' ');
  if (words.length % 2 === 0) {
    const midpoint = words.length / 2;
    const first = words.slice(0, midpoint).join(' ');
    const second = words.slice(midpoint).join(' ');
    if (first === second) return first;
  }
  return normalized.replace(/\b(.+?)\s+\1\b/g, '$1');
}

function hasFinalConsonant(value: string): boolean {
  const last = value.trim().charAt(value.trim().length - 1);
  if (!last) return false;
  const code = last.charCodeAt(0);
  if (code >= 0xac00 && code <= 0xd7a3) return (code - 0xac00) % 28 !== 0;
  if (/[0178]/.test(last)) return true;
  if (/[236]/.test(last)) return false;
  return false;
}

export function josa(value: string, pair: '은/는' | '이/가' | '을/를' | '과/와'): string {
  const [withBatchim, withoutBatchim] = pair.split('/');
  return `${value}${hasFinalConsonant(value) ? withBatchim : withoutBatchim}`;
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
