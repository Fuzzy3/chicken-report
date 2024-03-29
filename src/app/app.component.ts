import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReportItemComponent } from './report/report-item/report-item.component';
import { AsyncPipe } from '@angular/common';
import { StatsComponent } from './stats/stats.component';
import { UploadReportsFileComponent } from './upload-reports-file/upload-reports-file.component';
import { WeekNumberPipe } from './pipe/week-number.pipe';
import { FormsModule } from '@angular/forms';
import { MenuTabsComponent } from './menu-tabs/menu-tabs.component';
import { ReportsComponent } from './report/reports.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, StatsComponent, MenuTabsComponent, ReportsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
