import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss'
})
export class FooterComponent {
    readonly currentYear = new Date().getFullYear();

    readonly quickLinks = [
        { label: 'Beneficii', href: '#beneficii' },
        { label: 'Meserii', href: '#meserii' },
        { label: 'Cerințe', href: '#cerinte' },
        { label: 'Aplică', href: '#aplica' }
    ];

    readonly legalLinks = [
        { label: 'Politica de Confidențialitate', href: '#' },
        { label: 'Termeni și Condiții', href: '#' },
        { label: 'GDPR', href: '#' }
    ];

    scrollToSection(event: Event, href: string): void {
        event.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}
