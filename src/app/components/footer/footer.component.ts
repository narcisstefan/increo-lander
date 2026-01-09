import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private platformId = inject(PLATFORM_ID);
  private translationService = inject(TranslationService);

  readonly currentYear = new Date().getFullYear();

  readonly quickLinks = [
    { labelKey: 'nav.benefits', href: '#beneficii' },
    { labelKey: 'nav.professions', href: '#meserii' },
    { labelKey: 'nav.requirements', href: '#cerinte' },
    { labelKey: 'nav.apply', href: '#aplica' },
  ];

  readonly legalLinks = [
    { labelKey: 'footer.privacy', href: '#' },
    { labelKey: 'footer.terms', href: '#' },
    { labelKey: 'footer.gdpr', href: '#' },
  ];

  t(key: string, params?: Record<string, string | number>): string {
    return this.translationService.t(key, params);
  }

  scrollToSection(event: Event, href: string): void {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
}
