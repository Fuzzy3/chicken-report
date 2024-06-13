import { Component, Inject, LOCALE_ID } from '@angular/core';
import { ReportsByWeek } from '@core/model/reports-by-week.model';
import { ReportService } from '@core/services/report.service';
import { AppUtil } from '@core/util/app-util';
import { DayCountComponent } from '@shared/components/day-count/day-count.component';
import { Report } from '@core/model/report.model';
import { ReportDialogService } from '@core/services/report-dialog.service';
import { Observable } from 'rxjs';
import { StatsService } from '@core/services/stats.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [DayCountComponent, CommonModule],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.scss'
})
export class TrackerComponent {
  currentWeek: ReportsByWeek;
  prevWeek: ReportsByWeek | undefined;
  secondPrevWeek: ReportsByWeek | undefined;
  pricePerEgg$: Observable<number>;
  
  constructor(private reportService: ReportService, private reportDialogService: ReportDialogService, statsService: StatsService) {
    this.pricePerEgg$ = statsService.pricePerEgg$();
    reportService.getReportsByWeek$().subscribe(reportsByWeek => {
      this.assignWeeks(reportsByWeek);
    })
  }
  
  private assignWeeks(reportsByWeek: ReportsByWeek[]) {
    const today: Date = new Date();
    const currentWeek: number = AppUtil.dateToWeekNumber(today);
    const first = reportsByWeek[0];

    if(first?.week === currentWeek) {
      this.currentWeek = {...first};
      AppUtil.fillWeekWithEmptyReports(this.currentWeek, this.reportService.getLocale());

      this.prevWeek = !!reportsByWeek[1] ? {...reportsByWeek[1]} : undefined;
      this.secondPrevWeek = !!reportsByWeek[2] ? {...reportsByWeek[2]} : undefined;
    } else {
      this.currentWeek = {
        week: currentWeek,
        eggs: 0,
        reports: []
      }
      AppUtil.fillWeekWithEmptyReports(this.currentWeek, this.reportService.getLocale());
      this.prevWeek = {...reportsByWeek[0]};
      this.secondPrevWeek = {...reportsByWeek[1]};
    }
  }


  openReport(report: Report) {
    if(!!report.id) {
      this.reportDialogService.editReport(report);
    } else if (report.date <= new Date().getDate()) {
      this.reportDialogService.openNewReport();
    }
  }
}
