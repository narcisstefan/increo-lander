import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';

interface Profession {
  title: string;
  salary: string;
  image?: string;
  location?: string;
  features?: string[];
}

@Component({
  selector: 'app-professions',
  standalone: true,
  templateUrl: './professions.component.html',
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
