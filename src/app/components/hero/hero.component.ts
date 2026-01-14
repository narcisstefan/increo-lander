import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  private translationService = inject(TranslationService);

  readonly statsValues = ['500+', '15+', '100%', '48h'];

  t(key: string): string {
    return this.translationService.t(key);
  }

  get statsLabels(): string[] {
    return [
      this.t('hero.stats.workers'),
      this.t('hero.stats.experience'),
      this.t('hero.stats.verified'),
      this.t('hero.stats.processing'),
    ];
  }
}
