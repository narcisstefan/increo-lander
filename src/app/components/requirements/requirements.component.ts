import { Component } from '@angular/core';

interface Requirement {
    icon: string;
    title: string;
    description: string;
    highlight?: string;
    borderColor: 'red' | 'gold' | 'blue';
}

@Component({
    selector: 'app-requirements',
    standalone: true,
    templateUrl: './requirements.component.html',
    styleUrl: './requirements.component.scss'
})
export class RequirementsComponent {
    readonly requirements: Requirement[] = [
        {
            icon: '🔧',
            title: 'Experiență în Construcții',
            description: 'Minim 2-3 ani experiență demonstrabilă în domeniul construcțiilor',
            borderColor: 'red'
        },
        {
            icon: '🗣️',
            title: 'Cunoștințe Lingvistice',
            description: 'Cel puțin nivel conversațional într-una din limbi:',
            highlight: 'Germană, Italiană, Franceză sau Portugheză',
            borderColor: 'gold'
        },
        {
            icon: '📅',
            title: 'Disponibilitate',
            description: 'Angajare pe termen lung, minim 6 luni, cu posibilitate de prelungire',
            borderColor: 'blue'
        }
    ];
}
