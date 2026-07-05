import { DEFAULT_LASTMOD, SITE_DESCRIPTION, type SitePage } from './site';
import { tarotReadings } from './tarotReadings';
import { guides } from './guides';

export function getAllPages(): SitePage[] {
  return [
    { path: '/', title: '타로마음 | 무료 AI 스타일 타로 리딩', description: SITE_DESCRIPTION, lastmod: DEFAULT_LASTMOD, rss: true, changefreq: 'weekly', priority: 1.0 },
    { path: '/tarot/', title: '무료 타로 리딩 모음 | 타로마음', description: '오늘의 타로, 연애 타로, 재회 타로, 직장운 타로, 금전운 타로 등 무료 AI 스타일 타로 리딩을 모아볼 수 있습니다.', lastmod: DEFAULT_LASTMOD, rss: true, changefreq: 'weekly', priority: 0.9 },
    ...tarotReadings.map((reading) => ({ path: `/tarot/${reading.slug}/`, title: reading.title, description: reading.description, lastmod: DEFAULT_LASTMOD, rss: true, changefreq: 'weekly' as const, priority: 0.85 })),
    { path: '/cards/', title: '타로 카드 의미 모음 | 타로마음', description: '메이저 아르카나와 마이너 아르카나 카드의 기본 키워드, 정방향·역방향 의미를 한눈에 확인할 수 있습니다.', lastmod: DEFAULT_LASTMOD, rss: true, changefreq: 'monthly', priority: 0.8 },
    { path: '/guides/', title: '타로 가이드 모음 | 타로마음', description: '타로 카드 의미, 타로 보는 법, 메이저 아르카나, 타로 스프레드 등 초보자를 위한 타로 가이드를 모았습니다.', lastmod: DEFAULT_LASTMOD, rss: true, changefreq: 'monthly', priority: 0.75 },
    ...guides.map((guide) => ({ path: `/guides/${guide.slug}/`, title: guide.title, description: guide.description, lastmod: DEFAULT_LASTMOD, rss: true, changefreq: 'monthly' as const, priority: 0.7 })),
    { path: '/about/', title: '사이트 소개 | 타로마음', description: '타로마음은 서버 저장 없이 브라우저에서 무료 AI 스타일 타로 리딩을 제공하는 정적 웹사이트입니다.', lastmod: DEFAULT_LASTMOD, changefreq: 'yearly', priority: 0.3 },
    { path: '/privacy/', title: '개인정보처리방침 | 타로마음', description: '타로마음의 개인정보 처리 기준, localStorage 저장 방식, 카카오 애드핏 광고 관련 안내를 확인할 수 있습니다.', lastmod: DEFAULT_LASTMOD, changefreq: 'yearly', priority: 0.2 },
    { path: '/terms/', title: '이용약관 | 타로마음', description: '타로마음 이용 시 참고해야 할 오락용 콘텐츠 안내, 책임 제한, 광고 안내, 서비스 변경 가능성을 정리한 페이지입니다.', lastmod: DEFAULT_LASTMOD, changefreq: 'yearly', priority: 0.2 },
    { path: '/credits/', title: '이미지 출처 | 타로마음', description: '타로마음에서 사용하는 타로 카드 이미지의 출처와 라이선스 기준을 안내합니다.', lastmod: DEFAULT_LASTMOD, changefreq: 'yearly', priority: 0.2 },
    { path: '/contact/', title: '문의 | 타로마음', description: '타로마음 사이트 오류 제보, 리딩 주제 제안, 광고 관련 문의를 보낼 수 있는 연락 페이지입니다.', lastmod: DEFAULT_LASTMOD, changefreq: 'yearly', priority: 0.2 }
  ];
}

export function getRssPages(): SitePage[] {
  return getAllPages().filter((page) => page.rss);
}
