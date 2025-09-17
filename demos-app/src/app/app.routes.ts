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
        path: 'table',
        loadComponent: () => import('./pages/table-page/table-page'),
      },
      {
        path: '',
        redirectTo: 'dummy-api',
        pathMatch: 'full',
      },
    ],
  },
];
