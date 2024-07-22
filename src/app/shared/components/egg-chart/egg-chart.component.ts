import { Component } from '@angular/core';
import { ReportService } from '@core/services/report.service';
import { KirbyModule } from '@kirbydesign/designsystem';
import { ChartOptions } from 'chart.js';


@Component({
  selector: 'app-egg-chart',
  standalone: true,
  imports: [KirbyModule],
  templateUrl: './egg-chart.component.html',
  styleUrl: './egg-chart.component.scss'
})
export class EggChartComponent {

  eggData: number[] = [];
  weeks: string[] = [];
  options: ChartOptions = {
    scales: {
      y: {
        display: true,
        suggestedMin: 0,
        ticks: {
          display: true,
        },
      },
      x: {
        display: true,
        suggestedMin: 0,
        ticks: {
          display: true,
        },
      },
    },
  };
  
  constructor(reportService: ReportService) {
    reportService.getReportsByWeek$().subscribe(reportsByWeekData => {
      const reportsByWeek = [...reportsByWeekData].reverse();
      this.weeks = reportsByWeek.map(reports => 'Week ' + reports.week);
      this.eggData = reportsByWeek.map(reports => reports.eggs);
    })
  }

}
