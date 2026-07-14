/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_URL?: string;
  readonly NEXT_PUBLIC_SITE_URL?: string;
  readonly NAVER_SITE_VERIFICATION?: string;
  readonly ADFIT_ENABLED?: string;
  readonly ADFIT_TAROT_RESULT_300X250?: string;
  readonly ADFIT_CARD_DETAIL_300X250?: string;
  readonly ADFIT_CARD_INDEX_300X250?: string;
  readonly ADFIT_HOME_300X250?: string;
  readonly ADFIT_DEBUG_PLACEHOLDERS?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
