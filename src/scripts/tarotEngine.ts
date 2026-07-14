import { safeGetItem, safeRemoveItem, safeSetItem } from './storage';

declare global {
  interface Window {
    TarotMindAdFit?: {
      mount: (slot: Element | null) => void;
    };
  }
}

type Topic = 'general' | 'love' | 'career' | 'money';

type TarotCard = {
  id: string;
  nameKo: string;
  nameEn: string;
  arcana: 'major' | 'minor';
  suit?: string;
  number?: number | string;
  keywords: string[];
  upright: Record<Topic | 'advice', string>;
  reversed: Record<Topic | 'advice', string>;
  caution: string;
  action: string;
};

type ReadingConfig = {
  slug: string;
  shortTitle: string;
  category: 'daily' | 'love' | 'career' | 'money' | 'choice';
  spreadType: 'one-card' | 'three-card' | 'yes-no' | 'choice';
  positions: { id: string; label: string; description: string }[];
};

type DrawnCard = {
  card: TarotCard;
  orientation: 'upright' | 'reversed';
  position: { id: string; label: string; description: string };
};

type ReadingResult = {
  title: string;
  summary: string;
  cards: DrawnCard[];
  sections: { title: string; content: string }[];
  disclaimer: string;
  createdAt: string;
};

function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getTopic(category: ReadingConfig['category']): Topic {
  if (category === 'love') return 'love';
  if (category === 'career') return 'career';
  if (category === 'money') return 'money';
  return 'general';
}

