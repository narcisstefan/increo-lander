import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';

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
  styleUrl: './requirements.component.scss',
})
export class RequirementsComponent {
  private translationService = inject(TranslationService);

  t(key: string): string {
    return this.translationService.t(key);
  }

  get requirements(): Requirement[] {
    return this.translationService.getArray('requirements.items') as Requirement[];
  }
}
