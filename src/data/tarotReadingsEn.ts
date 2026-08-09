import type { TarotPosition, TarotReadingPage } from './tarotReadings';

const oneCard: TarotPosition[] = [
  { id: 'message', label: 'Today’s Message', description: 'The main message worth checking right now.' }
];

const relationship: TarotPosition[] = [
  { id: 'self', label: 'Your Feelings', description: 'The main emotional pattern you are bringing into the relationship.' },
  { id: 'flow', label: 'Relationship Dynamics', description: 'The mood shown by the other person or by the connection itself.' },
  { id: 'advice', label: 'Advice', description: 'Practical guidance to keep in mind now.' }
];

const pastPresentFuture: TarotPosition[] = [
  { id: 'past', label: 'Past', description: 'A recent or older influence shaping the current situation.' },
  { id: 'present', label: 'Present', description: 'The atmosphere that matters most right now.' },
  { id: 'future', label: 'Future', description: 'A possible next direction if the current pattern continues.' }
];

const career: TarotPosition[] = [
  { id: 'situation', label: 'Current Situation', description: 'The present situation around work, job search, or career change.' },
  { id: 'opportunity', label: 'Opportunity and Variables', description: 'An opening or key variable that deserves attention.' },
  { id: 'advice', label: 'Career Advice', description: 'A practical direction you can act on.' }
];

const money: TarotPosition[] = [
  { id: 'flow', label: 'Financial Pattern', description: 'The current pattern around income, spending, and resources.' },
  { id: 'caution', label: 'Spending Habits to Watch', description: 'A part of your money habits that needs care.' },
  { id: 'advice', label: 'Money Advice', description: 'A money-management direction to consider today.' }
];

const choice: TarotPosition[] = [
  { id: 'optionA', label: 'Option A', description: 'The pattern shown by the first option.' },
  { id: 'optionB', label: 'Option B', description: 'The pattern shown by the second option.' }
];

