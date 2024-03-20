import { Component, HostListener, Input } from '@angular/core';
import { Report } from '../model/report.model';
import { DatePipe } from '@angular/common';
import { DateToDayPipe } from '../pipe/date-to-day.pipe';
import { MatChipsModule } from '@angular/material/chips';



@Component({
  selector: 'app-report-item',
  standalone: true,
  imports: [DatePipe, DateToDayPipe, MatChipsModule],
  templateUrl: './report-item.component.html',
  styleUrl: './report-item.component.scss'
})
export class ReportItemComponent {

  @HostListener('click', ['$event.target']) onClick() {
    console.log('report', this.report);
  }

  @Input()
  report: Report | undefined;

  constructor(){}
    
}
