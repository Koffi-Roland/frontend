import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../services/guards';


export const HomeRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],

        data: {
          title: 'Dashboard',
          urls: [
            { title: 'dashboard', url: '/dashboard' },
            { title: 'Dashboard' }
          ]
        }
      },
     
    ]
  }
];
