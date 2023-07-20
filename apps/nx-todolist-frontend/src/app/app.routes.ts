import { Route } from '@angular/router';
import { authGuard } from '@nx-todolist/frontend/auth.guard';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('@nx-todolist/frontend/home').then((m) => m.HomeModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@nx-todolist/frontend/dashboard').then((m) => m.DashboardModule),
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('@nx-todolist/frontend/profile').then((m) => m.ProfileModule),
    canActivate: [authGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
