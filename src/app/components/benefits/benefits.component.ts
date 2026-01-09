import { Component } from '@angular/core';

interface Benefit {
    icon: string;
    title: string;
    description: string;
}

@Component({
    selector: 'app-benefits',
    standalone: true,
    templateUrl: './benefits.component.html',
    styleUrl: './benefits.component.scss'
})
export class BenefitsComponent {
    readonly benefits: Benefit[] = [
        {
            icon: '💰',
            title: 'Salarii Atractive',
            description: '4,500 - 7,000 CHF net lunar pentru muncitori calificați în construcții'
        },
        {
            icon: '🏠',
            title: 'Cazare Asigurată',
            description: 'Locuință modernă aproape de șantier, plătită integral de angajator'
        },
        {
            icon: '✈️',
            title: 'Transport Gratuit',
            description: 'Deplasare România-Elveția asigurată complet de către companie'
        },
        {
            icon: '📋',
            title: 'Contract Legal',
            description: 'Contract elvețian cu toate drepturile unui cetățean local'
        },
        {
            icon: '🏥',
            title: 'Asigurare Medicală',
            description: 'Acoperire completă în caz de accident sau boală profesională'
        },
        {
            icon: '🎁',
            title: 'Al 13-lea Salariu',
            description: 'Bonus în decembrie + alte beneficii pe parcursul anului'
        }
    ];
}