export const tarotReadingsEn: TarotReadingPage[] = [
  {
    slug: 'today',
    title: 'Daily Tarot | Free One Card Reading for Today',
    shortTitle: 'Daily Tarot',
    description: 'Draw one free daily tarot card for today’s energy, practical advice, and what to watch. A simple AI-style tarot reading with no login required.',
    category: 'daily',
    spreadType: 'one-card',
    targetKeywords: ['daily tarot', 'free daily tarot', 'one card tarot', 'tarot reading today'],
    summary: 'Daily Tarot gives you a quick one-card reading for today’s energy, advice, and a grounded point to keep in mind.',
    positions: oneCard,
    intro: 'Daily Tarot uses one card to help you reflect on the mood of the day and choose one practical next step.',
    sections: [
      { title: 'How to Use a Daily Tarot Reading', content: 'Before drawing a card, think about the main energy you want to understand today. Use the result as a reflective prompt rather than a fixed prediction.' },
      { title: 'Why One Card Works Well', content: 'A one-card tarot spread is best for quick clarity. It is useful when you want to choose an attitude, notice a small warning sign, or settle on a simple action for the day.' }
    ],
    faqs: [
      { question: 'Does a daily tarot card predict the whole day?', answer: 'No. This reading is for entertainment and reflection. It is better used as a prompt for how to view the day.' },
      { question: 'Can I draw a card without typing a question?', answer: 'Yes. Choose a card and the reading will appear immediately.' },
      { question: 'Can I draw more than once a day?', answer: 'You can, but the first message is usually the clearest prompt to reflect on.' }
    ],
    relatedSlugs: ['three-card', 'love', 'money']
  },
  {
    slug: 'love',
    title: 'Love Tarot | Free Relationship Reading for Feelings and Dynamics',
    shortTitle: 'Love Tarot',
    description: 'Use this free love tarot reading to reflect on relationship dynamics, emotional mood, and practical advice for your next step.',
    category: 'love',
    spreadType: 'three-card',
    targetKeywords: ['love tarot', 'free love tarot reading', 'relationship tarot', 'how they feel tarot'],
    summary: 'Love Tarot looks at your feelings, the relationship dynamics, and advice for handling the connection more calmly.',
    positions: relationship,
    intro: 'Love Tarot uses three cards to separate your feelings, the relationship atmosphere, and the advice that matters now.',
    sections: [
      { title: 'Good Love Tarot Questions', content: 'Questions such as "What should I notice in this relationship?" or "What attitude helps now?" are usually more useful than trying to prove exactly what someone else feels.' },
      { title: 'Using Relationship Readings Realistically', content: 'Even a positive card does not replace conversation, timing, and each person’s choices. Treat the reading as a way to look at the relationship more clearly.' }
    ],
    faqs: [
      { question: 'Can love tarot tell exactly how someone feels?', answer: 'No. Tarot is reflective entertainment. Direct communication and real-life context matter in relationships.' },
      { question: 'Does a difficult result mean the relationship is over?', answer: 'No. A difficult result usually points to something that needs attention, not a fixed ending.' },
      { question: 'Can I repeat the same love question?', answer: 'You can, but repeated readings can increase confusion. Leave time between readings.' }
    ],
    relatedSlugs: ['reunion', 'choice', 'today']
  },
  {
    slug: 'reunion',
    title: 'Reconciliation Tarot | Free Reading for Reconnection and Contact',
    shortTitle: 'Reconciliation Tarot',
    description: 'Reflect on a past relationship with a free reconciliation tarot reading for emotional readiness, possible contact, and advice before reconnecting.',
    category: 'love',
    spreadType: 'three-card',
    targetKeywords: ['reconciliation tarot', 'reunion tarot', 'will they come back tarot', 'ex tarot reading'],
    summary: 'Reconciliation Tarot helps you review the past, the present mood, and possible next steps after a breakup.',
    positions: pastPresentFuture,
    intro: 'Reconciliation Tarot is a three-card spread for checking past influence, current atmosphere, and a possible next direction.',
    sections: [
      { title: 'Focus on Reality, Not Certainty', content: 'A reconciliation reading should not be used to prove that someone will definitely return. It is more useful for checking your readiness, emotional burden, and the healthiest next step.' },
      { title: 'What to Be Careful About', content: 'Repeatedly checking the same question, ignoring the other person’s boundaries, or waiting in a way that drains you can make reconnection harder.' }
    ],
    faqs: [
      { question: 'Does a positive reconciliation tarot result guarantee reconnection?', answer: 'No. Real reconnection depends on both people’s situation, communication, and choices.' },
      { question: 'When is a good time to use reconciliation tarot?', answer: 'It is better after the strongest emotions have settled enough for you to reflect clearly.' },
      { question: 'If the result is negative, should I avoid contact?', answer: 'Do not decide from tarot alone. Consider the real situation, the other person’s wishes, and your own emotional state.' }
    ],
    relatedSlugs: ['love', 'choice', 'three-card']
  },
  {
    slug: 'career',
    title: 'Career Tarot | Free Reading for Work, Jobs, and Direction',
    shortTitle: 'Career Tarot',
    description: 'Draw a free career tarot spread for work questions, job search, career changes, opportunities, and practical advice.',
    category: 'career',
    spreadType: 'three-card',
    targetKeywords: ['career tarot', 'job tarot reading', 'work tarot', 'career change tarot'],
    summary: 'Career Tarot helps you reflect on your current work situation, possible opportunities, and a practical direction to take.',
    positions: career,
    intro: 'Career Tarot uses three cards to review work, job search, career changes, projects, or workplace relationships.',
    sections: [
      { title: 'Useful Career Tarot Questions', content: 'Ask questions that help clarify action, such as "What should I check before changing jobs?" or "What is the main variable in my current work situation?"' },
      { title: 'Before Making Career Decisions', content: 'For resignation, job changes, contracts, or major career moves, review pay, working conditions, growth, health, and professional advice alongside the reading.' }
    ],
    faqs: [
      { question: 'Can career tarot decide whether I should change jobs?', answer: 'No. Use tarot as a reflection tool and review the real terms, risks, and career plan.' },
      { question: 'Can I use this for job search questions?', answer: 'Yes. It can help you review preparation, opportunities, and advice.' },
      { question: 'Should I give up if the result is difficult?', answer: 'No. Treat a difficult result as a prompt for what to improve or verify.' }
    ],
    relatedSlugs: ['today', 'choice', 'money']
  },
  {
    slug: 'money',
    title: 'Money Tarot | Free Reading for Finances and Spending',
    shortTitle: 'Money Tarot',
    description: 'Use this free money tarot reading to reflect on financial patterns, spending habits, and practical money-management advice.',
    category: 'money',
    spreadType: 'three-card',
    targetKeywords: ['money tarot', 'finance tarot reading', 'free money tarot', 'spending tarot'],
    summary: 'Money Tarot reviews financial patterns, spending habits, and grounded advice for managing money more consciously.',
    positions: money,
    intro: 'Money Tarot uses three cards to check your financial pattern, spending habits to watch, and a practical management point for today.',
    sections: [
      { title: 'Reading Money Tarot Realistically', content: 'Money tarot does not predict investment returns, lottery results, or guaranteed income. It is best used to reflect on spending habits, emotional purchases, and planning.' },
      { title: 'Helpful Money Questions', content: 'Ask practical questions such as "What spending pattern should I watch this week?" or "What am I missing in my current money management?"' }
    ],
    faqs: [
      { question: 'Does money tarot give investment advice?', answer: 'No. This reading is not investment advice and does not recommend any financial product or security.' },
      { question: 'Can tarot tell when money will arrive?', answer: 'No. The result is reflective entertainment, not a fixed prediction.' },
      { question: 'If the result is difficult, should I stop all spending?', answer: 'No. Use it to distinguish necessary spending from impulsive or emotional spending.' }
    ],
    relatedSlugs: ['today', 'career', 'choice']
  },
  {
    slug: 'yes-or-no',
    title: 'Yes or No Tarot | Free One Card Answer Reading',
    shortTitle: 'Yes or No Tarot',
    description: 'Ask a simple question and draw one free Yes or No tarot card for a quick direction, with practical advice and a cautious interpretation.',
    category: 'choice',
    spreadType: 'yes-no',
    targetKeywords: ['yes or no tarot', 'free yes no tarot', 'one card yes no tarot', 'quick tarot answer'],
    summary: 'Yes or No Tarot gives a quick direction for one clear question while reminding you to check the real-world context.',
    positions: oneCard,
    intro: 'Yes or No Tarot is a one-card spread for a simple decision or a question that needs quick direction.',
    sections: [
      { title: 'How to Ask a Yes or No Question', content: 'Keep the question to one sentence. A question like "Is this a good time to move forward?" is easier to interpret than a vague or multi-part question.' },
      { title: 'Why the Answer Is Not Absolute', content: 'The card does not force a decision. It points toward Yes, Maybe, or No as a way to review the current situation.' }
    ],
    faqs: [
      { question: 'Does Yes always mean the outcome will be good?', answer: 'No. It means the current conditions are more supportive, but practical details still matter.' },
      { question: 'Does No mean I should give up?', answer: 'No. It may mean the timing, preparation, or missing information needs more care.' },
      { question: 'Can I ask several questions at once?', answer: 'One question at a time is best for a clear result.' }
    ],
    relatedSlugs: ['choice', 'today', 'three-card']
  },
  {
    slug: 'three-card',
    title: 'Three Card Tarot | Free Past Present Future Reading',
    shortTitle: 'Three Card Tarot',
    description: 'Draw a free three-card tarot spread for past, present, and future direction. Useful for relationships, work, choices, and daily reflection.',
    category: 'daily',
    spreadType: 'three-card',
    targetKeywords: ['three card tarot', 'past present future tarot', 'free 3 card tarot', 'three card spread'],
    summary: 'Three Card Tarot helps you read the context of a question through past influence, present energy, and possible future direction.',
    positions: pastPresentFuture,
    intro: 'Three Card Tarot is a classic spread for separating past influence, present situation, and possible future direction.',
    sections: [
      { title: 'What Past, Present, and Future Mean', content: 'The past card shows an influence, the present card shows the current focus, and the future card shows a possible direction if the pattern continues.' },
      { title: 'How to Use a Three Card Reading', content: 'Avoid treating the future card as a fixed prediction. Use all three cards to understand your current choice more clearly.' }
    ],
    faqs: [
      { question: 'What questions work well with a three-card spread?', answer: 'Relationships, work, choices, and daily situations work well when you want more context than one card.' },
      { question: 'Does a difficult future card mean something bad will happen?', answer: 'No. It shows a possibility and can change with your actions and circumstances.' },
      { question: 'Does the past card always mean long ago?', answer: 'No. It can describe a recent background or an influence behind the current situation.' }
    ],
    relatedSlugs: ['today', 'yes-or-no', 'choice']
  },
  {
    slug: 'choice',
    title: 'Decision Tarot | Free Reading to Compare Two Options',
    shortTitle: 'Decision Tarot',
    description: 'Compare Option A and Option B with a free two-card choice tarot reading that helps you reflect on each path and its practical tradeoffs.',
    category: 'choice',
    spreadType: 'choice',
    targetKeywords: ['choice tarot', 'decision tarot', 'two options tarot', 'free decision tarot'],
    summary: 'Decision Tarot compares two options so you can reflect on each path, its benefits, and the practical points to verify.',
    positions: choice,
    intro: 'Choice Tarot lays out two cards for Option A and Option B so you can compare the mood and practical checks for each path.',
    sections: [
      { title: 'How to Use Decision Tarot', content: 'Name Option A and Option B briefly, then draw the cards. The result is not a verdict; it is a way to compare benefits, burdens, and overlooked details.' },
      { title: 'Real Information Comes First', content: 'For school, work, money, legal, or health decisions, verify the facts and seek qualified advice instead of deciding from tarot alone.' }
    ],
    faqs: [
      { question: 'Does decision tarot tell me the correct answer?', answer: 'No. It helps compare options and organize your thoughts.' },
      { question: 'What if I have more than two options?', answer: 'This version compares two options. Start with the two choices that feel most important.' },
      { question: 'Can I redraw if I dislike the result?', answer: 'You can, but it may be more useful to ask why the result felt uncomfortable.' }
    ],
    relatedSlugs: ['yes-or-no', 'love', 'career']
  }
];

export function getEnglishReadingBySlug(slug: string) {
  return tarotReadingsEn.find((reading) => reading.slug === slug);
}
