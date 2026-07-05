/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_URL?: string;
  readonly NAVER_SITE_VERIFICATION?: string;
  readonly PUBLIC_ADFIT_TOP_UNIT?: string;
  readonly PUBLIC_ADFIT_MIDDLE_UNIT?: string;
  readonly PUBLIC_ADFIT_BOTTOM_UNIT?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
