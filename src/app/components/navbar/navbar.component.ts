import { Component, signal, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private platformId = inject(PLATFORM_ID);

  isScrolled = signal(false);
  isMobileMenuOpen = signal(false);

  readonly navLinks = [
    { label: 'Beneficii', href: '#beneficii' },
    { label: 'Meserii', href: '#meserii' },
    { label: 'De ce Elveția', href: '#de-ce-elvetia' },
    { label: 'Contact', href: '#aplica' }
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isScrolled.set(window.scrollY > 50);
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
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
