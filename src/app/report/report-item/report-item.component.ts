import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { Report } from '../../model/report.model';
import { DatePipe } from '@angular/common';
import { DateToDayPipe } from '../../pipe/date-to-day.pipe';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReportDialogService } from '../../services/report-dialog.service';
import { CountComponent } from '../../components/count/count.component';



@Component({
  selector: 'app-report-item',
  standalone: true,
  imports: [DatePipe, DateToDayPipe, MatChipsModule, MatIconModule, MatButtonModule, CountComponent],
  templateUrl: './report-item.component.html',
  styleUrl: './report-item.component.scss'
})
export class ReportItemComponent {
  editingReport = false;

  @HostBinding('class.editing') get editing() { return this.editingReport }


  @HostListener('click', ['$event.target']) onClick() {
    console.log('report', this.report);
  }

  @Input()
  report: Report | null;

  constructor(private reportDialogService: ReportDialogService){}

  editReport() {
    if(this.report) {
      this.editingReport = true;
      this.reportDialogService.editReport(this.report).subscribe(_ => this.editingReport = false);
    }
  }
    
}
