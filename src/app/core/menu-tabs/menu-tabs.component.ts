import { AfterViewInit, Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatTab, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { ReportDialogService } from '../services/report-dialog.service';
import { MatIconModule } from '@angular/material/icon';
import { ReportService } from '@core/services/report.service';

@Component({
  selector: 'app-menu-tabs',
  standalone: true,
  imports: [MatTabsModule, MatIconModule],
  templateUrl: './menu-tabs.component.html',
  styleUrl: './menu-tabs.component.scss'
})
export class MenuTabsComponent implements AfterViewInit {
  @ViewChild(MatTabGroup) group: MatTabGroup;
  @ViewChildren(MatTab) tabs: QueryList<MatTab>;
  tab_num = 0;
  selected = 0;
  highlightTrack = false;
  
  SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
  
  constructor(private reportDialogService: ReportDialogService, private reportService: ReportService) {

  }

  ngAfterViewInit(){
    this.tab_num = this.tabs.length
    console.log(this.group)
  }
  
  onSelectedTabChange(tabIndex: number) {
    if (tabIndex === 2) {
      this.group.selectedIndex = 0;
    }
  }

  openReportDialog() {
    const todaysReport = this.reportService.getTodaysReport();
    if(todaysReport) {
      this.reportDialogService.editReport(todaysReport);
    } else {
      this.highlightTrack = true;
      this.reportDialogService.openNewReport().subscribe(_ => this.highlightTrack = false);
    }
  }
  
  
}
