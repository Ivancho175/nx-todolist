import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const dashboardRoutes: Route[] = [
  { path: '', pathMatch: 'full', component: DashboardComponent },
];
