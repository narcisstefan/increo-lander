import { Component, signal, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';
import { LanguageService } from '../../core/services/language.service';
import { SUPPORTED_LANGUAGES, LanguageConfig } from '../../core/i18n/i18n.config';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private platformId = inject(PLATFORM_ID);
  private translationService = inject(TranslationService);
  private languageService = inject(LanguageService);

  private _isScrolled = signal(false);
  private _isMobileMenuOpen = signal(false);
  private _isLangMenuOpen = signal(false);

  languages = SUPPORTED_LANGUAGES;

  readonly navLinks = [
    { labelKey: 'nav.benefits', href: '#beneficii' },
    { labelKey: 'nav.professions', href: '#meserii' },
    { labelKey: 'nav.whySwitzerland', href: '#de-ce-elvetia' },
    { labelKey: 'nav.contact', href: '#aplica' },
  ];

  get isScrolled(): boolean {
    return this._isScrolled();
  }

  get isMobileMenuOpen(): boolean {
    return this._isMobileMenuOpen();
  }

  get isLangOpen(): boolean {
    return this._isLangMenuOpen();
  }

  get currentLang(): string {
    return this.getCurrentLanguage().code.toUpperCase();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this._isScrolled.set(window.scrollY > 50);
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.lang-dropdown')) {
      this._isLangMenuOpen.set(false);
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
    this._isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this._isMobileMenuOpen.set(false);
  }

  toggleLangDropdown(): void {
    this._isLangMenuOpen.update((v) => !v);
  }

  changeLanguage(langCode: string): void {
    this.languageService.switchLanguage(langCode);
    this._isLangMenuOpen.set(false);
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

