export type AdFitPlacement = 'hub-primary' | 'reading-primary' | 'card-index-primary' | 'card-detail-primary';

type AdFitSlotConfig = {
  placement: AdFitPlacement;
  unitId?: string;
  width: 300;
  height: 250;
};

const DEFAULT_ALLOWED_HOSTS = ['tarocue.co.kr'];

const isEnabled = (value: string | undefined): boolean => value?.trim().toLowerCase() === 'true';

function parseAllowedHosts(value: string | undefined): string[] {
  const hosts = value
    ?.split(',')
    .map((host) => host.trim().toLowerCase())
    .filter((host) => host && host !== '*') ?? [];

  return hosts.length > 0 ? hosts : DEFAULT_ALLOWED_HOSTS;
}

export const ADFIT_ENABLED = isEnabled(import.meta.env.ADFIT_ENABLED);
export const ADFIT_DEBUG_PLACEHOLDERS = isEnabled(import.meta.env.ADFIT_DEBUG_PLACEHOLDERS);
export const ADFIT_ALLOWED_HOSTS = parseAllowedHosts(import.meta.env.ADFIT_ALLOWED_HOSTS);

const unitIds: Record<AdFitPlacement, string | undefined> = {
  'hub-primary': import.meta.env.ADFIT_HOME_300X250?.trim(),
  'reading-primary': import.meta.env.ADFIT_TAROT_RESULT_300X250?.trim(),
  'card-index-primary': import.meta.env.ADFIT_CARD_INDEX_300X250?.trim(),
  'card-detail-primary': import.meta.env.ADFIT_CARD_DETAIL_300X250?.trim()
};

export function getAdFitSlot(placement: AdFitPlacement): AdFitSlotConfig {
  return {
    placement,
    unitId: unitIds[placement],
    width: 300,
    height: 250
  };
}
