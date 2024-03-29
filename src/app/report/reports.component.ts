import { Component } from '@angular/core';
import { ReportDialogService } from '../services/report-dialog.service';
import { Observable } from 'rxjs';
import { ReportService } from '../services/report.service';
import { Report } from '../model/report.model';
import { ReportItemComponent } from './report-item/report-item.component';
import { AsyncPipe } from '@angular/common';
import { WeekNumberPipe } from '../pipe/week-number.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ReportItemComponent, AsyncPipe, WeekNumberPipe, MatButtonModule, MatIcon],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  reports$: Observable<ReadonlyArray<Report>>;

  constructor(private reportService: ReportService, private reportDialogService: ReportDialogService){
    this.reports$ = reportService.getReports$();
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
