export type FAQItem = {
  question: string;
  answer: string;
};

export type TarotPosition = {
  id: string;
  label: string;
  description: string;
};

export type TarotReadingPage = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: 'daily' | 'love' | 'career' | 'money' | 'choice';
  spreadType: 'one-card' | 'three-card' | 'yes-no' | 'choice';
  targetKeywords: string[];
  positions: TarotPosition[];
  faqs: FAQItem[];
  relatedSlugs: string[];
  intro: string;
  sections: { title: string; content: string }[];
};

const oneCard: TarotPosition[] = [
  { id: 'message', label: '오늘의 메시지', description: '지금 가장 먼저 살펴보면 좋은 흐름입니다.' }
];

const relationship: TarotPosition[] = [
  { id: 'self', label: '나의 마음', description: '현재 내가 관계에서 느끼는 핵심 흐름입니다.' },
  { id: 'flow', label: '관계의 흐름', description: '상대 또는 관계가 보여주는 분위기입니다.' },
  { id: 'advice', label: '조언', description: '지금 현실적으로 참고하면 좋은 조언입니다.' }
];

const pastPresentFuture: TarotPosition[] = [
  { id: 'past', label: '과거', description: '지금 상황에 영향을 준 지난 흐름입니다.' },
  { id: 'present', label: '현재', description: '현재 가장 중요하게 봐야 할 분위기입니다.' },
  { id: 'future', label: '미래', description: '앞으로 이어질 수 있는 가능성입니다.' }
];

const career: TarotPosition[] = [
  { id: 'situation', label: '현재 상황', description: '업무, 취업, 이직 고민의 현재 흐름입니다.' },
  { id: 'opportunity', label: '기회와 변수', description: '앞으로 살펴볼 수 있는 기회 또는 변수입니다.' },
  { id: 'advice', label: '커리어 조언', description: '현실적으로 취할 수 있는 행동 방향입니다.' }
];

const money: TarotPosition[] = [
  { id: 'flow', label: '돈의 흐름', description: '현재 금전운과 지출 흐름입니다.' },
  { id: 'caution', label: '주의할 지출', description: '조심해서 살펴볼 필요가 있는 부분입니다.' },
  { id: 'advice', label: '금전 관리 조언', description: '오늘 참고할 수 있는 돈 관리 방향입니다.' }
];

const choice: TarotPosition[] = [
  { id: 'optionA', label: '선택 A', description: '첫 번째 선택지가 보여주는 흐름입니다.' },
  { id: 'optionB', label: '선택 B', description: '두 번째 선택지가 보여주는 흐름입니다.' }
];

