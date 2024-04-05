import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StatsComponent } from './features/stats/stats.component';
import { MenuTabsComponent } from './core/menu-tabs/menu-tabs.component';
import { ReportsComponent } from './features/report/reports.component';
import { FlockManagementComponent } from './features/flock-management/flock-management.component';
import { TrackerComponent } from './features/tracker/tracker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StatsComponent, MenuTabsComponent, ReportsComponent, FlockManagementComponent, TrackerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
