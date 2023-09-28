import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'map',
    loadComponent: () => import('./map/map.page').then((m) => m.MapPage),
  },
  {
    path: 'account',
    loadComponent: () =>
      import('./account/account.page').then((m) => m.AccountPage),
  },
];
