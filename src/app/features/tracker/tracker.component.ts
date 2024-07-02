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
import { KirbyModule } from '@kirbydesign/designsystem';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [DayCountComponent, CommonModule, KirbyModule],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.scss'
})
export class TrackerComponent {

  selectedWeek: ReportsByWeek;
  pricePerEgg$: Observable<number>;
  selectedWeekIsThisWeek: boolean = true;
  prevWeekExist: boolean = true;
  reportsByWeek: ReportsByWeek[] = [];


  constructor(private reportService: ReportService, private reportDialogService: ReportDialogService, statsService: StatsService) {
    this.pricePerEgg$ = statsService.pricePerEgg$();
    reportService.getReportsByWeek$().subscribe(reportsByWeek => {
      this.reportsByWeek = reportsByWeek;
      this.setWeekToToday();
    })
  }

  private setWeekToToday() {
    const today: Date = new Date();
    const currentWeek: number = AppUtil.dateToWeekNumber(today);
    this.setWeek(currentWeek);
  }
  
  private setWeek(weekNumber: number) {
    const first = this.reportsByWeek[0];

    const selectedWeek = this.reportsByWeek.find(reportsInWeek => reportsInWeek.week === weekNumber)

    if(selectedWeek) {
      if(selectedWeek?.week === first.week) {
        this.selectedWeek = {...first};
        AppUtil.fillWeekWithEmptyReports(this.selectedWeek, this.reportService.getLocale());
        
      } else {
        this.selectedWeek = selectedWeek;
        AppUtil.fillWeekWithEmptyReports(this.selectedWeek, this.reportService.getLocale());
      } 
    }
    this.selectedWeekIsThisWeek = weekNumber === AppUtil.dateToWeekNumber(new Date());
    this.prevWeekExist = !!this.reportsByWeek.find(reportsInWeek => reportsInWeek.week === weekNumber-1);
  }


  openReport(report: Report) {
    if(!!report.id) {
      this.reportDialogService.editReport(report);
    } else {
      this.reportDialogService.openNewReport(report.date);
    }
  }

  goToPrevWeek() {
    this.goToWeek(-1);
  }

  goToNextWeek() {
    this.goToWeek(1);
  }

  goToWeek(delta: number) {
    this.setWeek(this.selectedWeek.week + delta);
  }
}
