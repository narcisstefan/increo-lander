import { Component } from '@angular/core';

interface WhyPoint {
    icon: string;
    title: string;
    description: string;
}

@Component({
    selector: 'app-why-switzerland',
    standalone: true,
    templateUrl: './why-switzerland.component.html',
    styleUrl: './why-switzerland.component.scss'
})
export class WhySwitzerlandComponent {
    readonly mainBenefits: WhyPoint[] = [
        {
            icon: '💰',
            title: 'Cele mai mari salarii din Europa',
            description: 'Elveția oferă cele mai competitive salarii din sectorul construcțiilor. Un muncitor calificat câștigă între 4,500 și 7,000 CHF net lunar - de 3-4 ori mai mult decât în România.'
        },
        {
            icon: '🏔️',
            title: 'Calitate excepțională a vieții',
            description: 'Elveția este în top 3 mondial pentru calitatea vieții. Orașe curate, natură spectaculoasă, infrastructură impecabilă și un sistem de sănătate de top.'
        },
        {
            icon: '🔒',
            title: 'Stabilitate și siguranță',
            description: 'Una dintre cele mai stabile economii din lume. Job-uri sigure pe termen lung, cu contracte legale și toate beneficiile sociale prevăzute de legea elvețiană.'
        },
        {
            icon: '🌍',
            title: 'Experiență internațională',
            description: 'Vei lucra cu echipe multinaționale, vei învăța noi tehnici de construcție și vei acumula experiență valoroasă recunoscută în toată Europa.'
        }
    ];

    readonly lifestylePoints = [
        'Vei descoperi peisaje alpine de vis - Munții Alpi sunt la câteva minute distanță',
        'Vei experimenta celebra punctualitate și organizare elvețiană',
        'Vei putea trimite bani acasă familiei - economisind semnificativ din salariul generos',
        'Vei avea acces la unul dintre cele mai bune sisteme de sănătate din lume',
        'Vei lucra în condiții sigure, cu echipamente moderne și standarde ridicate'
    ];
}
