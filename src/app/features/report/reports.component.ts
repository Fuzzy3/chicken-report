import { Component } from '@angular/core';
import { Observable, filter, map, tap } from 'rxjs';
import { ReportItemComponent } from './report-item/report-item.component';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { WeekNumberPipe } from '@core/pipe/week-number.pipe';
import { ReportService } from '@core/services/report.service';
import { ReportDialogService } from '@core/services/report-dialog.service';
import { AppUtil } from '@core/util/app-util';
import { Report } from '@core/model/report.model';
import { ReportsByWeek } from '@core/model/reports-by-week.model';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ReportItemComponent, AsyncPipe, WeekNumberPipe, MatButtonModule, MatIcon],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  reportsByWeek$: Observable<ReportsByWeek[]>;


  constructor(private reportService: ReportService, private reportDialogService: ReportDialogService){
    this.reportsByWeek$ = reportService.getReportsByWeek$();
  }

  isNewWeek(stringDate: Date) {
    const date = new Date(stringDate);
    return date.getDay() === 0;
  }

}
