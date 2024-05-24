import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component'),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home/home.component'),
      },
      {
        path: 'item-list',
        loadComponent: () =>
          import('./pages/home/item-list/item-list.component'),
      },
      {
        path: 'item-detail/:id',
        loadComponent: () =>
          import('./pages/home/item-detail/item-detail.component'),
      },
      {
        path: 'item-exchange',
        loadComponent: () =>
          import('./pages/home/item-exchange/item-exchange.component'),
      },
    ],
  },
  {
    path: 'my-account',
    loadComponent: () => import('./pages/my-account/my-account.component'),
  },
  {
    path: 'create-item',
    loadComponent: () =>
      import('./pages/my-account/create-item/create-item.component'),
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin.component'),
    children: [
      {
        path: 'user-list',
        loadComponent: () =>
          import('./pages/admin/user-list/user-list.component'),
      },
      {
        path: '',
        redirectTo: 'user-list',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth.component'),
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/auth/login/login.component'),
      },
      {
        path: 'register',
        loadComponent: () => import('./pages/auth/register/register.component'),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
