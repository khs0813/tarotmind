type CardImageSource = {
  id: string;
};

const majorFilenames: Record<string, string> = {
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

export function riderWaiteFilename(card: CardImageSource): string | null {
  if (majorFilenames[card.id]) return majorFilenames[card.id];

  const match = card.id.match(/^(wands|cups|swords|pentacles)-(ace|two|three|four|five|six|seven|eight|nine|ten|page|knight|queen|king)$/);
  if (!match) return null;

  return `${suitPrefix[match[1]]}${rankNumber[match[2]]}.jpg`;
}

export function cardImageSrc(card: CardImageSource): string {
  const fileName = riderWaiteFilename(card);
  return fileName ? `/tarot/rws/${fileName}` : '';
}
