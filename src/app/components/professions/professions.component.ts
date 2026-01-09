import { Component } from '@angular/core';

interface Profession {
    icon: string;
    title: string;
    salary: string;
}

@Component({
    selector: 'app-professions',
    standalone: true,
    templateUrl: './professions.component.html',
    styleUrl: './professions.component.scss'
})
export class ProfessionsComponent {
    readonly professions: Profession[] = [
        { icon: '🧱', title: 'Zidar', salary: '5,000-6,000 CHF' },
        { icon: '🪵', title: 'Dulgher', salary: '5,000-6,500 CHF' },
        { icon: '⚡', title: 'Electrician', salary: '5,500-7,000 CHF' },
        { icon: '🔧', title: 'Instalator', salary: '5,000-6,500 CHF' },
        { icon: '🪞', title: 'Faianțar', salary: '4,800-5,800 CHF' },
        { icon: '📐', title: 'Rigipsar', salary: '4,500-5,500 CHF' },
        { icon: '🚪', title: 'Tâmplar', salary: '5,000-6,000 CHF' },
        { icon: '🎨', title: 'Finisor', salary: '4,500-5,500 CHF' },
        { icon: '🏗️', title: 'Fierar Betonist', salary: '5,200-6,200 CHF' },
        { icon: '👷', title: 'Șef Șantier', salary: '6,000-8,000 CHF' }
    ];
}
