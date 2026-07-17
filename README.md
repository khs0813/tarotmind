# 타로마음

DB 없이 운영 가능한 Astro + TypeScript 기반 무료 AI 스타일 타로 리딩 정적 사이트입니다.

## 포함 기능

- 메인 페이지
- 타로 리딩 모음 페이지
- 오늘의 타로
- 연애 타로
- 재회 타로
- 직장운 타로
- 금전운 타로
- Yes or No 타로
- 3장 타로
- 선택 고민 타로
- 타로 카드 의미 페이지
- 타로 가이드 4개
- 개인정보처리방침
- 이용약관
- 문의 페이지
- `sitemap.xml`
- `rss.xml`
- `robots.txt`
- 네이버 서치어드바이저 소유확인 메타태그 환경변수 지원
- 카카오 애드핏 광고 placeholder
- 78장 타로 카드 데이터
- 외부 AI API 없이 동작하는 템플릿 기반 타로 리딩 엔진
- 선택적 `localStorage` 최근 리딩 저장
- Public Domain으로 확인한 Rider-Waite-Smith 타로 카드 이미지 로컬 제공
- 이미지 출처/라이선스 고지 페이지

## 제외한 기능

- DB
- 로그인
- 회원가입
- 댓글
- 게시판
- 서버 저장
- 외부 AI API
- Google AdSense
- 제휴 상품 영역
- 추가 문서형 `.md` 파일

## 실행 방법

```bash
npm install
npm run dev
```

개발 서버 실행 후 브라우저에서 안내된 로컬 주소로 접속하면 됩니다.

## 빌드 방법

```bash
npm run build
```

실제 도메인을 반영해서 빌드하려면 다음처럼 실행합니다. `SITE_URL`을 설정하지 않으면 검색엔진 색인을 막기 위해 `noindex`와 차단형 `robots.txt`가 출력됩니다.

```bash
SITE_URL=https://your-domain.com npm run build
```

네이버 서치어드바이저 소유확인 메타태그를 넣으려면 다음처럼 실행합니다.

```bash
SITE_URL=https://your-domain.com NAVER_SITE_VERIFICATION=네이버_인증값 npm run build
```

전체 메타태그를 넣어도 `content` 값만 추출됩니다.

```bash
NAVER_SITE_VERIFICATION='<meta name="naver-site-verification" content="abc123" />' npm run build
```

## 환경변수

`.env.example` 참고:

```text
SITE_URL=https://your-domain.com
NAVER_SITE_VERIFICATION=
ADFIT_ENABLED=false
ADFIT_ALLOWED_HOSTS=tarocue.co.kr
ADFIT_HOME_300X250=
ADFIT_TAROT_RESULT_300X250=
ADFIT_CARD_INDEX_300X250=
ADFIT_CARD_DETAIL_300X250=
ADFIT_DEBUG_PLACEHOLDERS=false
PUBLIC_CONTACT_EMAIL=hello@example.com
```

## 카카오 애드핏 적용

`src/components/AdSlot.astro`에서 관리합니다.

광고단위 ID는 Render 환경변수로만 관리합니다. `ADFIT_ENABLED=true`이고 현재 hostname이 `ADFIT_ALLOWED_HOSTS`에 포함되며 해당 placement의 광고단위 ID가 있을 때만 카카오 애드핏 SDK가 로드됩니다.

```text
ADFIT_HOME_300X250=
ADFIT_TAROT_RESULT_300X250=
ADFIT_CARD_INDEX_300X250=
ADFIT_CARD_DETAIL_300X250=
```

## 네이버 서치어드바이저 등록 체크

배포 후 아래 주소를 확인하세요.

```text
https://your-domain.com/robots.txt
https://your-domain.com/sitemap.xml
https://your-domain.com/rss.xml
```

`robots.txt`에는 네이버 검색로봇 `Yeti` 허용과 sitemap 경로가 포함됩니다.

```text
User-agent: Yeti
Allow: /

User-agent: *
Allow: /

Sitemap: https://your-domain.com/sitemap.xml
```

네이버 서치어드바이저에서 사이트 등록 후 다음을 제출하면 됩니다.

```text
/sitemap.xml
/rss.xml
```

## 폴더 구조

```text
src/
├─ components/
├─ data/
├─ pages/
│  ├─ tarot/
│  ├─ cards/
│  └─ guides/
├─ scripts/
└─ styles/
```

## 타로 카드 데이터와 이미지

카드 데이터는 `src/data/tarotCards.ts`에 있습니다.

- 메이저 아르카나 22장
- 마이너 아르카나 56장
- 정방향 의미
- 역방향 의미
- 연애/직장/금전/조언 문구
- 주의 문구
- 오늘의 행동 문구

타로 카드 이미지는 Wikimedia Commons에서 Public Domain으로 표시된 Rider-Waite-Smith 카드 파일을 확인한 뒤 `public/tarot/rws/`에 로컬 사본으로 저장해 사용합니다.

- 라이선스 메모: `public/tarot/rws/LICENSE.txt`
- 파일별 출처/라이선스 manifest: `public/tarot/rws/MANIFEST.json`
- 무결성 확인용 해시: `public/tarot/rws/SHA256SUMS`

출처나 라이선스가 불명확한 이미지는 사용하지 않습니다.

## 리딩 페이지 추가 방법

`src/data/tarotReadings.ts`에 새 리딩 정보를 추가하면 `/tarot/[slug]/` 경로로 정적 페이지가 생성됩니다.

필수 값:

```ts
{
  slug: 'example',
  title: '예시 타로 | 타로마음',
  shortTitle: '예시 타로',
  description: '페이지 설명',
  category: 'daily',
  spreadType: 'one-card',
  targetKeywords: ['예시 타로'],
  positions: [...],
  faqs: [...],
  relatedSlugs: [...],
  intro: '소개 문구',
  sections: [...]
}
```

## 저장 정책

기본적으로 질문과 리딩 결과는 저장하지 않습니다.

사용자가 “이 브라우저에 최근 리딩 저장하기”를 선택한 경우에만 현재 브라우저의 `localStorage`에 저장됩니다.

저장 키 예시:

```text
tarotmind.readings.today
tarotmind.readings.love
tarotmind.readings.reunion
```

페이지별 최근 5개까지만 저장합니다.

## 주의 문구

모든 타로 리딩 결과에는 다음 취지의 안내 문구가 표시됩니다.

```text
본 타로 리딩은 오락 및 참고용 콘텐츠입니다.
중요한 건강, 법률, 투자, 금전, 인간관계 결정은 전문가와 상담하거나 현실적인 정보를 함께 확인하시기 바랍니다.
```
