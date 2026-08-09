export const SITE_NAME = '타로마음';
export const SITE_TAGLINE = '무료타로 AI 스타일 리딩';
export const SITE_DESCRIPTION = '오늘의 타로, 연애, 재회, 직장운, 금전운 무료타로 리딩을 확인하세요.';
export const SITE_LOCALE = 'ko-KR';
export const EN_SITE_NAME = 'TarotMind';
export const EN_SITE_TAGLINE = 'Free AI-style tarot readings';
export const EN_SITE_DESCRIPTION = 'Draw free tarot cards for daily guidance, love, reconciliation, career, money, yes-or-no questions, and decision readings.';
export const EN_SITE_LOCALE = 'en-US';
export const DEFAULT_OG_IMAGE = '/og-image.png';
export const DEFAULT_DATE_PUBLISHED = '2026-07-14';
export const DEFAULT_LASTMOD = '2026-08-09';
export const DEFAULT_SITE_URL = 'https://tarocue.co.kr';
export const DEFAULT_NAVER_SITE_VERIFICATION = '929de4121fc94e573caf3baf36ff8e601d85f1ca';
const LEGACY_RENDER_SITE_URL = 'https://tarotmind.onrender.com';

export type SiteLocale = 'ko' | 'en';

export const SITE_COPY: Record<SiteLocale, {
  name: string;
  tagline: string;
  description: string;
  htmlLang: string;
  schemaLanguage: string;
  ogLocale: string;
  imageAlt: string;
}> = {
  ko: {
    name: SITE_NAME,
    tagline: SITE_TAGLINE,
    description: SITE_DESCRIPTION,
    htmlLang: 'ko',
    schemaLanguage: SITE_LOCALE,
    ogLocale: 'ko_KR',
    imageAlt: `${SITE_NAME} 대표 이미지`
  },
  en: {
    name: EN_SITE_NAME,
    tagline: EN_SITE_TAGLINE,
    description: EN_SITE_DESCRIPTION,
    htmlLang: 'en',
    schemaLanguage: EN_SITE_LOCALE,
    ogLocale: 'en_US',
    imageAlt: `${EN_SITE_NAME} featured tarot image`
  }
};

function getRawSiteUrl(): string | undefined {
  const raw = import.meta.env.SITE_URL?.trim() || import.meta.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw || raw.replace(/\/$/, '') === LEGACY_RENDER_SITE_URL) return undefined;
  return raw;
}

export function isSiteUrlConfigured(): boolean {
  const raw = getRawSiteUrl();
  return !raw || /^https?:\/\//i.test(raw);
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

export function localizePath(path: string, locale: SiteLocale): string {
  const normalized = normalizePath(path);
  if (locale === 'ko') {
    const withoutEn = normalized.replace(/^\/en(?=\/|$)/, '');
    return normalizePath(withoutEn || '/');
  }
  if (normalized === '/') return '/en/';
  if (normalized.startsWith('/en/')) return normalized;
  return normalizePath(`/en${normalized}`);
}

export function getAlternateUrls(path: string): Record<SiteLocale, string> {
  return {
    ko: buildSiteUrl(localizePath(path, 'ko')),
    en: buildSiteUrl(localizePath(path, 'en'))
  };
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
  const raw = import.meta.env.NAVER_SITE_VERIFICATION?.trim() || DEFAULT_NAVER_SITE_VERIFICATION;
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
  locale?: SiteLocale;
  lastmod?: string;
  image?: string;
  rss?: boolean;
  changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority?: number;
};
