import { Routes } from '@angular/router';
import { DEFAULT_LANGUAGE, LANGUAGE_CODES } from './core/i18n/i18n.config';

const landingRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component').then((m) => m.LandingComponent),
  },
];

const localizedRoutes: Routes = LANGUAGE_CODES.filter((lang) => lang !== DEFAULT_LANGUAGE).map(
  (lang) => ({
    path: lang,
    children: landingRoutes,
  })
);

export const routes: Routes = [
  ...landingRoutes,
  ...localizedRoutes,
  { path: '**', redirectTo: '' },
];
