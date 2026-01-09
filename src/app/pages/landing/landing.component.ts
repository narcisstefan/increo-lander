import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { BenefitsComponent } from '../../components/benefits/benefits.component';
import { ProfessionsComponent } from '../../components/professions/professions.component';
import { RequirementsComponent } from '../../components/requirements/requirements.component';
import { WhySwitzerlandComponent } from '../../components/why-switzerland/why-switzerland.component';
import { ApplicationFormComponent } from '../../components/application-form/application-form.component';
import { TeamComponent } from '../../components/team/team.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    BenefitsComponent,
    ProfessionsComponent,
    RequirementsComponent,
    WhySwitzerlandComponent,
    ApplicationFormComponent,
    TeamComponent,
    FooterComponent,
  ],
  template: `
    <app-navbar />
    <main>
      <app-hero />
      <app-benefits />
      <app-professions />
      <app-requirements />
      <app-why-switzerland />
      <app-application-form />
      <app-team />
    </main>
    <app-footer />
  `,
})
export class LandingComponent {}
