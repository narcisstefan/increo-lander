import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  APP_INITIALIZER,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { TranslationService } from './core/services/translation.service';
import { extractLanguageFromPath } from './core/i18n/i18n.config';

function initializeTranslationsFactory(): () => Promise<void> {
  const translationService = inject(TranslationService);
  const platformId = inject(PLATFORM_ID);
  const document = inject(DOCUMENT);
  const router = inject(Router);

  return async () => {
    let currentPath = '/';

    if (isPlatformBrowser(platformId)) {
      currentPath = window.location.pathname;
    } else {
      if (router.url && router.url !== '/') {
        currentPath = router.url;
      } else if (document.URL) {
        try {
          const url = new URL(document.URL);
          currentPath = url.pathname;
        } catch {
          // URL parsing failed
        }
      }
    }

    const lang = extractLanguageFromPath(currentPath);
    await translationService.loadTranslations(lang);
    translationService.setLanguage(lang);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeTranslationsFactory,
      multi: true,
    },
  ],
};
