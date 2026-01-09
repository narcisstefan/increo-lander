import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_LANGUAGE, isLanguageSupported } from '../i18n/i18n.config';

export type Translations = Record<string, any>;

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private platformId = inject(PLATFORM_ID);
  private translations: Map<string, Translations> = new Map();
  private currentLangSubject = new BehaviorSubject<string>(DEFAULT_LANGUAGE);

  currentLang$ = this.currentLangSubject.asObservable();

  get currentLang(): string {
    return this.currentLangSubject.value;
  }

  async loadTranslations(lang: string): Promise<Translations> {
    if (!isLanguageSupported(lang)) {
      lang = DEFAULT_LANGUAGE;
    }

    if (this.translations.has(lang)) {
      return this.translations.get(lang)!;
    }

    try {
      const module = await import(`../../../assets/i18n/${lang}.json`);
      const translations = module.default || module;
      this.translations.set(lang, translations);
      return translations;
    } catch (error) {
      console.error(`Failed to load translations for ${lang}:`, error);
      if (lang !== DEFAULT_LANGUAGE) {
        return this.loadTranslations(DEFAULT_LANGUAGE);
      }
      return {};
    }
  }

  t(key: string, params?: Record<string, string | number>): string {
    return this.translate(key, params);
  }

  translate(key: string, params?: Record<string, string | number>): string {
    const lang = this.currentLang;
    const translations = this.translations.get(lang);

    if (!translations) {
      return key;
    }

    const value = this.getNestedValue(translations, key);

    if (typeof value !== 'string') {
      return key;
    }

    if (params) {
      return this.interpolate(value, params);
    }

    return value;
  }

  getValue(key: string): any {
    const lang = this.currentLang;
    const translations = this.translations.get(lang);
    if (!translations) return undefined;
    return this.getNestedValue(translations, key);
  }

  getArray(key: string): any[] {
    const value = this.getValue(key);
    return Array.isArray(value) ? value : [];
  }

  setLanguage(lang: string): void {
    if (isLanguageSupported(lang)) {
      this.currentLangSubject.next(lang);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem('preferredLanguage', lang);
      }
    }
  }

  private getNestedValue(obj: Translations, key: string): any {
    const keys = key.split('.');
    let current: any = obj;

    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        return undefined;
      }
    }

    return current;
  }

  private interpolate(text: string, params: Record<string, string | number>): string {
    return text.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? String(params[key]) : match;
    });
  }
}
