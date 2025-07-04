import { Routes } from '@angular/router';
import { TrackerComponent } from './features/tracker/tracker.component';
import { FlockManagementComponent } from './features/flock-management/flock-management.component';
import { StatsComponent } from './features/stats/stats.component';
import { ReportsComponent } from './features/report/reports.component';
import { MenuTabsComponent } from '@core/menu-tabs/menu-tabs.component';

export const routes: Routes = [
  {
    pathMatch: 'full',
    path: '',
    redirectTo: 'tabs',
  },
  {
    path: 'tabs',
    component: MenuTabsComponent,
    children: [
      {
        path: '',
        redirectTo: 'tracker',
        pathMatch: 'full',
      },
      {
        path: 'tracker',
        component: TrackerComponent,
      },
      {
        path: 'history',
        component: ReportsComponent
      },
      {
        path: 'analysis',
        component: StatsComponent,
      },
      {
        path: 'chickens',
        component: FlockManagementComponent,
      },
    ]}
];
