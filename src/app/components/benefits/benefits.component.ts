import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-benefits',
  standalone: true,
  templateUrl: './benefits.component.html',
  styleUrl: './benefits.component.scss',
})
export class BenefitsComponent {
  private translationService = inject(TranslationService);

  t(key: string): string {
    return this.translationService.t(key);
  }

  get benefits(): Benefit[] {
    return this.translationService.getArray('benefits.items') as Benefit[];
  }
}
