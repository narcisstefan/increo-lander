export interface LanguageConfig {
  code: string;
  name: string;
  nativeName: string;
  locale: string;
  direction: 'ltr' | 'rtl';
}

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'ro', name: 'Romanian', nativeName: 'Română', locale: 'ro_RO', direction: 'ltr' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', locale: 'de_DE', direction: 'ltr' },
];

export const DEFAULT_LANGUAGE = 'ro';
export const LANGUAGE_CODES = SUPPORTED_LANGUAGES.map((l) => l.code);

export function isLanguageSupported(lang: string): boolean {
  return LANGUAGE_CODES.includes(lang);
}

export function getLanguageConfig(code: string): LanguageConfig | undefined {
  return SUPPORTED_LANGUAGES.find((l) => l.code === code);
}

export function buildLocalizedUrl(lang: string, slug: string = ''): string {
  const cleanSlug = slug.replace(/^\/+/, '');
  if (lang === DEFAULT_LANGUAGE) {
    return cleanSlug ? `/${cleanSlug}` : '/';
  }
  return cleanSlug ? `/${lang}/${cleanSlug}` : `/${lang}`;
}

export function extractLanguageFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0 && isLanguageSupported(segments[0])) {
    return segments[0];
  }
  return DEFAULT_LANGUAGE;
}

export function extractSlugFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  if (segments.length > 0 && isLanguageSupported(segments[0])) {
    return segments.slice(1).join('/');
  }
  return segments.join('/');
}
