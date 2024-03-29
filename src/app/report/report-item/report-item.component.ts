import { Component, HostListener, Input } from '@angular/core';
import { Report } from '../../model/report.model';
import { DatePipe } from '@angular/common';
import { DateToDayPipe } from '../../pipe/date-to-day.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReportDialogService } from '../../services/report-dialog.service';



@Component({
  selector: 'app-report-item',
  standalone: true,
  imports: [DatePipe, DateToDayPipe, MatChipsModule, MatIconModule, MatButtonModule],
  templateUrl: './report-item.component.html',
  styleUrl: './report-item.component.scss'
})
export class ReportItemComponent {


  @HostListener('click', ['$event.target']) onClick() {
    console.log('report', this.report);
  }

  @Input()
  report: Report | undefined;

  constructor(private reportDialogService: ReportDialogService){}

  editReport() {
    if(this.report) {
      this.reportDialogService.editReport(this.report);
    }
  }
    
}
