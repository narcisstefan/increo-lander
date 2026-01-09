import { Component, inject } from '@angular/core';
import { TranslationService } from '../../core/services/translation.service';

interface WhyPoint {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-why-switzerland',
  standalone: true,
  templateUrl: './why-switzerland.component.html',
  styleUrl: './why-switzerland.component.scss',
})
export class WhySwitzerlandComponent {
  private translationService = inject(TranslationService);

  t(key: string): string {
    return this.translationService.t(key);
  }

  get mainBenefits(): WhyPoint[] {
    return this.translationService.getArray('whySwitzerland.benefits') as WhyPoint[];
  }

  get lifestylePoints(): string[] {
    return this.translationService.getArray('whySwitzerland.lifestylePoints') as string[];
  }
}
