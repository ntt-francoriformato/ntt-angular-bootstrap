import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/main-page/main-page'),
    children: [
      {
        path: 'dummy-api',
        loadComponent: () => import('./pages/dummy-api-page/dummy-api-page'),
      },
      {
        path: 'scheduler',
        loadComponent: () => import('./pages/scheduler-page/scheduler-page'),
      },
      {
        path: '',
        redirectTo: 'dummy-api',
        pathMatch: 'full',
      },
    ],
  },
];
