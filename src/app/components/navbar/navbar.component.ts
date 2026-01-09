import { Component, signal, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';
import { LanguageService } from '../../core/services/language.service';
import { SUPPORTED_LANGUAGES, LanguageConfig } from '../../core/i18n/i18n.config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private platformId = inject(PLATFORM_ID);
  private translationService = inject(TranslationService);
  private languageService = inject(LanguageService);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);
  isLangMenuOpen = signal(false);

  languages = SUPPORTED_LANGUAGES;

  readonly navLinks = [
    { labelKey: 'nav.benefits', href: '#beneficii' },
    { labelKey: 'nav.professions', href: '#meserii' },
    { labelKey: 'nav.whySwitzerland', href: '#de-ce-elvetia' },
    { labelKey: 'nav.contact', href: '#aplica' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled.set(window.scrollY > 50);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar__lang')) {
      this.isLangMenuOpen.set(false);
    }
  }

  t(key: string): string {
    return this.translationService.t(key);
  }

  getNavLabel(labelKey: string): string {
    return this.translationService.t(labelKey);
  }

  getCurrentLanguage(): LanguageConfig {
    return this.languageService.getCurrentLanguageConfig();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  toggleLangMenu(): void {
    this.isLangMenuOpen.update((v) => !v);
  }

  switchLanguage(lang: LanguageConfig): void {
    this.languageService.switchLanguage(lang.code);
    this.isLangMenuOpen.set(false);
  }

  scrollToSection(event: Event, href: string): void {
    event.preventDefault();
    if (isPlatformBrowser(this.platformId)) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        this.closeMobileMenu();
      }
    }
  }
}
