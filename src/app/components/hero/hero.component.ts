import { Component } from '@angular/core';

@Component({
    selector: 'app-hero',
    standalone: true,
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss'
})
export class HeroComponent {
    readonly stats = [
        { value: '500+', label: 'Muncitori Plasați' },
        { value: '15+', label: 'Ani Experiență' },
        { value: '98%', label: 'Satisfacție' }
    ];
}