export const tarotReadings: TarotReadingPage[] = [
  {
    slug: 'today',
    title: '오늘의 타로 | 무료 AI 타로 리딩',
    shortTitle: '오늘의 타로',
    description: '카드 한 장을 뽑아 오늘의 흐름, 조언, 주의할 점을 확인할 수 있는 무료 AI 스타일 타로 리딩입니다.',
    category: 'daily',
    spreadType: 'one-card',
    targetKeywords: ['오늘의 타로', '오늘 타로', '오늘의 운세 타로', '무료 타로'],
    positions: oneCard,
    intro: '오늘의 타로는 카드 한 장으로 지금 하루의 분위기와 현실적인 조언을 가볍게 확인하는 리딩입니다.',
    sections: [
      { title: '오늘의 타로를 보는 방법', content: '질문을 너무 복잡하게 만들기보다 오늘 내가 살펴보면 좋은 흐름을 떠올린 뒤 카드를 선택하세요. 결과는 하루를 단정하는 예언이 아니라 생각을 정리하는 참고 문장으로 활용하는 것이 좋습니다.' },
      { title: '카드 한 장 리딩의 장점', content: '한 장 타로는 빠르게 분위기를 확인하기 좋습니다. 복잡한 선택보다 오늘의 태도, 조심할 점, 작은 행동을 정리할 때 잘 맞습니다.' }
    ],
    faqs: [
      { question: '오늘의 타로 결과가 하루를 정확히 예언하나요?', answer: '아닙니다. 결과는 오락 및 참고용이며, 하루를 어떻게 바라볼지 생각을 정리하는 데 활용하는 것이 좋습니다.' },
      { question: '질문 없이도 볼 수 있나요?', answer: '네. 별도 입력 없이 카드를 선택하면 바로 리딩 결과를 확인할 수 있습니다.' },
      { question: '하루에 여러 번 뽑아도 되나요?', answer: '가능합니다. 다만 결과를 계속 바꾸기보다 처음 나온 메시지를 현실적인 조언으로 가볍게 참고해보세요.' }
    ],
    relatedSlugs: ['three-card', 'love', 'money']
  },
  {
    slug: 'love',
    title: '연애 타로 | 사랑의 흐름을 보는 무료 타로',
    shortTitle: '연애 타로',
    description: '현재 마음, 관계 흐름, 연애 조언을 카드 3장으로 확인하는 무료 AI 스타일 연애운 타로 리딩입니다.',
    category: 'love',
    spreadType: 'three-card',
    targetKeywords: ['연애 타로', '사랑 타로', '무료 연애운 타로', '연애운 타로'],
    positions: relationship,
    intro: '연애 타로는 내 마음, 관계의 분위기, 지금 필요한 조언을 3장의 카드로 나누어 살펴보는 리딩입니다.',
    sections: [
      { title: '연애 타로를 볼 때 좋은 질문', content: '“이 관계에서 내가 확인해야 할 점은 무엇일까?”, “지금 필요한 태도는 무엇일까?”처럼 상대를 단정하는 질문보다 내 선택과 행동을 돌아보는 질문이 좋습니다.' },
      { title: '관계 리딩을 현실적으로 활용하는 법', content: '타로 결과가 긍정적이어도 실제 관계는 대화, 상황, 서로의 선택에 따라 달라집니다. 결과는 상대의 마음을 확정하는 도구가 아니라 관계를 차분히 바라보는 참고로 사용하세요.' }
    ],
    faqs: [
      { question: '연애 타로가 상대의 마음을 정확히 알 수 있나요?', answer: '아닙니다. 타로는 오락 및 참고용이며 상대의 실제 마음을 확정하지 않습니다. 관계에서는 직접적인 대화와 현실적인 상황 확인이 중요합니다.' },
      { question: '연애 타로 결과가 나쁘면 관계가 끝난다는 뜻인가요?', answer: '그렇게 단정할 수 없습니다. 결과는 현재 살펴볼 지점을 알려주는 참고 문장으로 보는 것이 좋습니다.' },
      { question: '같은 질문을 반복해서 봐도 되나요?', answer: '반복 리딩은 혼란을 줄 수 있으므로 같은 질문은 충분히 시간을 두고 보는 편이 좋습니다.' }
    ],
    relatedSlugs: ['reunion', 'choice', 'today']
  },
  {
    slug: 'reunion',
    title: '재회 타로 | 다시 이어질 가능성을 보는 무료 타로',
    shortTitle: '재회 타로',
    description: '과거의 흐름, 현재 분위기, 앞으로의 가능성을 카드 3장으로 살펴보는 무료 재회운 타로 리딩입니다.',
    category: 'love',
    spreadType: 'three-card',
    targetKeywords: ['재회 타로', '재회운 타로', '전남친 재회 타로', '전여친 재회 타로'],
    positions: pastPresentFuture,
    intro: '재회 타로는 지난 관계의 흐름, 현재 분위기, 앞으로 생각해볼 수 있는 가능성을 차분하게 정리하는 리딩입니다.',
    sections: [
      { title: '재회 타로의 핵심은 가능성보다 현실 점검', content: '재회 리딩은 “반드시 돌아온다”를 확인하는 도구가 아닙니다. 현재 내가 할 수 있는 행동, 기다림의 부담, 다시 대화할 준비가 되었는지를 살펴보는 것이 중요합니다.' },
      { title: '재회 고민에서 조심할 점', content: '상대의 상황을 무시한 연락, 불안 때문에 반복하는 확인, 스스로를 지치게 하는 기다림은 오히려 관계 회복을 어렵게 만들 수 있습니다.' }
    ],
    faqs: [
      { question: '재회 타로 결과가 좋으면 반드시 재회하나요?', answer: '아닙니다. 실제 관계 회복 여부는 서로의 상황, 대화, 선택에 따라 달라집니다.' },
      { question: '재회 타로는 언제 보면 좋나요?', answer: '감정이 너무 격할 때보다 어느 정도 차분해진 뒤 자신의 마음과 현실적인 선택을 정리하고 싶을 때 보는 것이 좋습니다.' },
      { question: '결과가 부정적이면 연락하면 안 되나요?', answer: '타로만으로 결정하지 마세요. 현실적인 상황, 상대의 의사, 나의 감정 상태를 함께 고려하는 것이 좋습니다.' }
    ],
    relatedSlugs: ['love', 'choice', 'three-card']
  },
  {
    slug: 'career',
    title: '직장운 타로 | 커리어와 이직 고민을 위한 타로',
    shortTitle: '직장운 타로',
    description: '현재 업무 흐름, 기회와 변수, 커리어 조언을 카드 3장으로 확인하는 무료 직장운 타로 리딩입니다.',
    category: 'career',
    spreadType: 'three-card',
    targetKeywords: ['직장운 타로', '취업운 타로', '이직운 타로', '커리어 타로'],
    positions: career,
    intro: '직장운 타로는 취업, 이직, 업무 관계, 프로젝트 고민을 카드 3장으로 살펴보는 리딩입니다.',
    sections: [
      { title: '직장운 타로를 볼 때 좋은 질문', content: '“지금 업무에서 조심할 점은?”, “이직을 고민할 때 살펴볼 현실 조건은?”처럼 행동과 판단을 정리하는 질문이 좋습니다.' },
      { title: '커리어 결정 전 확인할 것', content: '퇴사, 이직, 계약 같은 중요한 결정은 타로 결과만으로 판단하지 말고 급여, 업무 조건, 성장 가능성, 건강 상태를 함께 확인해야 합니다.' }
    ],
    faqs: [
      { question: '직장운 타로로 이직 여부를 결정해도 되나요?', answer: '아닙니다. 타로는 참고용입니다. 실제 조건, 계약 내용, 커리어 계획을 함께 검토하세요.' },
      { question: '취업운도 볼 수 있나요?', answer: '네. 현재 준비 상태, 기회, 조언을 정리하는 용도로 활용할 수 있습니다.' },
      { question: '결과가 좋지 않으면 지원을 포기해야 하나요?', answer: '그렇게 단정하지 마세요. 결과는 보완할 점을 확인하는 참고로 보는 것이 좋습니다.' }
    ],
    relatedSlugs: ['today', 'choice', 'money']
  },
  {
    slug: 'money',
    title: '금전운 타로 | 돈의 흐름을 보는 무료 타로',
    shortTitle: '금전운 타로',
    description: '현재 금전 흐름, 주의해야 할 지출, 돈 관리 조언을 카드 3장으로 확인하는 무료 금전운 타로 리딩입니다.',
    category: 'money',
    spreadType: 'three-card',
    targetKeywords: ['금전운 타로', '재물운 타로', '돈 타로', '무료 금전운'],
    positions: money,
    intro: '금전운 타로는 돈이 들어오고 나가는 흐름, 지출 습관, 오늘 참고할 수 있는 돈 관리 조언을 살펴보는 리딩입니다.',
    sections: [
      { title: '금전운 타로를 현실적으로 보는 방법', content: '금전운 타로는 투자 수익이나 복권 당첨을 예언하지 않습니다. 지출 습관, 감정적인 소비, 관리해야 할 부분을 돌아보는 참고용 리딩입니다.' },
      { title: '돈 관리에 도움이 되는 질문', content: '“이번 주 지출에서 조심할 점은?”, “돈 문제에서 내가 놓치고 있는 부분은?”처럼 현실적인 관리 질문이 좋습니다.' }
    ],
    faqs: [
      { question: '금전운 타로가 투자 결과를 알려주나요?', answer: '아닙니다. 본 결과는 투자 조언이 아니며 특정 금융상품이나 종목의 매수·매도를 권유하지 않습니다.' },
      { question: '돈이 들어오는 시기를 맞힐 수 있나요?', answer: '타로 결과는 확정적인 예언이 아니라 현재 흐름을 참고하는 오락 콘텐츠입니다.' },
      { question: '결과가 나쁘면 소비를 모두 멈춰야 하나요?', answer: '그렇게 단정할 필요는 없습니다. 필요한 소비와 충동적인 소비를 구분하는 참고로 활용하세요.' }
    ],
    relatedSlugs: ['today', 'career', 'choice']
  },
  {
    slug: 'yes-or-no',
    title: 'Yes or No 타로 | 예 아니오 무료 타로',
    shortTitle: 'Yes or No 타로',
    description: '간단한 질문을 떠올리고 카드 한 장으로 긍정, 보류, 신중함의 흐름을 확인하는 무료 Yes or No 타로입니다.',
    category: 'choice',
    spreadType: 'yes-no',
    targetKeywords: ['예 아니오 타로', 'yes no 타로', '선택 타로', '무료 타로 yes or no'],
    positions: oneCard,
    intro: 'Yes or No 타로는 간단한 선택이나 확인하고 싶은 질문을 카드 한 장으로 살펴보는 리딩입니다.',
    sections: [
      { title: 'Yes or No 타로 질문법', content: '질문은 한 번에 하나만 떠올리세요. “이 선택을 지금 진행해도 좋을까?”처럼 답변 방향을 이해하기 쉬운 질문이 좋습니다.' },
      { title: '결과를 단정하지 않는 이유', content: '카드 결과는 예, 아니오를 확정하는 판정이 아니라 현재 흐름을 긍정, 보류, 신중함으로 나누어 살펴보는 참고 문장입니다.' }
    ],
    faqs: [
      { question: 'Yes가 나오면 반드시 좋은 결과인가요?', answer: '아닙니다. 긍정적인 흐름에 가깝다는 의미로 참고하고 현실 조건을 함께 확인하세요.' },
      { question: 'No가 나오면 포기해야 하나요?', answer: '그렇게 단정할 필요는 없습니다. 준비가 부족하거나 더 신중하게 확인할 점이 있다는 의미로 볼 수 있습니다.' },
      { question: '질문을 여러 개 넣어도 되나요?', answer: '한 번에 하나의 질문만 떠올리는 것이 결과를 이해하기 쉽습니다.' }
    ],
    relatedSlugs: ['choice', 'today', 'three-card']
  },
  {
    slug: 'three-card',
    title: '3장 타로 | 과거 현재 미래 무료 타로',
    shortTitle: '3장 타로',
    description: '과거, 현재, 미래의 흐름을 카드 3장으로 나누어 살펴보는 무료 AI 스타일 3카드 타로 리딩입니다.',
    category: 'daily',
    spreadType: 'three-card',
    targetKeywords: ['3장 타로', '과거 현재 미래 타로', '무료 3카드 타로'],
    positions: pastPresentFuture,
    intro: '3장 타로는 과거의 영향, 현재 상황, 앞으로의 흐름을 나누어 볼 수 있는 가장 기본적인 스프레드입니다.',
    sections: [
      { title: '과거 현재 미래 타로의 의미', content: '과거 카드는 현재에 영향을 준 배경, 현재 카드는 지금 가장 중요한 분위기, 미래 카드는 이어질 수 있는 가능성을 보여줍니다.' },
      { title: '3장 리딩을 활용하는 방법', content: '결과를 미래 예언처럼 단정하기보다 현재 선택을 더 잘 이해하고 현실적인 행동을 정리하는 데 활용하세요.' }
    ],
    faqs: [
      { question: '3장 타로는 어떤 고민에 좋나요?', answer: '관계, 일, 선택, 하루의 흐름처럼 현재 상황을 조금 더 입체적으로 보고 싶을 때 좋습니다.' },
      { question: '미래 카드가 나쁘면 안 좋은 일이 생기나요?', answer: '아닙니다. 미래 카드는 가능성을 보여주는 참고이며 현재 행동에 따라 흐름은 달라질 수 있습니다.' },
      { question: '과거 카드는 꼭 오래전 일을 뜻하나요?', answer: '꼭 그렇지는 않습니다. 지금 상황에 영향을 준 배경이나 최근 흐름을 의미할 수도 있습니다.' }
    ],
    relatedSlugs: ['today', 'yes-or-no', 'choice']
  },
  {
    slug: 'choice',
    title: '선택 고민 타로 | 둘 중 하나를 비교하는 무료 타로',
    shortTitle: '선택 고민 타로',
    description: '선택 A와 선택 B의 흐름을 카드로 비교해 고민을 정리할 수 있는 무료 AI 스타일 선택 타로입니다.',
    category: 'choice',
    spreadType: 'choice',
    targetKeywords: ['선택 타로', '고민 타로', '둘 중 하나 타로', '결정 타로'],
    positions: choice,
    intro: '선택 고민 타로는 두 가지 선택지를 놓고 각각의 분위기와 현실적으로 확인할 점을 비교해보는 리딩입니다.',
    sections: [
      { title: '선택 고민 타로를 쓰는 방법', content: '선택 A와 선택 B를 짧게 적고 카드를 뽑아보세요. 결과는 어느 쪽이 무조건 옳다는 판단보다 각각의 장단점을 살펴보는 참고로 활용하는 것이 좋습니다.' },
      { title: '중요한 결정에서는 현실 정보가 우선입니다', content: '진학, 이직, 금전, 법률, 건강과 관련된 결정은 타로 결과만으로 판단하지 말고 필요한 정보를 확인하고 전문가와 상담하세요.' }
    ],
    faqs: [
      { question: '선택 고민 타로가 정답을 알려주나요?', answer: '아닙니다. 결과는 선택지를 비교해 생각을 정리하는 참고용입니다.' },
      { question: '선택지가 세 개 이상이면 어떻게 하나요?', answer: 'MVP에서는 두 가지 선택지를 기준으로 제공합니다. 세 가지 이상이면 가장 고민되는 두 가지를 먼저 비교해보세요.' },
      { question: '결과가 마음에 들지 않으면 다시 뽑아도 되나요?', answer: '가능하지만 결과를 반복해서 바꾸기보다 왜 마음에 들지 않았는지 생각해보는 것도 도움이 됩니다.' }
    ],
    relatedSlugs: ['yes-or-no', 'love', 'career']
  }
];

export function getReadingBySlug(slug: string) {
  return tarotReadings.find((reading) => reading.slug === slug);
}
