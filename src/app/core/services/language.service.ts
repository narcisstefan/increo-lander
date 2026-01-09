import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_CODES,
  extractLanguageFromPath,
  extractSlugFromPath,
  buildLocalizedUrl,
  SUPPORTED_LANGUAGES,
  LanguageConfig,
} from '../i18n/i18n.config';
import { TranslationService } from './translation.service';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private router = inject(Router);
  private translationService = inject(TranslationService);
  private platformId = inject(PLATFORM_ID);

  private currentLangSubject = new BehaviorSubject<string>(DEFAULT_LANGUAGE);
  currentLang$ = this.currentLangSubject.asObservable();

  get currentLang(): string {
    return this.currentLangSubject.value;
  }

  get languages(): LanguageConfig[] {
    return SUPPORTED_LANGUAGES;
  }

  constructor() {
    this.initLanguageDetection();
  }

  private initLanguageDetection(): void {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        const lang = extractLanguageFromPath(event.urlAfterRedirects);
        this.setLanguageInternal(lang);
      });

    const initialLang = extractLanguageFromPath(this.router.url);
    this.setLanguageInternal(initialLang);
  }

  private async setLanguageInternal(lang: string): Promise<void> {
    if (!LANGUAGE_CODES.includes(lang)) {
      lang = DEFAULT_LANGUAGE;
    }

    const isNewLang = lang !== this.currentLangSubject.value;

    if (isNewLang) {
      this.currentLangSubject.next(lang);
    }

    await this.translationService.loadTranslations(lang);
    this.translationService.setLanguage(lang);

    if (isPlatformBrowser(this.platformId) && isNewLang) {
      document.documentElement.lang = lang;
    }
  }

  async setLanguage(lang: string): Promise<void> {
    await this.setLanguageInternal(lang);
  }

  switchLanguage(newLang: string): void {
    if (!LANGUAGE_CODES.includes(newLang)) {
      return;
    }

    const currentPath = this.router.url;
    const currentSlug = extractSlugFromPath(currentPath);
    const newPath = buildLocalizedUrl(newLang, currentSlug);

    this.router.navigateByUrl(newPath);
  }

  buildUrl(slug: string): string {
    return buildLocalizedUrl(this.currentLang, slug);
  }

  getCurrentLanguageConfig(): LanguageConfig {
    return SUPPORTED_LANGUAGES.find((l) => l.code === this.currentLang) || SUPPORTED_LANGUAGES[0];
  }
}
