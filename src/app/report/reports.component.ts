import { Component } from '@angular/core';
import { ReportDialogService } from '../services/report-dialog.service';
import { Observable, map, tap } from 'rxjs';
import { ReportService } from '../services/report.service';
import { Report } from '../model/report.model';
import { ReportItemComponent } from './report-item/report-item.component';
import { AsyncPipe } from '@angular/common';
import { WeekNumberPipe } from '../pipe/week-number.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AppUtil } from '../util/app-util';

interface ReportsByWeek {
  week: number,
  eggs: number,
  reports: Report[]
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ReportItemComponent, AsyncPipe, WeekNumberPipe, MatButtonModule, MatIcon],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  reportsByWeek: ReportsByWeek[] = [];


  constructor(private reportService: ReportService, private reportDialogService: ReportDialogService){
    reportService.getReports$().pipe(
      tap(_ => this.reportsByWeek = []),
      tap(reports => {
        let currentWeek: ReportsByWeek = {
          week: AppUtil.dateToWeekNumber(reports[0].date),
          eggs: 0,
          reports: []
        };
        this.reportsByWeek.push(currentWeek);

        reports.forEach(report => {
          const weekForReport = AppUtil.dateToWeekNumber(report.date);
          if(currentWeek.week === weekForReport) {
            currentWeek.reports.push(report);
          } else {
            currentWeek = {
              week: weekForReport,
              eggs: 0,
              reports: [report]
            } 
            this.reportsByWeek.push(currentWeek);
          }
        })
      }),
      tap(_ => this.reportsByWeek.forEach(week => week.eggs = AppUtil.totalEggs(week.reports)))
    ).subscribe(_ => console.log(this.reportsByWeek));
  }

  isNewWeek(stringDate: Date) {
    const date = new Date(stringDate);
    return date.getDay() === 0;
  }

  newReport() {
    const todaysReport = this.reportService.getTodaysReport();
    if(todaysReport) {
      this.reportDialogService.editReport(todaysReport);
    } else {
      this.reportDialogService.openNewReport();
    }
  }

}