function orientationLabel(orientation: DrawnCard['orientation']): string {
  return orientation === 'upright' ? '정방향' : '역방향';
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function riderWaiteFilename(card: TarotCard): string | null {
  const major: Record<string, string> = {
    'the-fool': 'RWS_Tarot_00_Fool.jpg',
    'the-magician': 'RWS_Tarot_01_Magician.jpg',
    'the-high-priestess': 'RWS_Tarot_02_High_Priestess.jpg',
    'the-empress': 'RWS_Tarot_03_Empress.jpg',
    'the-emperor': 'RWS_Tarot_04_Emperor.jpg',
    'the-hierophant': 'RWS_Tarot_05_Hierophant.jpg',
    'the-lovers': 'RWS_Tarot_06_Lovers.jpg',
    'the-chariot': 'RWS_Tarot_07_Chariot.jpg',
    strength: 'RWS_Tarot_08_Strength.jpg',
    'the-hermit': 'RWS_Tarot_09_Hermit.jpg',
    'wheel-of-fortune': 'RWS_Tarot_10_Wheel_of_Fortune.jpg',
    justice: 'RWS_Tarot_11_Justice.jpg',
    'the-hanged-man': 'RWS_Tarot_12_Hanged_Man.jpg',
    death: 'RWS_Tarot_13_Death.jpg',
    temperance: 'RWS_Tarot_14_Temperance.jpg',
    'the-devil': 'RWS_Tarot_15_Devil.jpg',
    'the-tower': 'RWS_Tarot_16_Tower.jpg',
    'the-star': 'RWS_Tarot_17_Star.jpg',
    'the-moon': 'RWS_Tarot_18_Moon.jpg',
    'the-sun': 'RWS_Tarot_19_Sun.jpg',
    judgement: 'RWS_Tarot_20_Judgement.jpg',
    'the-world': 'RWS_Tarot_21_World.jpg'
  };
  if (major[card.id]) return major[card.id];

  const match = card.id.match(/^(wands|cups|swords|pentacles)-(ace|two|three|four|five|six|seven|eight|nine|ten|page|knight|queen|king)$/);
  if (!match) return null;
  const suitPrefix: Record<string, string> = {
    wands: 'Wands',
    cups: 'Cups',
    swords: 'Swords',
    pentacles: 'Pents'
  };
  const rankNumber: Record<string, string> = {
    ace: '01',
    two: '02',
    three: '03',
    four: '04',
    five: '05',
    six: '06',
    seven: '07',
    eight: '08',
    nine: '09',
    ten: '10',
    page: '11',
    knight: '12',
    queen: '13',
    king: '14'
  };
  return `${suitPrefix[match[1]]}${rankNumber[match[2]]}.jpg`;
}

function cardImageSrc(card: TarotCard): string {
  const fileName = riderWaiteFilename(card);
  if (fileName) {
    return `/tarot/rws/${fileName}`;
  }
  return '';
}

function makeOrientation(useReversed: boolean): 'upright' | 'reversed' {
  if (!useReversed) return 'upright';
  return Math.random() < 0.25 ? 'reversed' : 'upright';
}

function computeYesNo(card: DrawnCard): string {
  const positiveIds = new Set(['the-sun', 'the-star', 'the-world', 'the-magician', 'the-empress', 'the-chariot', 'strength', 'temperance', 'wheel-of-fortune']);
  const cautiousIds = new Set(['the-devil', 'the-tower', 'the-moon', 'death', 'the-hanged-man']);
  if (card.orientation === 'reversed' || cautiousIds.has(card.card.id)) {
    return '지금은 No에 가깝거나, 조금 더 신중하게 확인할 필요가 있습니다.';
  }
  if (positiveIds.has(card.card.id)) {
    return '지금 흐름은 Yes에 가깝습니다. 다만 현실 조건을 함께 확인하세요.';
  }
  return 'Maybe에 가깝습니다. 아직 결정하기 전 한 번 더 살펴볼 부분이 있습니다.';
}

function buildResult(config: ReadingConfig, cards: DrawnCard[], choiceA: string, choiceB: string): ReadingResult {
  const topic = getTopic(config.category);
  const mainKeywords = cards.flatMap((item) => item.card.keywords.slice(0, 2)).slice(0, 5).join(', ');
  let summary = `${config.shortTitle}에서 보이는 핵심 키워드는 ${mainKeywords}입니다. 결과는 확정적인 예언이 아니라 지금 흐름을 차분히 살펴보는 참고 문장입니다.`;

  if (config.spreadType === 'yes-no') {
    summary = computeYesNo(cards[0]);
  }

  const sections = cards.map((drawn, index) => {
    const meaning = drawn.card[drawn.orientation][topic];
    const positionName = config.spreadType === 'choice' && index === 0 && choiceA ? choiceA : config.spreadType === 'choice' && index === 1 && choiceB ? choiceB : drawn.position.label;
    return {
      title: `${positionName} · ${drawn.card.nameKo} (${orientationLabel(drawn.orientation)})`,
      content: `${meaning} ${drawn.position.description} 이 카드는 “${drawn.card.keywords.join(', ')}”의 키워드를 함께 참고하면 좋습니다.`
    };
  });

  if (config.spreadType === 'choice' && cards.length >= 2) {
    sections.push({
      title: '선택 비교 조언',
      content: `${choiceA || '선택 A'}는 ${cards[0].card.keywords[0]}의 흐름이 강하고, ${choiceB || '선택 B'}는 ${cards[1].card.keywords[0]}의 흐름이 보입니다. 어느 쪽이 무조건 옳다는 뜻은 아니며, 현실 조건과 마음의 부담을 함께 비교해보세요.`
    });
  } else if (config.spreadType === 'yes-no') {
    sections.push({
      title: '답변을 활용하는 방법',
      content: 'Yes, Maybe, No는 결정을 강요하는 답이 아닙니다. 지금 흐름이 어느 쪽에 가까운지 확인하고, 실제 정보와 내 상황을 함께 점검하는 기준으로 활용하세요.'
    });
  } else {
    sections.push({
      title: '종합 조언',
      content: `${cards.map((item) => item.card[item.orientation].advice).join(' ')} 오늘은 ${cards[0].card.action}`
    });
  }

  sections.push({
    title: '주의할 점',
    content: cards.map((item) => item.card.caution).join(' ')
  });

  const extraDisclaimer = config.category === 'money'
    ? ' 본 결과는 투자 조언이 아니며 특정 금융상품이나 종목의 매수·매도를 권유하지 않습니다.'
    : config.category === 'career'
      ? ' 퇴사, 이직, 계약 등 중요한 결정은 실제 조건과 전문가 조언을 함께 고려하세요.'
      : '';

  return {
    title: `${config.shortTitle} 결과`,
    summary,
    cards,
    sections,
    disclaimer: `본 타로 리딩은 오락 및 참고용 콘텐츠입니다. 중요한 건강, 법률, 투자, 금전, 인간관계 결정은 전문가와 상담하거나 현실적인 정보를 함께 확인하시기 바랍니다.${extraDisclaimer}`,
    createdAt: new Date().toISOString()
  };
}

function resultToText(result: ReadingResult): string {
  const cardLines = result.cards.map((item) => `- ${item.position.label}: ${item.card.nameKo} (${orientationLabel(item.orientation)}) · ${item.card.keywords.join(', ')}`).join('\n');
  const sectionLines = result.sections.map((section) => `\n[${section.title}]\n${section.content}`).join('\n');
  return `[${result.title}]\n\n${result.summary}\n\n${cardLines}\n${sectionLines}\n\n※ ${result.disclaimer}`;
}

function safeParse<T>(element: Element | null, fallback: T): T {
  if (!element?.textContent) return fallback;
  try {
    return JSON.parse(element.textContent) as T;
  } catch {
    return fallback;
  }
}

function saveHistory(slug: string, result: ReadingResult): void {
  const key = `tarotmind.readings.${slug}`;
  const prev = safeParse<ReadingResult[]>(null, []);
  const raw = safeGetItem(key);
  let items: ReadingResult[] = [];
  if (raw) {
    try { items = JSON.parse(raw) as ReadingResult[]; } catch { items = prev; }
  }
  items.unshift(result);
  safeSetItem(key, JSON.stringify(items.slice(0, 5)));
}

function renderHistory(root: HTMLElement, slug: string): void {
  const wrap = root.querySelector<HTMLElement>('[data-history-wrap]');
  const list = root.querySelector<HTMLElement>('[data-history]');
  if (!wrap || !list) return;
  const raw = safeGetItem(`tarotmind.readings.${slug}`);
  if (!raw) {
    wrap.hidden = true;
    list.innerHTML = '';
    return;
  }
  let items: ReadingResult[] = [];
  try { items = JSON.parse(raw) as ReadingResult[]; } catch { items = []; }
  if (items.length === 0) {
    wrap.hidden = true;
    list.innerHTML = '';
    return;
  }
  wrap.hidden = false;
  list.innerHTML = items.map((item) => `<article class="history-item"><strong>${item.title}</strong><p>${item.summary}</p><time>${new Date(item.createdAt).toLocaleString('ko-KR')}</time></article>`).join('');
}

function initReader(root: HTMLElement): void {
  const config = safeParse<ReadingConfig>(root.querySelector('[data-reading-config]'), {} as ReadingConfig);
  const cards = safeParse<TarotCard[]>(root.querySelector('[data-card-data]'), []);
  if (!config.slug || cards.length === 0) return;

  const shuffleButton = root.querySelector<HTMLButtonElement>('[data-shuffle]');
  const redrawButton = root.querySelector<HTMLButtonElement>('[data-redraw]');
  const status = root.querySelector<HTMLElement>('[data-picked-status]');
  const choiceAInput = root.querySelector<HTMLInputElement>('[data-choice-a]');
  const choiceBInput = root.querySelector<HTMLInputElement>('[data-choice-b]');
  const useReversed = root.querySelector<HTMLInputElement>('[data-use-reversed]');
  const saveReading = root.querySelector<HTMLInputElement>('[data-save-reading]');
  const cardButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-card-choice]')];
  const resultWrap = root.querySelector<HTMLElement>('[data-result]');
  const resultTitle = root.querySelector<HTMLElement>('[data-result-title]');
  const resultSummary = root.querySelector<HTMLElement>('[data-result-summary]');
  const resultCards = root.querySelector<HTMLElement>('[data-result-cards]');
  const resultSections = root.querySelector<HTMLElement>('[data-result-sections]');
  const resultDisclaimer = root.querySelector<HTMLElement>('[data-result-disclaimer]');
  const resultAdSlot = root.querySelector<HTMLElement>('[data-adfit-slot][data-adfit-autoload="false"]');
  const copyResult = root.querySelector<HTMLButtonElement>('[data-copy-result]');
  const copyShare = root.querySelector<HTMLButtonElement>('[data-copy-share]');
  const clearHistoryButtons = [...root.querySelectorAll<HTMLButtonElement>('[data-clear-history]')];

  let deck: TarotCard[] = [];
  let selected: DrawnCard[] = [];
  let latestResult: ReadingResult | null = null;
  const required = config.positions.length;

  function startShuffle(): void {
    selected = [];
    latestResult = null;
    deck = shuffle(cards);
    resultWrap && (resultWrap.hidden = true);
    cardButtons.forEach((button) => {
      button.disabled = false;
      button.classList.remove('is-revealed', 'is-picked');
      const face = button.querySelector<HTMLElement>('.tarot-card-face');
      if (face) face.innerHTML = '';
    });
    if (status) status.textContent = `0 / ${required}장 선택됨`;
  }

  function renderResult(result: ReadingResult): void {
    if (!resultWrap || !resultTitle || !resultSummary || !resultCards || !resultSections || !resultDisclaimer) return;
    resultWrap.hidden = false;
    resultTitle.textContent = result.title;
    resultSummary.textContent = result.summary;
    resultCards.innerHTML = result.cards.map((item) => `
      <article class="drawn-card">
        <img class="drawn-card-image ${item.orientation === 'reversed' ? 'is-reversed' : ''}" src="${cardImageSrc(item.card)}" alt="${escapeHtml(item.card.nameKo)} 카드 이미지" width="500" height="866" loading="lazy" decoding="async" />
        <div>
          <strong>${escapeHtml(item.card.nameKo)}</strong>
          <span>${escapeHtml(item.card.nameEn)}</span>
          <em>${orientationLabel(item.orientation)}</em>
          <p>${escapeHtml(item.position.label)} · ${escapeHtml(item.card.keywords.join(', '))}</p>
        </div>
      </article>
    `).join('');
    resultSections.innerHTML = result.sections.map((section) => `
      <article class="result-section-item">
        <h3>${section.title}</h3>
        <p>${section.content}</p>
      </article>
    `).join('');
    resultDisclaimer.textContent = result.disclaimer;
    window.TarotMindAdFit?.mount(resultAdSlot);
    resultWrap.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function reveal(button: HTMLButtonElement, drawn: DrawnCard): void {
    button.classList.add('is-revealed', 'is-picked');
    button.disabled = true;
    const face = button.querySelector<HTMLElement>('.tarot-card-face');
    if (face) {
      face.innerHTML = `
        <img class="tarot-card-image ${drawn.orientation === 'reversed' ? 'is-reversed' : ''}" src="${cardImageSrc(drawn.card)}" alt="${escapeHtml(drawn.card.nameKo)} 카드 이미지" width="500" height="866" decoding="async" />
        <span class="tarot-card-orientation">${orientationLabel(drawn.orientation)}</span>
      `;
    }
  }

  cardButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      if (selected.length >= required || !deck[index]) return;
      const position = config.positions[selected.length];
      const drawn: DrawnCard = {
        card: deck[index],
        orientation: makeOrientation(Boolean(useReversed?.checked)),
        position
      };
      selected.push(drawn);
      reveal(button, drawn);
      if (status) status.textContent = `${selected.length} / ${required}장 선택됨`;
      if (selected.length === required) {
        cardButtons.forEach((item) => {
          if (!item.classList.contains('is-picked')) item.disabled = true;
        });
        const result = buildResult(config, selected, choiceAInput?.value.trim() ?? '', choiceBInput?.value.trim() ?? '');
        latestResult = result;
        renderResult(result);
        if (saveReading?.checked) {
          saveHistory(config.slug, result);
          renderHistory(root, config.slug);
        }
      }
    });
  });

  shuffleButton?.addEventListener('click', startShuffle);
  redrawButton?.addEventListener('click', startShuffle);
  copyResult?.addEventListener('click', async () => {
    if (!latestResult) return;
    await navigator.clipboard.writeText(resultToText(latestResult));
    copyResult.textContent = '복사 완료';
    window.setTimeout(() => { copyResult.textContent = '결과 복사하기'; }, 1600);
  });
  copyShare?.addEventListener('click', async () => {
    if (!latestResult) return;
    await navigator.clipboard.writeText(`${latestResult.title}\n${latestResult.summary}\n\n타로마음에서 카드 리딩 보기`);
    copyShare.textContent = '공유 문구 복사 완료';
    window.setTimeout(() => { copyShare.textContent = '공유 문구 복사'; }, 1600);
  });
  clearHistoryButtons.forEach((clearHistory) => clearHistory.addEventListener('click', () => {
    safeRemoveItem(`tarotmind.readings.${config.slug}`);
    renderHistory(root, config.slug);
  }));

  startShuffle();
  renderHistory(root, config.slug);
}

export function initTarotReaders(): void {
  if (typeof document === 'undefined') return;
  document.querySelectorAll<HTMLElement>('[data-tarot-reader]').forEach((root) => {
    if (root.dataset.ready === 'true') return;
    root.dataset.ready = 'true';
    initReader(root);
  });
}
