import { DatePipe } from '@angular/common';
import { ReportService } from '@core/services/report.service';
import { ReportDialogService } from '@core/services/report-dialog.service';
import { ReportsByWeek } from '@core/model/reports-by-week.model';
import { KirbyModule } from '@kirbydesign/designsystem';
import { Report } from '../../core/model/report.model';
import { AppUtil } from '@core/util/app-util';
import { Component } from '@angular/core';



@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [KirbyModule, DatePipe],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {

  reportsByWeek: ReportsByWeek[];
  reports: Report[];

  constructor(private reportService: ReportService, private reportDialogService: ReportDialogService){
    reportService.getReports$().subscribe(reports => this.reports = [...reports]);
  }

  getSectionName(report: Report): string {
    const reversed = 100000 - AppUtil.dateToWeekNumber(report.date);
    return '' + reversed;
  }

  getCorrectSectionName(sectionName: string): string {
    const reversed = 100000 - Number.parseInt(sectionName);
    return 'Week ' + reversed;
  }

}
