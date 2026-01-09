import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';

interface Profession {
  icon: string;
  title: string;
  salary: string;
}

@Component({
  selector: 'app-professions',
  standalone: true,
  templateUrl: './professions.component.html',
  styleUrl: './professions.component.scss',
})
export class ProfessionsComponent {
  private translationService = inject(TranslationService);

  t(key: string): string {
    return this.translationService.t(key);
  }

  get professions(): Profession[] {
    return this.translationService.getArray('professions.items') as Profession[];
  }
}
