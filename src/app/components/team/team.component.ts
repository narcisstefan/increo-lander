import { Component } from '@angular/core';

interface TeamMember {
    name: string;
    role: string;
    email: string;
    phone: string;
    image: string;
}

@Component({
    selector: 'app-team',
    standalone: true,
    templateUrl: './team.component.html',
    styleUrl: './team.component.scss'
})
export class TeamComponent {
    readonly teamMembers: TeamMember[] = [
        {
            name: 'Loqman Alicioglu',
            role: 'Partner',
            email: 'l.alicioglu@increo.swiss',
            phone: '+41 41 552 90 09',
            image: 'team/damian.png'
        },
        {
            name: 'Damian Imfeld',
            role: 'Partner',
            email: 'd.imfeld@increo.swiss',
            phone: '+41 41 552 90 10',
            image: 'team/loqman.png'
        }
    ];
}
