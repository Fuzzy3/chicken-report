import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StatsComponent } from './stats/stats.component';
import { MenuTabsComponent } from './menu-tabs/menu-tabs.component';
import { ReportsComponent } from './report/reports.component';
import { FlockManagementComponent } from './flock-management/flock-management.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StatsComponent, MenuTabsComponent, ReportsComponent, FlockManagementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
