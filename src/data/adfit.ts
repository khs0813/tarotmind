export type AdFitPlacement = 'home' | 'tarot-result' | 'card-index' | 'card-detail';

type AdFitSlotConfig = {
  placement: AdFitPlacement;
  unitId?: string;
  width: 300;
  height: 250;
};

const isTruthy = (value: string | undefined): boolean => ['1', 'true', 'yes', 'on'].includes(value?.trim().toLowerCase() ?? '');

export const ADFIT_ENABLED = isTruthy(import.meta.env.ADFIT_ENABLED);
export const ADFIT_DEBUG_PLACEHOLDERS = isTruthy(import.meta.env.ADFIT_DEBUG_PLACEHOLDERS);

const unitIds: Record<AdFitPlacement, string | undefined> = {
  home: import.meta.env.ADFIT_HOME_300X250?.trim(),
  'tarot-result': import.meta.env.ADFIT_TAROT_RESULT_300X250?.trim(),
  'card-index': import.meta.env.ADFIT_CARD_INDEX_300X250?.trim(),
  'card-detail': import.meta.env.ADFIT_CARD_DETAIL_300X250?.trim()
};

export function getAdFitSlot(placement: AdFitPlacement): AdFitSlotConfig {
  return {
    placement,
    unitId: unitIds[placement],
    width: 300,
    height: 250
  };
}
