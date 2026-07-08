import { Routes } from '@angular/router';
import { authGuard } from './core/Guards/auth-guard';
import { roleGuard } from './core/Guards/role-guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard, roleGuard],
    data: {
      role: 'ADMIN',
    },
    loadChildren: () =>
      import('./features/dashboard/dashboard-module').then((m) => m.DashboardModule),
  },
  {
    path: 'survey',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/survey-builder/survey-builder-module').then((m) => m.SurveyBuilderModule),
  },
];
