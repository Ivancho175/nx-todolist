import { Route } from '@angular/router';
import { ProfileComponent } from './profile.component';

export const profileRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: ProfileComponent },
];
