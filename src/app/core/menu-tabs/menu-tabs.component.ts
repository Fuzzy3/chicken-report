import { Component } from '@angular/core';
import { ReportDialogService } from '../services/report-dialog.service';
import { ReportService } from '@core/services/report.service';
import { IconModule, TabButtonComponent, TabsModule } from '@kirbydesign/designsystem';

@Component({
  selector: 'app-menu-tabs',
  standalone: true,
  imports: [TabsModule, IconModule],
  templateUrl: './menu-tabs.component.html',
  styleUrl: './menu-tabs.component.scss'
})
export class MenuTabsComponent {

  tab_num = 0;
  selected = 0;
  highlightTrack = false;
  
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  
  constructor(private reportDialogService: ReportDialogService, private reportService: ReportService) {

  }

  openReportDialog() {
    this.highlightTrack = true;
    const todaysReport = this.reportService.getTodaysReport();
    if(todaysReport) {
      this.reportDialogService.editReport(todaysReport).subscribe(_ => this.highlightTrack = false);
    } else {
      this.reportDialogService.openNewReport().subscribe(_ => this.highlightTrack = false);
    }
  }
  
  
}
