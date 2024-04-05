import { Component } from '@angular/core';
import { ReportsByWeek } from '@core/model/reports-by-week.model';
import { ReportService } from '@core/services/report.service';

@Component({
  selector: 'app-tracker',
  standalone: true,
  imports: [],
  templateUrl: './tracker.component.html',
  styleUrl: './tracker.component.scss'
})
export class TrackerComponent {

  private currentWeek: ReportsByWeek;
  private prevWeek: ReportsByWeek;
  private secondPrevWeek: ReportsByWeek
  
  constructor(private reportService: ReportService) {
    const today: Date = new Date();
    today.setHours(0,0,0,0);
    reportService.getReportsByWeek$().subscribe(reportsByWeek => {
      reportsByWeek.forEach(week => console.log('week', week));
    })
  }
}
