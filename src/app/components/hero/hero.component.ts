import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  private translationService = inject(TranslationService);

  readonly statsValues = ['500+', '15+', '98%'];

  t(key: string): string {
    return this.translationService.t(key);
  }

  get statsLabels(): string[] {
    return [
      this.t('hero.stats.workers'),
      this.t('hero.stats.experience'),
      this.t('hero.stats.satisfaction'),
    ];
  }
}
